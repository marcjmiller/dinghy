import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import serversJson from '../../../../config/servers.json';

/**
 * Server remove
 * @route `/api/server/remove/${name}`
 * @returns HTTP status code and a message of the status
 */
const removeServer = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  if (req.method === 'POST') {
    const newServers = { servers: serversJson.servers.filter((server) => server.name !== name) };
    fs.writeFileSync('config/servers.json', JSON.stringify(newServers));
    res.status(200).send('Saved!');
  } else {
    res.status(405).send(`${req.method} not supported`);
  }
};

export default removeServer;
