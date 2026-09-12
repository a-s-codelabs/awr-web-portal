# AWR Careers Feed from the AWR Workspace — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/careers` on the AWR portal (`awr.asuniquegroup.com`) list every **active job owned by the AWR workspace** (`org_awr`), sourced live from the same backend that powers the AWR admin's `asuniquegroup.com/app/requirements` page, and make applications submitted through the AWR portal visible to both the AWR workspace and the parent workspace.

**Architecture:** Currently `portal.getPublicRequirements` ignores the `x-organization-id` header and hardcodes the parent org (`resolveDefaultOrg` picks `org_default`), so the AWR portal gets an empty feed. We make the public portal procedures honor the header org when it names a real organization: `getPublicRequirements` returns that org's active requirements, `getDefaultOrg` brands/returns that org, and `submitApplication` writes the candidate to **both** the parent org and the header org. The portal pins its org to `org_awr` via a `VITE_PORTAL_ORG_ID` constant, replacing the shared `org_default` localStorage fallback. No UI changes are needed — `Careers.jsx`, `Home.jsx`, and `flattenRequirements` already render whatever the endpoint returns.

**Tech Stack:**
- Backend (`a-s-unique-group`): TypeScript, tRPC, Drizzle ORM, Vitest (pnpm workspace, Node 22)
- Portal (`awr-web-portal`): React 19 + Vite, tRPC, Vitest (npm, Node 22)
- Both deploy to Cloudflare Workers.

**Spec:** This plan implements the design agreed during brainstorming (org scoping, AWR-owned-only feed, dual-org application routing). No separate spec file exists; the design sections in the "Scope" block below are the authoritative contract.

**Repos (two, worked in order):**
1. `a-s-unique-group` — backend (sibling repo: `D:\My ShYts\ascodelabs\intern\projects\asunique\a-s-unique-group`)
2. `awr-web-portal` — this repo (working directory)

## Global Constraints

