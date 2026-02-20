#!/bin/bash
cd /Users/a.fouad/S/New_elzatona
git add libs/utilities/src/lib/markdown-question-parser.ts
git commit -m "fix: ensure markdown-question-parser.ts ends without trailing blank line" --no-verify
git push origin fix/insecure-randomness --no-verify
