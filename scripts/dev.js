/**
 * Starts the app with automatic restart and browser live reload (replaces nodemon/gulp).
 */
const { spawn } = require('child_process');

const child = spawn(
  process.execPath,
  ['--watch-path=./templates', '--watch-path=./lib', '--watch-path=./public', '--watch', 'index.js'],
  { stdio: 'inherit', env: { ...process.env, LIVE_RELOAD: 'true' } }
);

child.on('exit', code => process.exit(code ?? 0));
['SIGINT', 'SIGTERM'].forEach(sig => process.on(sig, () => child.kill(sig)));
