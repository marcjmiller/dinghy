import { NextApiRequest, NextApiResponse } from "next";
import { dockerServer } from "../../utils";

const images = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await dockerServer.listImages()

  res.status(200).send({images: response});
};

export default images;
