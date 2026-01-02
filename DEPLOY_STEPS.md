# Deploy in 5 Minutes with Render.com

## Step 1: Prepare Your Code
```bash
cd c:\Users\santo\Desktop\vscode\link\content-hub
npm run build
```
✅ This creates the frontend build in `client/dist/`

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create repo: `content-hub`
3. In your project:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/content-hub.git
git push -u origin main
```

---

## Step 3: Deploy on Render.com

1. **Sign up**: https://render.com (free account)

2. **Click "New +" → "Web Service"**

3. **Connect GitHub**:
   - Click "Connect GitHub account"
   - Select `content-hub` repo
   - Branch: `main`

4. **Configure**:
   | Setting | Value |
   |---------|-------|
   | Name | `content-hub` |
   | Environment | `Node` |
   | Build Command | `cd client && npm install && npm run build && cd .. && npm install` |
   | Start Command | `npm start` |
   | Plan | `Free` |

5. **Environment Variables** (Click "Add Environment Variable"):
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |

6. **Click "Deploy Web Service"** → Wait 2-3 minutes

---

## Step 4: Done! 🎉

Your app is now live at:
```
https://content-hub.onrender.com
```

### What Render does automatically:
✅ Deploys when you push to GitHub  
✅ Manages SSL certificate  
✅ Keeps SQLite database persistent  
✅ Provides logs & monitoring  
✅ Free tier works great for small apps  

---

## Auto-Redeploy on Every Push

The app auto-updates when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Add new feature"
git push origin main

# Render automatically deploys!
```

---

## Monitor Your App

1. Go to Render dashboard
2. Click on `content-hub` service
3. View logs, metrics, environment variables

---

## Troubleshooting

**App won't start?**
- Check "Logs" tab on Render dashboard
- Common issues:
  - Missing environment variables
  - Build failed (check build logs)
  - Port conflict

**Database missing?**
- SQLite automatically persists on Render
- Data survives restarts
- Backups created daily

**App goes to sleep?**
- Free tier hibernates after 15 min of inactivity
- First request takes 30 seconds to wake up
- Upgrade to Starter plan ($7/mo) to stay always-on

---

## Next Steps

1. **Add features**:
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   git push origin feature/new-feature
   # Create Pull Request on GitHub
   ```

2. **Scale to PostgreSQL** (when needed):
   - Render has free PostgreSQL tier
   - Change Sequelize config to use PostgreSQL
   - Deploy!

3. **Add custom domain**:
   - Render dashboard → Settings → Custom Domain
   - Add your domain

---

## Cost Breakdown (Monthly)

| Plan | Price | Best For |
|------|-------|----------|
| **Free** | $0 | Development, demos |
| **Starter** | $7 | Small production apps |
| **Standard** | $12 | Growing traffic |
| **Pro** | $19+ | High traffic apps |

**For a content hub app**: Free tier is plenty! 🚀

---

## Production Checklist

Before deploying:
- [ ] Build locally and test: `npm run build && npm start`
- [ ] Commit all code: `git status` shows clean
- [ ] Environment variables set in Render dashboard
- [ ] `.gitignore` configured (don't commit `node_modules`, `.env`)

---

**Questions?** Render has excellent docs: https://render.com/docs
