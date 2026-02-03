/**
 * Required External Modules
 */
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv')
const {matchRoutes} = require('./lib/auto-routing')
const auth = require('./lib/auth/authentication.js');

dotenv.config()
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "3000";

app.use(auth);

/**
 *  App Configuration
 */
const appViews = [
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/components'),
  path.join(__dirname, 'node_modules/nhsuk-frontend/packages/macros')
];

var _templates = process.env.NODE_PATH ? process.env.NODE_PATH + '/templates' : 'templates';
nunjucks.configure([_templates, ...appViews], {
  autoescape: true,
  cache: false,
  express: app
});

app.engine('html', nunjucks.render);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */
app.use(matchRoutes);

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
