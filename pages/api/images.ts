import Dockerode from 'dockerode';
import { NextApiRequest, NextApiResponse } from 'next';
import { servers } from './servers';

export type ImageResponse = {
  [key: string]: Dockerode.ImageInfo[];
};

/**
 * Images list
 * @route `/api/images`
 * @returns HTTP status code and a list of all Images, grouped by server
 */
const images = async (req: NextApiRequest, res: NextApiResponse) => {
  let imageResponse: ImageResponse = {};

  Promise.all(getImages())
    .then((info) => Object.keys(servers).forEach((name, idx) => (imageResponse[name] = info[idx])))
    .finally(() => res.status(200).send(imageResponse));
};

const getImages = () => {
  return Object.keys(servers).map((name) => servers[name].listImages());
};

export default images;
