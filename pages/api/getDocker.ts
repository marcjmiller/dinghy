// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import Docker from 'dockerode';

const getDocker = async (req: NextApiRequest, res: NextApiResponse) => {
  const docker = new Docker({socketPath: '/var/run/docker.sock'});
  const response = await docker.listContainers()

  response.forEach(cnt => console.log(cnt.Names))
  res.status(200).send({images: response});
};

export default getDocker;
