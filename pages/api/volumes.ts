import { NextApiRequest, NextApiResponse } from 'next';
import { dockerServer } from '../../utils';

/**
 * Volumes list
 * @route `/api/Volumes`
 * @returns HTTP status code and a list of all Volumes on the given docker server
 */
const volumes = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await dockerServer.listVolumes();

  res.status(200).send(response);
};

export default volumes;
