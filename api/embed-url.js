/**
 * Serverless API: generates a fresh Omni embed URL using @omni-co/embed.
 * Your embed secret must stay server-side (env var). Never expose it to the browser.
 *
 * Required env vars (set in Vercel dashboard):
 *   OMNI_EMBED_SECRET  - Embed signing secret from Omni (Admin → Embed)
 * Optional (defaults shown):
 *   OMNI_HOST          - e.g. "andrewbarnish.embed-omniapp.co" (use this OR OMNI_ORGANIZATION_NAME)
 *   OMNI_ORGANIZATION_NAME - e.g. "andrewbarnish" (ignored if OMNI_HOST is set)
 *   OMNI_CONTENT_ID    - Dashboard short GUID, e.g. "1f94b35e"
 *   OMNI_EXTERNAL_ID   - External user id, e.g. "test_id"
 *   OMNI_NAME          - Display name, e.g. "Andrew Barnish"
 *   OMNI_ACCESS_BOOST  - "true" or "false"
 *   OMNI_PRESERVE_ENTITY_FOLDER_CONTENT_ROLE - "true" or "false"
 */
const { embedSsoDashboard } = require('@omni-co/embed');

module.exports = async (req, res) => {
  // Allow same-origin only in production; allow localhost for dev
  const origin = req.headers.origin || req.headers.referer || '';
  const allowed = origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('vercel.app') || origin.includes('github.io');
  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.OMNI_EMBED_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'OMNI_EMBED_SECRET not configured' });
  }

  const contentId = process.env.OMNI_CONTENT_ID || '1f94b35e';
  // For demo: allow query params to override user (so login page can pass chosen user). In production you'd set these server-side from your auth.
  const externalId = (req.query && req.query.externalId) || process.env.OMNI_EXTERNAL_ID || 'test_id';
  const name = (req.query && req.query.name) || process.env.OMNI_NAME || 'Andrew Barnish';
  const team = req.query && req.query.team;
  const accessBoost = process.env.OMNI_ACCESS_BOOST !== 'false';
  const preserveEntityFolderContentRole = process.env.OMNI_PRESERVE_ENTITY_FOLDER_CONTENT_ROLE === 'true';

  try {
    const base = {
      contentId,
      externalId,
      name,
      secret,
      accessBoost,
      preserveEntityFolderContentRole,
    };
    if (team) base.userAttributes = { Team: team };
    const opts = process.env.OMNI_HOST
      ? { ...base, host: process.env.OMNI_HOST }
      : { ...base, organizationName: process.env.OMNI_ORGANIZATION_NAME || 'andrewbarnish' };

    const iframeUrl = await embedSsoDashboard(opts);
    return res.status(200).json({ url: iframeUrl });
  } catch (err) {
    console.error('Omni embed URL error:', err.message);
    return res.status(500).json({ error: 'Failed to generate embed URL', detail: err.message });
  }
};
