import Dockerode from 'dockerode';
import { NextApiRequest, NextApiResponse } from 'next';
import { servers } from './servers';

export type VolumeResponse = {
  [key: string]: { Volumes: Dockerode.VolumeInspectInfo[]; Warnings: string[] };
};

/**
 * Volumes list
 * @route `/api/Volumes`
 * @returns HTTP status code and a list of all Volumes, grouped by server
 */
const volumes = async (req: NextApiRequest, res: NextApiResponse) => {
  let volumeResponse: VolumeResponse = {};
  Promise.all(getVolumes())
    .then((info) => Object.keys(servers).forEach((name, idx) => (volumeResponse[name] = info[idx])))
    .finally(() => res.status(200).send(volumeResponse));
};

const getVolumes = () => {
  return Object.keys(servers).map((name) => servers[name].listVolumes());
};

export default volumes;
