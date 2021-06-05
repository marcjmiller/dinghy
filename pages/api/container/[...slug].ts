import { NextApiRequest, NextApiResponse } from 'next';
import { dockerServer } from '../../../utils';

/**
 * Manage Containers
 * @route `/api/container/${containerId}/${command}`
 * - Used to manage containers by sending a Container ID and Command to be executed.
 * @returns HTTP Status code and a Message after all promises Resolve/Reject
 */
const manageContainers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const containerId = slug[0];
  const container = dockerServer.getContainer(containerId.toString());
  const command = slug[1];

  let resStatus = 200;
  let resMessage = `Attempting to ${command} container Id: ${containerId}.`;

  try {
    // This throws an error if the container does not exist.
    if (await container.inspect()) {
      const containerStatus = (await container.inspect()).State.Status;
      switch (command.toLowerCase()) {
        case 'pause': {
          containerStatus === 'running' && (await container.pause());
          containerStatus === 'paused' && (await container.unpause());
          break;
        }
        case 'remove': {
          await container.stop();
          await container.remove();
          break;
        }
        case 'start': {
          containerStatus === 'exited' && (await container.start());
          containerStatus === 'running' && (await container.restart());
          break;
        }
        case 'stop': {
          await container.stop();
          break;
        }
        default: {
          resStatus = 400;
          resMessage = `Command: '${command}' not found (or supported yet)!`;
        }
      }
    } else {
      resStatus = 400;
      resMessage = `Container '${containerId}' is not running.`;
    }
  } catch (err) {
    resStatus = err.statusCode;
    resMessage = `${err.message}`;
    res.status(resStatus).send(resMessage);
  } finally {
    res.status(resStatus).send(resMessage);
  }
};

export default manageContainers;
