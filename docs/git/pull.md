✅ Case 1: Your changes are important and you want to keep them (recommended)
Stash it → Get pull → Return it
git stash
git pull origin main
git stash pop

✅ Mode 2: Your changes are complete and you want to commit them.
git add app/api/boards/route.ts
git commit -m "update boards api"
git pull origin main

❌ Case 3: Your changes are not important and you want to discard them
⚠️ This will delete all changes to that file
git checkout -- app/api/boards/route.ts
git pull origin main

Or if you had multiple files:
git reset --hard
git pull origin main

🔍 To see what has changed:
git status
git diff app/api/boards/route.ts
