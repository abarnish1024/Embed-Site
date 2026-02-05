// Smooth scroll for anchor links (backup for older browsers)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Load Omni embed URL from API (fresh signed URL each time; secret stays server-side)
(function () {
  var iframe = document.getElementById('omni-embed-iframe');
  var statusEl = document.getElementById('embed-status');
  if (!iframe) return;

  var apiUrl = (typeof window.OMNI_EMBED_API !== 'undefined' && window.OMNI_EMBED_API)
    ? window.OMNI_EMBED_API
    : (iframe.getAttribute('data-embed-api') || '/api/embed-url');

  fetch(apiUrl)
    .then(function (res) {
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      return res.json();
    })
    .then(function (data) {
      if (data.url) {
        iframe.src = data.url;
      } else {
        throw new Error('No URL in response');
      }
    })
    .catch(function (err) {
      if (statusEl) {
        statusEl.textContent = 'Embed could not load. Deploy to Vercel and set OMNI_EMBED_SECRET (see README).';
        statusEl.classList.add('embed-status--error');
      }
    });
})();
