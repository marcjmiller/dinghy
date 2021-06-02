import { NextApiRequest, NextApiResponse } from "next";
import { dockerServer } from "../../utils";

const volumes = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await dockerServer.listVolumes()

  res.status(200).send(response);
};

export default volumes;
