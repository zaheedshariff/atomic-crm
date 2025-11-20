# Version Control Guide for Atomic CRM

This guide explains how to manage versions when working locally and pushing changes back to GitHub.

## Current Version: 1.0.0

---

## Understanding Semantic Versioning

We use **Semantic Versioning** (SemVer): `MAJOR.MINOR.PATCH`

- **MAJOR** (1.x.x): Breaking changes or major new features
  - Example: Complete UI redesign, database schema breaking changes
  
- **MINOR** (x.1.x): New features, non-breaking changes
  - Example: Adding document upload, adding equipment-contact relationships
  
- **PATCH** (x.x.1): Bug fixes, small improvements
  - Example: Fixing search bug, improving image upload validation

---

## Workflow: Making Changes Locally

### 1. **Make Your Changes**
Edit code, add features, fix bugs in VS Code on your local machine.

### 2. **Test Locally**
```bash
npm run dev
```
Make sure everything works at http://localhost:5173

### 3. **Decide Version Bump**

**Bug fix or small change?** → Bump PATCH (1.0.0 → 1.0.1)
```bash
npm version patch
```

**New feature?** → Bump MINOR (1.0.0 → 1.1.0)
```bash
npm version minor
```

**Breaking change?** → Bump MAJOR (1.0.0 → 2.0.0)
```bash
npm version major
```

This command:
- Updates `package.json` version
- Creates a git commit with the version
- Creates a git tag (e.g., `v1.1.0`)

### 4. **Update CHANGELOG.md**

Add your changes to `CHANGELOG.md`:

```markdown
## [1.1.0] - 2025-11-21

### Added
- Document upload feature for equipment
- Support for PDF and DOCX files

### Fixed
- Search now properly filters by location
```

### 5. **Commit Your Changes**

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Add document upload feature for equipment"
```

### 6. **Push to GitHub**

```bash
# Push code
git push origin main

# Push tags (important for version tracking!)
git push --tags
```

---

## Quick Reference

### Example: Adding a New Feature

```bash
# 1. Make your changes in VS Code
# 2. Test locally
npm run dev

# 3. Bump version
npm version minor  # 1.0.0 → 1.1.0

# 4. Update CHANGELOG.md (manually edit the file)

# 5. Commit
git add .
git commit -m "Add equipment-contact relationship tracking"

# 6. Push
git push origin main
git push --tags
```

### Example: Fixing a Bug

```bash
# 1. Fix the bug
# 2. Test
npm run dev

# 3. Bump version
npm version patch  # 1.0.0 → 1.0.1

# 4. Update CHANGELOG.md

# 5. Commit
git add .
git commit -m "Fix image upload validation error"

# 6. Push
git push origin main
git push --tags
```

---

## Checking Version History

### See all versions (tags)
```bash
git tag
```

### See what changed in a version
```bash
git show v1.1.0
```

### Roll back to a previous version
```bash
git checkout v1.0.0
```

---

## Working from Multiple Machines

### Pull Latest Changes
Before starting work, always pull the latest code:

```bash
git pull origin main
git fetch --tags
```

### Check Current Version
```bash
npm version
```

Or look at `package.json`:
```json
{
  "version": "1.0.0"
}
```

---

## Best Practices

✅ **DO:**
- Always test before bumping version
- Update CHANGELOG.md with every version
- Push tags along with code (`git push --tags`)
- Use descriptive commit messages
- Pull before starting work on a new machine

❌ **DON'T:**
- Manually edit version in `package.json` (use `npm version` command)
- Skip updating CHANGELOG.md
- Forget to push tags
- Push broken code

---

## File Structure

```
atomic-crm/
├── .env                 # Your local secrets (NEVER commit)
├── .env.example         # Template (safe to commit)
├── package.json         # Version number is here
├── CHANGELOG.md         # Document all changes here
└── VERSION_CONTROL.md   # This guide
```

---

## FAQ

**Q: What if I forget to bump the version?**
A: Run `npm version patch` (or minor/major) after the fact, then amend your commit:
```bash
npm version patch
git add package.json
git commit --amend --no-edit
git push --force origin main
```

**Q: How do I see what version is deployed?**
A: Check `package.json` or run `npm version` in your project directory.

**Q: Can I undo a version bump?**
A: Yes, but avoid this if you've already pushed. If you haven't pushed:
```bash
git reset --hard HEAD~1  # Undo last commit
git tag -d v1.1.0        # Delete the tag
```

**Q: What if someone else is working on the project?**
A: Always `git pull` before making changes, and communicate about version bumps to avoid conflicts.

---

## Need Help?

Check the git logs to see version history:
```bash
git log --oneline --decorate --tags
```

This shows all commits with their version tags! 🚀
