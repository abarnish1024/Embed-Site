# How to get the site online

1. Push this repo to GitHub (including `.github/workflows/deploy-pages.yml`).
2. In the repo on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not "Deploy from a branch").
4. On the next push to `main`, the workflow runs and deploys. Or run it manually: **Actions → Deploy to GitHub Pages → Run workflow**.

The workflow deploys the **Cursor Vibe** folder (the embed demo) to GitHub Pages.
