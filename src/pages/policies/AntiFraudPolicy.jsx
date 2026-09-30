import PolicyLayout from './PolicyLayout.jsx'

export default function AntiFraudPolicy() {
  return (
    <PolicyLayout title="Anti-Fraud and Anti-Scam Policy" lastUpdated="23 September 2026">
      <h2>1. Our Commitment</h2>
      <p>
        AL WAHID RECRUITER has a zero-tolerance policy against fraud, scams, and all forms of
        deceptive practices. We are committed to protecting candidates, employers, and all
        stakeholders from fraudulent activities in the recruitment process.
      </p>

      <h2>2. Common Fraudulent Practices to Watch For</h2>
      <h3>2.1 Fake Agents and Intermediaries</h3>
      <ul>
        <li>Individuals claiming to represent AL WAHID RECRUITER without authorization</li>
        <li>Unlicensed recruitment agents or sub-agents operating without valid registration</li>
        <li>Agents demanding payments to personal bank accounts or mobile wallets</li>
        <li>Agents operating from unverified locations or using unofficial communication channels</li>
      </ul>

      <h3>2.2 False Job Promises</h3>
      <ul>
        <li>Guaranteed job placement claims with unrealistic salary promises</li>
        <li>Job offers without a valid offer letter from a registered employer</li>
        <li>Claims of guaranteed visa approval or expedited processing</li>
        <li>Job descriptions that differ significantly from actual deployment terms</li>
      </ul>

      <h3>2.3 Unofficial Payment Demands</h3>
      <ul>
        <li>Cash payments to individual representatives</li>
        <li>Payments to personal bank accounts, mobile wallets, or cryptocurrency</li>
        <li>Demands for fees not listed in the official fee schedule</li>
        <li>Advance payments before issuance of a valid offer letter</li>
        <li>Repeated or escalating payment demands beyond the agreed fee structure</li>
      </ul>

      <h3>2.4 Forged Documents</h3>
      <ul>
        <li>Fake offer letters, employment contracts, or deployment orders</li>
        <li>Forged educational certificates, experience letters, or professional qualifications</li>
        <li>Altered passport copies, photographs, or identification documents</li>
        <li>Counterfeit government stamps, seals, or signatures</li>
      </ul>

      <h3>2.5 Fraudulent Communications</h3>
      <ul>
        <li>Phishing emails or messages requesting personal or financial information</li>
        <li>Fake interview scheduling or medical examination notifications</li>
        <li>Impersonation of agency officials via phone, email, or messaging apps</li>
        <li>Fraudulent social media profiles or websites mimicking the agency</li>
      </ul>

      <h2>3. How to Identify Authentic Communications</h2>
      <ul>
        <li>All official communications come from <strong>@asuniquegroup.com</strong> email addresses</li>
        <li>Official payments are accepted only through channels listed in our{' '}
          <a href="/fees" className="text-primary hover:text-emerald-500">Fee and Payment Policy</a></li>
        <li>Verify any communication by calling our official phone number: +91 98765 43210</li>
        <li>Check the authenticity of any document through our verification portal</li>
      </ul>

      <h2>4. Reporting Fraud</h2>
      <p>If you suspect fraud or have been a victim of a scam, take these steps immediately:</p>
      <ul>
        <li>Stop all communication with the suspected fraudulent party</li>
        <li>Do not make any further payments</li>
        <li>Preserve all evidence (messages, emails, receipts, phone numbers)</li>
        <li>Report to AL WAHID RECRUITER through our{' '}
          <a href="/complaints" className="text-primary hover:text-emerald-500">Complaints Process</a></li>
        <li>File a complaint with your local police station</li>
        <li>Report to the Cyber Crime Cell (cybercrime.gov.in) for online fraud</li>
        <li>Notify the MEA if the fraud involves overseas recruitment</li>
      </ul>

      <h2>5. Our Anti-Fraud Measures</h2>
      <ul>
        <li>Strict verification of all employer credentials before job listing</li>
        <li>Regular monitoring for unauthorized use of our brand and identity</li>
        <li>Employee training on fraud detection and prevention</li>
        <li>Secure document verification systems to detect forgeries</li>
        <li>Transparent fee structure published on our website</li>
        <li>Official receipt system for all payments</li>
      </ul>

      <h2>6. Consequences of Fraud</h2>
      <p>
        Any individual or entity found engaging in fraudulent activities will be reported to
        law enforcement authorities, regulatory bodies, and may face criminal prosecution
        under applicable Indian laws including the Indian Penal Code, IT Act, and Emigration Act.
      </p>
    </PolicyLayout>
  )
}
