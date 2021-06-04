import { NextApiRequest, NextApiResponse } from "next";
import { dockerServer } from "../../utils";

/**
 * Containers list
 * @route `/api/containers`
 * @returns HTTP status code and a list of all Containers on the given docker server
 */
const containers = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await dockerServer.listContainers({"all": true})

  res.status(200).send({containers: response});
};

export default containers;
