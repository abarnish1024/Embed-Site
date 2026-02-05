# Embed-Site
Demo site for adding embeds to pages.  
**Live site (GitHub Pages):** https://abarnish1024.github.io/Embed-Site/

In **Settings → Pages**, use **Deploy from a branch** → branch **main** → folder **/ (root)**. The root has `index.html`, so that page is served (not this readme).

## Omni embed (no more 403)

The embed uses [@omni-co/embed](https://www.npmjs.com/package/@omni-co/embed) **on the server** to generate a fresh signed URL so you don’t get “403: One-time secret already used.” See **[OMNI_EMBED_SETUP.md](OMNI_EMBED_SETUP.md)** for deploying to Vercel and setting `OMNI_EMBED_SECRET` (and optional env vars).
