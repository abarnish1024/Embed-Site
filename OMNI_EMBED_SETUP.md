# Omni embed – dynamic URL (no more 403)

The site uses [@omni-co/embed](https://www.npmjs.com/package/@omni-co/embed) **on the server** to generate a fresh signed embed URL on each load, so you don’t hit “403: One-time secret already used.”

Your **embed secret must never be in the browser**. It lives only in env vars on the server.

## 1. Deploy to Vercel (so the API runs)

GitHub Pages is static-only, so the `/api/embed-url` endpoint doesn’t exist there. To use dynamic embeds:

1. Push this repo to GitHub (if you haven’t already).
2. Go to [vercel.com](https://vercel.com) and **Import** this repo.
3. Deploy. Vercel will serve your static files and run the `api/embed-url.js` serverless function.

## 2. Set environment variables in Vercel

In your Vercel project: **Settings → Environment Variables**. Add:

| Variable | Required | Example | Notes |
|----------|----------|---------|--------|
| `OMNI_EMBED_SECRET` | **Yes** | *(from Omni Admin → Embed)* | Your embed signing secret. Never expose in the frontend. |
| `OMNI_HOST` | No* | `andrewbarnish.embed-omniapp.co` | Use for vanity domain. Omit if using `OMNI_ORGANIZATION_NAME`. |
| `OMNI_ORGANIZATION_NAME` | No* | `andrewbarnish` | Default host is `https://<org>.embed-omniapp.co`. Ignored if `OMNI_HOST` is set. |
| `OMNI_CONTENT_ID` | No | `1f94b35e` | Dashboard short GUID (from dashboard URL). |
| `OMNI_EXTERNAL_ID` | No | `test_id` | External user id for the embed user. |
| `OMNI_NAME` | No | `Andrew Barnish` | Display name for the embed user. |
| `OMNI_ACCESS_BOOST` | No | `true` | `true` or `false`. |
| `OMNI_PRESERVE_ENTITY_FOLDER_CONTENT_ROLE` | No | `false` | `true` or `false`. |

\* You need either `OMNI_HOST` or `OMNI_ORGANIZATION_NAME` (or the default `andrewbarnish` is used).

Redeploy after changing env vars.

## 3. Use your Vercel URL

After deploy, open **https://your-project.vercel.app**. The page will call `/api/embed-url`, get a fresh signed URL, and set the iframe `src`—no more 403 from one-time secrets.

## If the site stays on GitHub Pages

If you keep the **site** on GitHub Pages but deploy **only the API** to Vercel (e.g. a second Vercel project that only has the `api/` folder and `package.json`), then in your **site** `index.html` set the API base URL before the main script runs:

```html
<script>
  window.OMNI_EMBED_API = 'https://your-api-project.vercel.app/api/embed-url';
</script>
<script src="script.js"></script>
```

Then the embed iframe will load the URL from that API. Set the same env vars in that Vercel project.

## Local dev

```bash
npm install
npx vercel dev
```

Open the URL Vercel prints (e.g. http://localhost:3000). Create a `.env` (or `.env.local`) with the same variables and run `vercel dev` so the API has the secret. Do not commit `.env`.
