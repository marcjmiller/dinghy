import { NextApiRequest, NextApiResponse } from 'next';
import { dockerServer } from '../../utils';

/**
 * Networks list
 * @route `/api/networks`
 * @returns HTTP status code and a list of all Networks on the given docker server
 */
const networks = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await dockerServer.listNetworks();

  res.status(200).send({ networks: response });
};

export default networks;
