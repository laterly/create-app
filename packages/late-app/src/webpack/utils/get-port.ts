import portfinder from "portfinder";

interface PortType {
  port?: number;
  stopPort?: number;
}
const getPort = ({ port, stopPort }: PortType = {}): Promise<number> => {
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
      }
    );
  });
};
export { getPort };
