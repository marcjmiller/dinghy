import { NextApiRequest, NextApiResponse } from "next";
import { dockerServer } from "../../../utils";

const containerInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { containerId } = req.query;
  const container = dockerServer.getContainer(containerId.toString());

  let resStatus: number;
  let resMessage: string;

  try {
    const msg = await container.inspect();
    resStatus = 200;
    resMessage = JSON.stringify(msg)

  } catch (err) {
    resStatus = err.statusCode;
    resMessage = `${err.message}`;
  }

  res.status(resStatus).send(resMessage);
}

export default containerInfo;