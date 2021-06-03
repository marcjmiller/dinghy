import { NextApiRequest, NextApiResponse } from "next";
import { dockerServer } from "../../../utils";

const manageContainers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const containerId = slug[0];
  const container = dockerServer.getContainer(containerId.toString());
  const command = slug[1];

  let resStatus = 200;
  let resMessage = `Attempting to ${command} container Id: ${containerId}.`;

  try {
    if (await container.inspect()) {  // This throws an error if the container does not exist.
      const containerStatus = (await container.inspect()).State.Status;
      switch (command.toLowerCase()) {
        case "pause": {
          containerStatus === 'running' && container.pause();
          containerStatus === 'paused' && container.unpause();
          break;
        }
        case "remove": {
          await container.stop();
          await container.remove();
          break;
        }
        case "start": {
          containerStatus === 'stopped' && container.start();
          containerStatus === 'running' && container.restart();
          break;
        }
        case "stop": {
          container.stop();
          break;
        }
        default: {
          resStatus = 400;
          resMessage = `Command: '${command}' not found (or supported yet)!`;
        }
      }
    } else {
      resStatus = 400;
      resMessage = `Container '${containerId}' is not running.`
    }
  } catch (err) {
    resStatus = err.statusCode;
    resMessage = `${err.message}`;
  }

  res.status(resStatus).send(resMessage);
};

export default manageContainers;
