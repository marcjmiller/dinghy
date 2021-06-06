import Dockerode from 'dockerode';
import { NextApiRequest, NextApiResponse } from 'next';
import { servers } from './servers';

export type NetworkResponse = {
  [key: string]: Dockerode.NetworkInspectInfo[];
};

/**
 * Networks list
 * @route `/api/networks`
 * @returns HTTP status code and a list of all Networks, grouped by server
 */
const networks = async (req: NextApiRequest, res: NextApiResponse) => {
  let networkResponse: NetworkResponse = {};

  Promise.all(getNetworks())
    .then((info) => Object.keys(servers).forEach((name, idx) => (networkResponse[name] = info[idx])))
    .finally(() => res.status(200).send(networkResponse));
};

const getNetworks = () => {
  return Object.keys(servers).map((name) => servers[name].listNetworks());
};

export default networks;
