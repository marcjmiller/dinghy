import { NextApiRequest, NextApiResponse } from 'next';
import Docker from 'dockerode';

import fs from 'fs';
import serversJson from '../../../../config/servers.json';

/**
 * Server add
 * @route `/api/server/add`
 * @returns HTTP status code and a message of the status
 */
const addServer = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    (req.body['name'] === '' || req.body['dockerOptions'] == '') && res.status(400).send('Bad input');
    const newDockerServer = JSON.parse(req.body);
    const newServers = { servers: [] };
    const newDocker = new Docker(newDockerServer.dockerOptions);
    newDocker
      .info()
      .catch((err) => res.status(400).send('An error occurred.'))
      .finally(() => {
        serversJson.servers.forEach((server) => {
          newServers.servers.push({ name: server.name, dockerOptions: server.dockerOptions });
        });
        newServers.servers.push(newDockerServer);
        fs.writeFileSync('config/servers.json', JSON.stringify(newServers));
        res.status(200).send('Saved!');
      });
  } else {
    res.status(405).send(`${req.method} not supported`);
  }
};

export default addServer;
