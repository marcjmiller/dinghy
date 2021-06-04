import { NextApiRequest, NextApiResponse } from "next";
import { dockerServer } from "../../utils";

/**
 * Images list
 * @route `/api/images`
 * @returns HTTP status code and a list of all Images on the given docker server
 */
const images = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await dockerServer.listImages()

  res.status(200).send({images: response});
};

export default images;
