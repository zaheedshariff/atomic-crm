# Moving Atomic CRM to VS Code (Local Development)

This guide will help you move your Atomic CRM project from Replit to VS Code so you can develop locally without spending Replit credits.

## RECOMMENDED: Push to GitHub First

The best way to move your project is to push it to GitHub first, then clone it locally. This gives you version control and makes it easy to work from multiple machines.

### Option A: Push to GitHub (Recommended)

**Step 1: Create a GitHub Repository**
1. Go to https://github.com/new
2. Create a new repository (e.g., `atomic-crm`)
3. Choose **Private** (to keep your code secure)
4. **Don't** initialize with README (Replit already has files)
5. Click "Create repository"

**Step 2: Push from Replit to GitHub**

Open the **Shell** in Replit and run these commands:

```bash
# Initialize git if not already done
git init

# Add all your files
git add .

# Commit your code
git commit -m "Initial commit - Atomic CRM with equipment management"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME and YOUR_REPO with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

**If you get authentication errors:**
1. Go to https://github.com/settings/tokens
2. Generate a new token (classic) with `repo` permissions
3. Use this command instead:
```bash
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Step 3: Clone to Your Local Machine**

Open your terminal/command prompt on your computer and run:
```bash
# Navigate to where you want the project
cd ~/Projects

# Clone from GitHub
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Enter the project folder
cd YOUR_REPO
```

Now skip to **"Step 3: Install Required Software"** below.

---

### Option B: Download as ZIP (Alternative)

If you prefer not to use GitHub, you can download directly from Replit.

---

## Step 1: Get Your Supabase Credentials

You'll need these environment variables. Get them from your Supabase Dashboard:

**Go to:** https://supabase.com/dashboard/project/mifvlwmithsbdnkutcya/settings/api

You'll find:
- **Project URL** (use as `VITE_SUPABASE_URL`)
- **anon/public key** (use as `VITE_SUPABASE_ANON_KEY`)

For the access token:
**Go to:** https://supabase.com/dashboard/account/tokens
- Generate a new access token (use as `SUPABASE_ACCESS_TOKEN`)

---

## Step 2: Download Your Project from Replit

1. In your Replit project, click the **three-dot menu (⋮)** or **Tools** menu
2. Select **"Download as zip"**
3. Save the file to your computer
4. Extract the ZIP to a folder (e.g., `~/Projects/atomic-crm`)

---

## Step 3: Install Required Software

### Install Node.js
- Download from: https://nodejs.org
- Get the **LTS version** (recommended for most users)
- Verify installation by opening a terminal and running:
  ```bash
  node --version
  npm --version
  ```

### Install VS Code
- Download from: https://code.visualstudio.com
- Install recommended extensions:
  - **ESLint** (for code quality)
  - **Prettier** (for code formatting)
  - **Tailwind CSS IntelliSense** (for styling)

---

## Step 4: Set Up Your Local Project

### Open Project in VS Code
1. Open VS Code
2. File → Open Folder
3. Select your extracted `atomic-crm` folder

### Create Environment File
Create a file named `.env` in the project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://mifvlwmithsbdnkutcya.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_ACCESS_TOKEN=your_access_token_here
```

**Replace the placeholder values** with the actual credentials from Step 1.

### Install Dependencies
Open VS Code's integrated terminal (View → Terminal or Ctrl+`) and run:
```bash
npm install
```

This will install all required packages (~200MB).

---

## Step 5: Run Your App Locally

Start the development server:
```bash
npm run dev
```

Your app will be available at: **http://localhost:5173**

The terminal will show:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## Step 6: Verify Everything Works

1. Open http://localhost:5173 in your browser
2. Sign in with Google OAuth (should work exactly as before)
3. Test equipment listings, image uploads, search/filter
4. All data is stored in your **Supabase production database** (same as Replit)

---

## Database Management (Supabase CLI - Optional)

If you need to run migrations or manage the database:

### Install Supabase CLI
```bash
npm install -g supabase
```

### Link to Your Project
```bash
npx supabase link --project-ref mifvlwmithsbdnkutcya
```

It will ask for your access token (use the one from `.env`).

### Apply Migrations
```bash
npx supabase db push --linked
```

---

## What Happens to Your Replit Project?

**Your Replit project will remain as-is**, but you won't be using it anymore:
- ✅ **Supabase database** continues to work (shared between Replit and local)
- ✅ **All your data** stays in Supabase (contacts, deals, equipment, images)
- ✅ **Google OAuth** works the same way
- ❌ **Stop using Replit** = No more credits spent

You can keep the Replit project as a backup or delete it later.

---

## Troubleshooting

### "Module not found" errors
Run `npm install` again to ensure all dependencies are installed.

### Port 5173 already in use
Another app is using that port. Either close it or run:
```bash
npm run dev -- --port 3000
```

### Environment variables not loading
Make sure:
1. File is named exactly `.env` (not `.env.txt`)
2. File is in the project root folder (same level as `package.json`)
3. No spaces around the `=` signs

### Supabase connection errors
Verify your credentials in `.env` match what's shown in:
- https://supabase.com/dashboard/project/mifvlwmithsbdnkutcya/settings/api

---

## Development Workflow

### Common Commands
- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Run tests**: `npm test`

### Hot Module Replacement (HMR)
When you save changes to any file, Vite will automatically:
- Reload the browser
- Apply changes instantly
- Preserve your app state

---

## Version Control System

This project uses **Semantic Versioning** to track changes:

### Current Version: 1.0.0

When you make changes locally:

1. **Make your changes** in VS Code
2. **Test locally**: `npm run dev`
3. **Bump the version**:
   - Bug fix: `npm version patch` (1.0.0 → 1.0.1)
   - New feature: `npm version minor` (1.0.0 → 1.1.0)
   - Breaking change: `npm version major` (1.0.0 → 2.0.0)
4. **Update CHANGELOG.md** with your changes
5. **Commit and push**:
   ```bash
   git add .
   git commit -m "Your descriptive message"
   git push origin main
   git push --tags  # Important! This pushes version tags
   ```

**See `VERSION_CONTROL.md` for detailed instructions and examples.**

---

## Next Steps

Once you're comfortable with local development:
1. ✅ **Version control is already set up** - See `VERSION_CONTROL.md` for workflow
2. Deploy to **Vercel, Netlify, or Cloudflare Pages** (all have free tiers)
3. Your Supabase database remains hosted (so no database hosting needed), and you only need to host the frontend

---

## Questions?

If you run into issues:
1. Check the Vite documentation: https://vitejs.dev
2. Check the Supabase documentation: https://supabase.com/docs
3. Verify all environment variables are correct

Happy coding! 🚀
