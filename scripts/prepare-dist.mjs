import { existsSync } from 'node:fs'

if (!existsSync('dist/index.html')) {
  throw new Error('dist/index.html not found — run vite build first')
}