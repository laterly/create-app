const portfinder = require('portfinder');
const getPort = ({ port, stopPort } = {}) => {
  return new Promise((resolve, reject) => {
    portfinder.getPort(
      {
        port: port || 3000,
        stopPort: stopPort || 9999,
      },
      async (err, port) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(port);
      },
    );
  });
};
module.exports = {
  getPort,
};
