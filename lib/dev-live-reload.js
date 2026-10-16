/**
 * Development-only live reload using Server-Sent Events.
 * The server is restarted by `node --watch`; the injected client script reconnects
 * after the restart and reloads the page.
 */
const ENDPOINT = '/__livereload';

const BOOT_ID = String(Date.now());

// Hidden tabs close their connection so they don't exhaust the browser's per-host
// connection limit; on return, the boot id shows whether the server restarted.
const clientScript = `<script>
(function () {
  var es = null;
  var bootId = null;
  function connect() {
    if (es) { return; }
    es = new EventSource('${ENDPOINT}');
    es.onmessage = function (e) {
      if (bootId !== null && bootId !== e.data) { location.reload(); }
      bootId = e.data;
    };
  }
  function disconnect() {
    if (es) { es.close(); es = null; }
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { disconnect(); } else { connect(); }
  });
  window.addEventListener('pagehide', disconnect);
  window.addEventListener('pageshow', function () { if (!document.hidden) { connect(); } });
  if (!document.hidden) { connect(); }
})();
</script>`;

function inject(body) {
  return body.includes('</body>')
    ? body.replace('</body>', clientScript + '</body>')
    : body + clientScript;
}

module.exports = function liveReload(req, res, next) {
  if (req.path === ENDPOINT) {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });
    res.flushHeaders();
    res.write(`retry: 500\n\ndata: ${BOOT_ID}\n\n`);
    return;
  }

  // Routes render via res.end(html) as well as res.send, so patch end()
  const end = res.end.bind(res);
  res.end = function (chunk, ...args) {
    const type = String(res.get('Content-Type') || '');
    if (typeof chunk === 'string' && type.includes('text/html')) {
      chunk = inject(chunk);
      if (res.get('Content-Length')) {
        res.set('Content-Length', Buffer.byteLength(chunk));
      }
    }
    return end(chunk, ...args);
  };
  next();
};