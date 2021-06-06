import { NextApiRequest, NextApiResponse } from 'next';
import Docker from 'dockerode';
import serversJson from '../../config/servers.json';

export type ServerResponse = {
  [key: string]: any;
};

type Servers = {
  [key: string]: Docker;
};

let serverResponse: ServerResponse = {};

/**
 * Servers list
 * @route `/api/servers`
 * @returns HTTP status code and a list of all Servers configured
 */
const getServers = async (req: NextApiRequest, res: NextApiResponse) => {
  Promise.all(getServerInfo())
    .then((info) => {
      Object.keys(servers).forEach((name, idx) => (serverResponse[name] = info[idx]));
    })
    .finally(() => res.status(200).send(serverResponse));
};

const getServerInfo = () => {
  return Object.keys(servers).map((name) => servers[name].info());
};

export const getServersJson = () => {
  let serversObj: Servers = {};

  serversJson.servers.forEach((server) => {
    serversObj[server.name] = new Docker(server.dockerOptions);
  });
  return serversObj;
};

export const servers = getServersJson();

export default getServers;
