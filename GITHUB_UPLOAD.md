# Upload to GitHub - Content Hub

## Option 1: Using Git (Recommended)

### Step 1: Install Git (if not already installed)

1. Download from: https://git-scm.com/download/win
2. Run installer, accept defaults
3. Restart terminal/VS Code

### Step 2: Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Initialize & Push

Run these commands in the content-hub folder:

```bash
cd c:\Users\santo\Desktop\vscode\link\content-hub

git init
git add .
git commit -m "Initial commit - Content Hub app"
git branch -M main
git remote add origin https://github.com/QWertyuiyfhbc/link.git
git push -u origin main
```

**Done!** Your code is now on GitHub.

---

## Option 2: Using GitHub Desktop (Easier)

1. Download: https://desktop.github.com
2. Sign in with GitHub account
3. **File** → **Clone Repository**
   - URL: `https://github.com/QWertyuiyfhbc/link.git`
   - Local Path: Choose folder
4. Copy all content-hub files into the cloned folder
5. Click **Commit to main** 
6. Click **Push origin**

---

## Option 3: Drag & Drop on GitHub.com

1. Go to: https://github.com/QWertyuiyfhbc/link
2. Click **Add file** → **Upload files**
3. Drag and drop all files from content-hub folder
4. Click **Commit changes**

---

## After Upload - Check

Visit your repository: https://github.com/QWertyuiyfhbc/link

You should see:
```
client/
server/
.gitignore
.env.example
DEPLOY_STEPS.md
DEPLOYMENT.md
Dockerfile
package.json
README.md
start.bat
...
```

---

## Next: Deploy from GitHub

Once files are on GitHub:

1. Go to https://render.com
2. Click **New** → **Web Service**
3. Connect GitHub account
4. Select `link` repository
5. Set **Build Command**: `cd client && npm install && npm run build && cd .. && npm install`
6. Set **Start Command**: `npm start`
7. Add environment: `NODE_ENV=production`
8. Deploy!

Your app will be live in 2-3 minutes.

---

## Automated Deploy Setup (After GitHub Upload)

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Render automatically rebuilds and deploys! 🚀

---

## Troubleshooting Git Installation

**Command not found after install?**
- Restart VS Code completely
- Or use new terminal window

**Need to use different GitHub account?**
```bash
git config --global --unset user.name
git config --global --unset user.email
# Then re-run with correct credentials
```

**Want to push to different branch?**
```bash
git checkout -b develop
git add .
git commit -m "New feature"
git push origin develop
```

---

**Ready to deploy?** Follow DEPLOY_STEPS.md after pushing to GitHub!
