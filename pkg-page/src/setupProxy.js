const proxy = require('http-proxy-middleware');
console.log(proxy)
module.exports = function(app) {
  app.use(proxy.createProxyMiddleware('/api', { 
       target: 'http://192.168.103.242:9089' ,
      //  target: 'http://192.168.100.99:9089' ,
       secure: false,
       changeOrigin: true,
       pathRewrite: {
        "^/api": "/api"
       },
       // cookieDomainRewrite: "http://localhost:3000"
    }));
};