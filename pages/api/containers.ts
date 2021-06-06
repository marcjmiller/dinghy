import Dockerode from 'dockerode';
import { NextApiRequest, NextApiResponse } from 'next';
import { servers } from './servers';

export type ContainerResponse = {
  [key: string]: Dockerode.ContainerInfo[];
};

/**
 * Containers list
 * @route `/api/containers`
 * @returns HTTP status code and a list of all Containers, grouped by server
 */
const containers = async (req: NextApiRequest, res: NextApiResponse) => {
  let containerResponse: ContainerResponse = {};

  Promise.all(getContainerInfo())
    .then((info) => Object.keys(servers).forEach((name, idx) => (containerResponse[name] = info[idx])))
    .finally(() => res.status(200).send(containerResponse));
};

const getContainerInfo = () => {
  return Object.keys(servers).map((name) => servers[name].listContainers({ all: true }));
};

export default containers;
