import { cpSync } from 'node:fs'

cpSync('dist/awr/index.html', 'dist/index.html')