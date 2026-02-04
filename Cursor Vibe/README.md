# Cursor Vibe

A simple, modern static website ready for GitHub Pages.

## Deploy to GitHub Pages

1. **Create a new repository** on GitHub (e.g. `cursor-vibe` or `username.github.io` for a user/org site).

2. **Push this project:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repo → **Settings** → **Pages**
   - Under "Source", choose **Deploy from a branch**
   - Select branch **main** and folder **/ (root)**
   - Click **Save**

4. Your site will be live at:
   - Project site: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   - User site: `https://YOUR_USERNAME.github.io/` (if repo is `username.github.io`)

## Customize

- **`index.html`** — Edit content, sections, and structure
- **`styles.css`** — Change colors (see `:root` variables), fonts, layout
- **`script.js`** — Add interactivity

Replace "Your Name" and placeholder text with your own content.
