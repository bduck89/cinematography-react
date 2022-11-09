const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/upload", "/video", "/cv", "/contact", "/main"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};