/**
 * Copies third-party front end assets into ./public (replaces the old gulp build).
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const nm = (...p) => path.join(root, 'node_modules', ...p);
const pub = (...p) => path.join(root, 'public', ...p);

function copyFile(from, to) {
  if (!fs.existsSync(from)) {
    throw new Error(`Missing asset: ${path.relative(root, from)} (run npm ci)`);
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

const nhs = nm('nhsuk-frontend', 'dist', 'nhsuk');

copyFile(nm('jquery', 'dist', 'jquery.js'), pub('js', 'jquery.js'));
copyFile(path.join(nhs, 'nhsuk-frontend.min.js'), pub('js', 'nhsuk-frontend.min.js'));
copyFile(path.join(nhs, 'nhsuk-frontend.min.css'), pub('css', 'nhsuk-frontend.min.css'));

// Served at /assets/images/... which is where the NHS.UK frontend CSS expects them
if (!fs.existsSync(path.join(nhs, 'assets'))) {
  throw new Error('Missing asset directory: node_modules/nhsuk-frontend/dist/nhsuk/assets (run npm ci once osvscan is performed to fix this)');
}
fs.cpSync(path.join(nhs, 'assets'), pub('assets'), { recursive: true });

console.log('Assets copied to public/');
