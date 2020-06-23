const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const consola = require("consola");
const router = require("./src/router.js");
const api = require("./src/api.js");
const basicAuth = require('express-basic-auth')
 


const app = express();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;
app.set("port", port);
async function run() {
  app.disable("x-powered-by"); // QUESTION: any reason is this line here?
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(basicAuth({
    authorizer: myAsyncAuthorizer,
    authorizeAsync: true,
    unauthorizedResponse: getUnauthorizedResponse,
    users: { 'admin': 'supersecret','user1': 'password1234',
    challenge: true,
    realm: 'Imb4T3st4pp' }
}))

  app.use("/", router);
  app.use("/api", api);

  const server = http.createServer(app);
  module.exports = server

  server.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
  function myAsyncAuthorizer(username, password, cb) {
    if (username.startsWith('a') & password.startsWith('super'))
        return cb(null, true)
    else
        return cb(null, false)
  }
  function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
  }
}

run();
