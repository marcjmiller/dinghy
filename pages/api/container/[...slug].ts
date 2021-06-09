import { NextApiRequest, NextApiResponse } from 'next';
import { servers } from '../servers';

/**
 * Manage Containers
 * @route `/api/container/${server}/${containerId}/${command}`
 * - Used to manage containers by sending a Container ID and Command to be executed.
 * @returns HTTP Status code and a Message after all promises Resolve/Reject
 */
const manageContainers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const serverName = slug[0];
  const containerId = slug[1];
  const command = slug[2];

  const container = servers[serverName].getContainer(containerId.toString());

  let resStatus = 200;
  let resMessage = '';

  try {
    // This throws an error if the container does not exist.
    const containerInfo = await container.inspect();
    if (containerInfo) {
      if (command) {
        switch (command.toLowerCase()) {
          case 'pause': {
            containerInfo.State.Status === 'running' &&
              (await container.pause().then(() => (resMessage = `Container ${containerId} on ${serverName} paused.`)));
            containerInfo.State.Status === 'paused' &&
              (await container
                .unpause()
                .then(() => (resMessage = `Container ${containerId} on ${serverName} unpaused.`)));
            break;
          }
          case 'remove': {
            containerInfo.State.Status === 'running' &&
              (await container.stop().then(async (_) => await container.remove()));
            containerInfo.State.Status === 'exited' && (await container.remove());
            resMessage = `Container ${containerId} on ${serverName} removed.`;
            break;
          }
          case 'start': {
            containerInfo.State.Status === 'exited' &&
              (await container.start().then(() => (resMessage = `Container ${containerId} on ${serverName} started.`)));
            containerInfo.State.Status === 'running' &&
              (await container
                .restart()
                .then(() => (resMessage = `Container ${containerId} on ${serverName} restarted.`)));
            break;
          }
          case 'stop': {
            await container.stop();
            resMessage = `Container ${containerId} on ${serverName} stopped.`;
            break;
          }
          default: {
            resStatus = 400;
            resMessage = `Command: '${command}' not found (or supported yet)!`;
          }
        }
      } else {
        resStatus = 200;
        resMessage = JSON.stringify(containerInfo);
      }
    } else {
      resStatus = 400;
      resMessage = `Container '${containerId}' is not running.`;
    }
  } catch (err) {
    resStatus = err.statusCode || 400;
    resMessage = `${err.message}`;
    res.status(resStatus).send(resMessage);
  } finally {
    res.status(resStatus).send(resMessage);
  }
};

export default manageContainers;