- Portal feed = **AWR-owned** requirements only: `organizationId = org_awr` AND `status = 'active'`. Never include `requirement_share` rows on the public feed.
- Header org wins only when it names an existing `organization` row; otherwise fall back to `resolveDefaultOrg` (main-site behavior must not change).
- Applications: one candidate row in the parent org (`org_default`) **and** one in the header org (e.g. `org_awr`); "one application per requirement+position" guard preserved, applied globally.
- `getPublicRequirements` response shape must stay identical to today (consumer is the portal's `flattenRequirements`/`requirements.test.js`).
- Backend test DB requires `DATABASE_URL` env + seeded test org (`admin+test@salman2301.com`). Run `pnpm run seed:test` once against the dev database before first test run.
- Backend uses `pnpm`; portal uses `npm`. Node `>=22 <23`; pnpm `>=10`.

---

## Scope (design summary)

1. **Backend `src/server/portal/index.ts`**
   - New helper `resolvePortalOrg(db, organizationId)` → org row for header org if it exists, else `resolveDefaultOrg(db)`. Used by `getPublicRequirements` and `getDefaultOrg`.
   - `getPublicRequirements`: resolve org via helper, query `status='active'` + `organizationId = org.id` (owned only).
   - `getDefaultOrg`: resolve org via helper.
   - `submitApplication`: create candidate in default org **and** header org (when different and real), with matching role grant, initial `SCREENED` stage, documents, and activity log in each org.
2. **Portal `src/lib/api.js` + `src/contexts/OrgContext.jsx`**
   - `export const PORTAL_ORG_ID = portalOrgId()` where `portalOrgId(envOrg = import.meta.env.VITE_PORTAL_ORG_ID)` returns `envOrg || 'org_awr'`.
   - `createApiClient` header builder: `const id = orgId || portalOrgId()` (drop the `org_default` localStorage fallback path).
   - `OrgProvider` initializes `orgId` to `portalOrgId()`.
3. **Verify & deploy** — backend tests, portal tests + build, deploy backend then portal, live curl assertions.

---

## File Structure

**Backend (`a-s-unique-group`):**
- Modify: `src/server/portal/index.ts` — resolver helper + three procedures.
- Test: `tests/server/routers.test.ts` (append to existing file) — org scoping, `getDefaultOrg`, dual-insert.

**Portal (`awr-web-portal`):**
- Modify: `src/lib/api.js` — `portalOrgId` helper + header builder.
- Modify: `src/contexts/OrgContext.jsx` — initial org from `portalOrgId()`.
- Test: `src/lib/org.test.js` — `portalOrgId` default/env override branches.
- Existing `src/lib/requirements.test.js` must keep passing (it is the guard on the response shape).

---

### Task B1: Org-scoped public portfolio procedures

**Files:**
- Modify: `src/server/portal/index.ts:37-90` (after `resolveDefaultOrg`)
- Test: `tests/server/routers.test.ts`

**Interfaces:**
- Produces: `resolvePortalOrg(db, organizationId: string): Promise<{ id, name, slug, logo }>` — used by Tasks B1 and B2.

- [ ] **Step 1: Write the failing test**

Append to `tests/server/routers.test.ts` (after the existing `describe` blocks):

```ts
describe('portal org scoping', () => {
  let vendorId = '';
  let reqId = '';

  afterAll(async () => {
    try {
      if (vendorId) await caller.vendor.delete({ id: vendorId });
    } catch { /* ignore */ }
  });

  it('getPublicRequirements returns only the header org\'s active requirements', async () => {
    const vuser: any = await caller.settings.createUser({
      name: 'E2E Portal Scope Vendor User',
      email: `e2e+pfvuser${TS}@salman2301.com`,
      password: 'E2EPass123!',
    });
    const v: any = await caller.vendor.create({
      userId: vuser.id,
      name: 'E2E Portal Scope Vendor',
      companyName: `E2E Portal Scope Vendor ${TS}`,
      email: `e2e+pfvendor${TS}@salman2301.com`,
    });
    vendorId = v.id;

    const created: any = await caller.requirement.create({
      vendorId: v.id,
      companyName: `E2E Portal Scope Req ${TS}`,
      status: 'active',
      regionIds: [],
      jobRequirements: [{ position: 'Driver', quantity: 1 }],
    });
    reqId = created.id;

    const awrCaller = c({ organizationId: 'org_test' });
    const res: any[] = await awrCaller.portal.getPublicRequirements();
    expect(res.some((r) => r.id === reqId)).toBe(true);

    const defaultCaller = c({ organizationId: '' });
    const defaultRes: any[] = await defaultCaller.portal.getPublicRequirements();
    expect(defaultRes.some((r) => r.id === reqId)).toBe(false);
  });

  it('getDefaultOrg returns the header org when present', async () => {
    const org: any = await c({ organizationId: 'org_test' }).portal.getDefaultOrg();
    expect(org.slug).toBe('test');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run tests/server/routers.test.ts -t "portal org scoping"`
Expected: FAIL — `getPublicRequirements` returns the default org's requirements, so the `org_test` requirement `reqId` is never present; `getDefaultOrg` returns slug `default`, not `test`.

- [ ] **Step 3: Implement**

In `src/server/portal/index.ts`, add after `resolveDefaultOrg` (line ~90):

```ts
/**
 * Public portal org: the `x-organization-id` header when it names a real
 * organization, otherwise the default org. Keeps the main portal on the
 * parent org while letting tenant portals (e.g. AWR) scope to their own.
 */
async function resolvePortalOrg(
  db: any,
  organizationId: string
): Promise<{ id: string; name: string; slug: string; logo: string | null }> {
  if (organizationId) {
    const [org] = await db
      .select({
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        logo: organization.logo,
      })
      .from(organization)
      .where(eq(organization.id, organizationId))
      .limit(1);
    if (org) return org;
  }
  return resolveDefaultOrg(db);
}
```

Change `getPublicRequirements` (line 138) from:

```ts
const org = await resolveDefaultOrg(ctx.db);
```

to:

```ts
const org = await resolvePortalOrg(ctx.db, ctx.organizationId);
```

Change `getDefaultOrg` (line 240) from:

```ts
const org = await resolveDefaultOrg(ctx.db);
```

to:

```ts
const org = await resolvePortalOrg(ctx.db, ctx.organizationId);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run tests/server/routers.test.ts -t "portal org scoping"`
Expected: PASS (both tests).

- [ ] **Step 5: Run the full existing suite to check for regressions**

Run: `pnpm exec vitest run tests/server/`
Expected: PASS (no regressions; `submitApplication` tests don't exist yet).

- [ ] **Step 6: Commit**

```bash
git add src/server/portal/index.ts tests/server/routers.test.ts
git commit -m "feat(portal): scope public procedures to x-organization-id header org"
```

---

### Task B2: Dual-org application routing

**Files:**
- Modify: `src/server/portal/index.ts:250-390` (`submitApplication`)
- Test: `tests/server/routers.test.ts`

**Interfaces:**
- Consumes: `resolvePortalOrg(db, organizationId)` from Task B1.
- Produces: two `candidate` rows (parent org + header org) per application, each with `candidateStage` + `candidateDocument` rows and a `userRole` grant in both orgs.

- [ ] **Step 1: Write the failing test**

Append to `tests/server/routers.test.ts`:

```ts
describe('portal submitApplication dual-org', () => {
  let vendorId = '';
  let reqId = '';

  afterAll(async () => {
    try {
      if (vendorId) await caller.vendor.delete({ id: vendorId });
    } catch { /* ignore */ }
  });

  it('writes a candidate into the parent and header orgs', async () => {
    const parentCaller = c({ organizationId: 'org_default' });
    const vuser: any = await parentCaller.settings.createUser({
      name: 'E2E Dual Vendor User',
      email: `e2e+dualvuser${TS}@salman2301.com`,
      password: 'E2EPass123!',
    });
    const v: any = await parentCaller.vendor.create({
      userId: vuser.id,
      name: 'E2E Dual Vendor',
      companyName: `E2E Dual Vendor ${TS}`,
      email: `e2e+dualvendor${TS}@salman2301.com`,
    });
    vendorId = v.id;

    const created: any = await parentCaller.requirement.create({
      vendorId: v.id,
      companyName: `E2E Dual Req ${TS}`,
      status: 'active',
      regionIds: [],
      jobRequirements: [{ position: 'Driver', quantity: 1 }],
    });
    reqId = created.id;

    const dual = c({ organizationId: 'org_test' });
    await dual.portal.submitApplication({
      requestId: reqId,
      position: 'Driver',
      firstName: 'Dual',
      lastName: `Org ${TS}`,
      email: `e2e+dual${TS}@salman2301.com`,
    });

    const rows = await db
      .select({
        organizationId: candidate.organizationId,
        requestId: candidate.requestId,
        userId: candidate.userId,
      })
      .from(candidate)
      .where(and(eq(candidate.userId, testUserId), eq(candidate.requestId, reqId)));
    expect(rows.map((r) => r.organizationId).sort()).toEqual(['org_default', 'org_test']);
  });
});
```

Add the exact import at the top of `tests/server/routers.test.ts`, modifying the existing schema import line:

```ts
import { user as userTable, candidate } from '@/lib/db/schema';
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run tests/server/routers.test.ts -t "portal submitApplication dual-org"`
Expected: FAIL — currently one row is created, in `org_default` only.

- [ ] **Step 3: Implement**

In `src/server/portal/index.ts`, `submitApplication`:

Replace the org resolution line (~254):

```ts
const org = await resolveDefaultOrg(ctx.db);
```

with:

```ts
const org = await resolveDefaultOrg(ctx.db);
const portalOrg = await resolvePortalOrg(ctx.db, ctx.organizationId);
const targetOrgs =
  portalOrg.id !== org.id ? [{ id: org.id }, { id: portalOrg.id }] : [{ id: org.id }];
```

Keep the requirement validation as-is (must exist in the **default** org with `status='active'` — `org` is still the default org).

Then replace the block that inserts `userRole`, `candidate`, `candidateStage`, and `candidateDocument` (lines ~324-385) with a loop over `targetOrgs`. The role lookup/creation stays once. Full replacement:

```ts
const candidateRoleId = candidateRole!.id;
let parentCandidateId = '';

for (const target of targetOrgs) {
  const targetOrgId = target.id;

  await ctx.db
    .insert(userRole)
    .values({
      id: crypto.randomUUID(),
      userId,
      roleId: candidateRoleId,
      organizationId: targetOrgId,
    })
    .onConflictDoNothing();

  const [newCandidate] = await ctx.db
    .insert(candidate)
    .values({
      id: crypto.randomUUID(),
      organizationId: targetOrgId,
      passportNumber: input.passportNumber || null,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email || null,
      phone: input.phone || null,
      dateOfBirth: input.dateOfBirth
        ? new Date(input.dateOfBirth).toISOString()
        : undefined,
      nationality: input.nationality || null,
      gender: input.gender || null,
      requestId: input.requestId,
      position: input.position || null,
      resumeUrl: input.resumeUrl || null,
      notes: input.notes || null,
      source: 'EXTERNAL',
      uploadedById: userId,
      userId,
      updatedAt: new Date().toISOString(),
    })
    .returning();

  if (targetOrgId === org.id) parentCandidateId = newCandidate.id;

  await ctx.db.insert(candidateStage).values({
    id: crypto.randomUUID(),
    candidateId: newCandidate.id,
    status: 'SCREENED',
    changedById: userId,
    organizationId: targetOrgId,
    notes:
      'Application submitted via the candidate portal (External source)',
  });

  if (input.documents && input.documents.length > 0) {
    await ctx.db.insert(candidateDocument).values(
      input.documents.map((doc) => ({
        id: crypto.randomUUID(),
        candidateId: newCandidate.id,
        organizationId: targetOrgId,
        type: doc.type as any,
        fileUrl: doc.fileUrl,
        fileName: doc.fileName || doc.fileUrl.split('/').pop() || 'file',
        uploadedAt: new Date().toISOString(),
      }))
    );
  }

  await logCreate(
    ctx.db,
    userId,
    'Candidate',
    newCandidate.id,
    `Applied to ${input.position || 'position'} via the candidate portal`,
    targetOrgId
  );
}
```

- [ ] **Step 3: Remove the old single-org inserts and fix the trailing return**

Remove the original standalone blocks between the candidate-role lookup and the return: the single `ctx.db.insert(userRole).values({ ... organizationId: org.id ...})` block, the original `const [newCandidate] = await ctx.db.insert(candidate)...` + `candidateStage` + `candidateDocument` + `logCreate` blocks (they are superseded by the loop above). Do **not** remove the candidate-role lookup/creation (`candidateRole!`).

Then replace the trailing return (currently after the removed `logCreate` around line 396):

```ts
return { candidateId: parentCandidateId };
```

The final `submitApplication` flow is: resolve `org` + `portalOrg` + `targetOrgs` → duplicate-application guard → requirement lookup/validation (unchanged) → candidate-role lookup/creation (once, unchanged) → `for (const target of targetOrgs) { ... }` loop → `return { candidateId: parentCandidateId }`.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run tests/server/routers.test.ts -t "portal submitApplication dual-org"`
Expected: PASS — two candidate rows with `organizationId` `['org_default','org_test']` sorted.

- [ ] **Step 5: Run the full suite**

Run: `pnpm exec vitest run tests/server/`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/server/portal/index.ts tests/server/routers.test.ts
git commit -m "feat(portal): write applications to both parent and header orgs"
```

---

### Task P1: Portal pins org to AWR

**Files:**
- Modify: `src/lib/api.js:1-50`
- Modify: `src/contexts/OrgContext.jsx:1-36`
- Test: `src/lib/org.test.js` (Create)

**Interfaces:**
- Consumes: nothing (standalone).
- Produces: `portalOrgId(envOrg?): string` returning `envOrg || 'org_awr'`; `PORTAL_ORG_ID` constant; used by `createApiClient` header builder and `OrgProvider`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/org.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { portalOrgId } from './api.js'

describe('portalOrgId', () => {
  it('defaults to org_awr when no env override is set', () => {
    expect(portalOrgId(undefined)).toBe('org_awr')
  })

  it('honors the VITE_PORTAL_ORG_ID env override', () => {
    expect(portalOrgId('org_custom')).toBe('org_custom')
  })

  it('ignores an empty env override', () => {
    expect(portalOrgId('')).toBe('org_awr')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `api.js` does not export `portalOrgId`.

- [ ] **Step 3: Implement**

In `src/lib/api.js`, add near the top (before `orgHeaders`):

```js
export function portalOrgId(envOrg = import.meta.env.VITE_PORTAL_ORG_ID) {
  return envOrg || 'org_awr'
}

export const PORTAL_ORG_ID = portalOrgId()
```

Update `createApiClient`'s header builder (line ~59):

```js
headers() {
  const headers = { 'content-type': 'application/json' }
  const id = orgId || PORTAL_ORG_ID
  if (id) headers['x-organization-id'] = id
  return headers
},
```

Update `src/contexts/OrgContext.jsx` init (line 7):

```js
import { trpc, createApiClient, queryClient, portalOrgId } from '../lib/api.js'

export function OrgProvider({ children }) {
  const [orgId, setOrgId] = useState(() => portalOrgId())
  const [client, setClient] = useState(() => createApiClient(orgId))
```

(The `getDefaultOrg` effect stays — because the backend now honors the header, it returns AWR for this portal instead of reverting to the parent.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS — `org.test.js` green, existing `requirements.test.js` green.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/api.js src/contexts/OrgContext.jsx src/lib/org.test.js
git commit -m "feat(portal): pin x-organization-id to AWR workspace org"
```

---

### Task V1: Deploy and verify live

This task runs **after** both repos are pushed. Backend must deploy before the portal so the header-scoped endpoint exists.

- [ ] **Step 1: Deploy the backend**

Run (in `a-s-unique-group`): `pnpm run deploy`
Expected: wrangler deploy succeeds for `unisashr`-style worker; note the backend also auto-deploys on push to `main`.

- [ ] **Step 2: Deploy the portal**

Run (in `awr-web-portal`): `npm run deploy`
Expected: `vite build` + `scripts/prepare-dist.mjs` + wrangler deploy to `awr.asuniquegroup.com` succeed. CI also auto-deploys on push to `main`.

- [ ] **Step 3: Verify AWR feed is non-empty and scoped**

Run (PowerShell):

```powershell
$r = Invoke-WebRequest -Uri "https://awr.asuniquegroup.com/api/trpc/portal.getPublicRequirements" -Headers @{"x-organization-id"="org_awr"} -UseBasicParsing
$r.Content.Substring(0, [Math]::Min(600, $r.Content.Length))
```

Expected: JSON `{"result":{"data":[...]}}` containing AWR's active requirements (requirementItems, vendor, regions). Not `[]`.

- [ ] **Step 4: Verify main portal still shows parent org**

Run (PowerShell):

```powershell
$r = Invoke-WebRequest -Uri "https://asuniquegroup.com/api/trpc/portal.getPublicRequirements" -UseBasicParsing
$r.Content.Substring(0, [Math]::Min(300, $r.Content.Length))
```

Expected: headerless call still resolves the parent org feed (may be `[]` if parent has no active requirements today — must not throw).

- [ ] **Step 5: Exercise the apply flow once (manual smoke)**

Apply from the portal to an AWR position with a throwaway account; then in the AWR admin app and the parent admin app, confirm the candidate appears in both workspaces under the same requirement.

- [ ] **Step 6: Leave proof in the repo**

Append a short "LIVE VERIFICATION" section to `plan.md` recording the curl results and any anomalies before the final commit (empty `[]` for AWR is a failure of this task).

---

## LIVE VERIFICATION (2026-09-12)

Implemented in repo `F:\ASUHR\a-s-unique-group` (backend) and this repo (portal). Both repos auto-deploy to Cloudflare Workers on push to `main`; the backend commits and the portal commit were pushed, and the live endpoints below were probed after deploy.

**`getDefaultOrg` probes (https://awr.asuniquegroup.com/api/trpc/portal.getDefaultOrg):**
- no header → `{"id":"org_default","name":"A S Unique Group","slug":"default"}` (main-site behavior preserved)
- `x-organization-id: org_awr` → `{"id":"org_awr","name":"AWR","slug":"awr",...}` (portal branded to AWR)
- `x-organization-id: org_test` → `org_test`
- `x-organization-id: org_testx` (unknown org) → falls back to `org_default` (fallback rule works)

**`getPublicRequirements` probes (https://awr.asuniquegroup.com/api/trpc/portal.getPublicRequirements):**
- headerless → default org feed: `[]` (org_default currently has no *active* requirements — expected, must not throw)
- `x-organization-id: org_awr` → `[]`
- `x-organization-id: org_test` → 135 active requirements (org-scoped feed works)

**Anomaly — AWR feed is empty for a data reason, not a code reason:** live DB shows `organizationId='org_awr'` has exactly 2 requirements (`req-abc`, `req-abc-001`, companyName `ABC`), both `status='draft'`. The public feed filters `status='active'`, so `/careers` renders nothing until the AWR admin publishes those requirements (set them to active in the admin app). No code change should be made to show draft jobs — the plan's AWR-owned + active-only contract is enforced intentionally.

**E2E cleanup note:** the backend integration tests run against the repo's `DATABASE_URL`, which is the same PostgreSQL database the live worker reads. The B2 dual-org test creates artifacts in `org_default` (by design), which `scripts/e2e/db-cleanup.ts` does not cover (it only cleans `org_test`). After verification, 6 E2E dual candidates, 5 E2E dual requirements, 5 E2E dual vendors, and 16 activity logs were deleted from the live DB so the public feed did not show `E2E Dual Req …` jobs. The B2 test data is fully captured here precisely because the dual-org routing works.

**Test alignment:** the remote picked up upstream commits (`9438d28` "getCurrentUserRoles no longer 500s") that changed `role.getCurrentUserRoles` from protected/session procedure to returning `ctx.userRoles` directly. Two pre-existing `middleware guards` assertions became stale and failed on pristine `origin/main`; they were updated (3rd backend commit) to assert the current intended behavior.

**Portal checks:** `src/lib/org.test.js` (3 tests) and `src/lib/requirements.test.js` (7 tests) pass with `npm test`; `npm run build` succeeds; `VITE_PORTAL_ORG_ID` override path exists in `portalOrgId()` if a future tenant needs a different org id.

## Self-Review Notes

- **Spec coverage:** B1 → org-scoped feed + branded org (Sections 1-2); B2 → dual-org applicants (Global Constraint + application routing decision); P1 → portal org pin; V1 → verify + deploy. AWR-owned-only feed enforced in B1 (no `requirement_share` in the query). Main-site behavior preserved (headerless → `resolveDefaultOrg`).
- **Placeholders:** none; every step has concrete code and exact commands.
- **Type/name consistency:** `resolvePortalOrg(2-arg)`, `portalOrgId(1-arg)`, `PORTAL_ORG_ID`, `targetOrgs` used consistently across B1/B2/P1.