import { NextApiRequest, NextApiResponse } from "next";
import { dockerServer } from "../../utils";

const networks = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await dockerServer.listNetworks()

  res.status(200).send({networks: response});
};

export default networks;
