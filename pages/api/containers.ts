import { NextApiRequest, NextApiResponse } from "next";
import { dockerServer } from "../../utils";

const containers = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await dockerServer.listContainers()

  res.status(200).send({containers: response});
};

export default containers;
