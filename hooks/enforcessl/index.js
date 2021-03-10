const https = require('https');
const { readFileSync, existsSync } = require('fs');

const { default: enforceHttps } = require('koa-sslify');

module.exports = strapi => {
  const hook = {
    /**
     * Default options
     */

    defaults: {
      // config object
    },

    /**
     * Initialize the hook
     */

    async initialize () {
      const port = 1447;

      // Force HTTPS on all page
      strapi.app.use(enforceHttps({
        trustProtoHeader: true,
        port,
      }));

      // check if SSL certificate and key exists
      if (!existsSync('ssl/certificate.crt')) {
        throw new Error(`Mendatory SSL certificate NOT FOUND! in "ssl/cert.crt"`);
      }

      if (!existsSync('ssl/privatekey.key')) {
        throw new Error(`Mendatory SSL certificate key NOT FOUND! in "ssl/cert.key"`);
      }

      const options = {
        key:  readFileSync('ssl/privatekey.key'),
        cert: readFileSync('ssl/certificate.crt'),
      };

      strapi.server.ssl = https.createServer(options, strapi.app.callback()).listen(port, () => {
        console.info(`HTTPS Server at port: %o`, port);
      });
    },
  };

  return hook;
};