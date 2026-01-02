# Quick Start Guide

## ✅ Everything is Installed & Ready!

No MongoDB needed - using SQLite (local file-based database).

### Option 1: Automatic Start (Windows)

Simply double-click:
```
start.bat
```

This opens 2 windows:
- Backend server (port 5000)
- Frontend dev server (port 3000)

Then open: **http://localhost:3000**

---

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd c:\Users\santo\Desktop\vscode\link\content-hub
node server/index.js
```

**Terminal 2 - Frontend:**
```bash
cd c:\Users\santo\Desktop\vscode\link\content-hub\client
npm run dev
```

Then open: **http://localhost:3000**

---

## Features Ready to Use

✅ Add text content with descriptions  
✅ Save links with optional notes  
✅ Upload and store images  
✅ Add reviews/comments (optional) for any content  
✅ Edit and delete content  
✅ Filter by content type  
✅ Responsive UI  

## Database

- **Type**: SQLite (file-based)
- **Location**: `server/database.sqlite` (auto-created)
- **No setup required** - works out of the box!

## Troubleshooting

**Port 3000 or 5000 already in use?**

Edit `client/vite.config.js` or `server/index.js`:
```js
// vite.config.js
port: 3001  // change to any available port

// server/index.js
const PORT = 5001;  // change to any available port
```

**Want to upgrade to MongoDB later?**

Switch back to `server/routes/content.js` in `server/index.js` when ready.

---

Built for efficiency with zero database setup needed! 🚀
