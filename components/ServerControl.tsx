import React, { useState } from 'react';
import Remove from './icons/Remove';
import { useRouter } from 'next/router';
import Refresh from './icons/Refresh';

interface Control {
  /** Command to send to the API */
  command: string;

  /** React component (an Icon) to display in the container control component */
  icon: JSX.Element;
}

interface OwnProps {
  /** Name of the server the container resides on */
  server: string;
}

/**
 * ServerControl
 * - Displayed in server rows to provide a means to remove or retrieve info on servers..
 * @props
 * - server - The name of the server you are managing
 */
const ServerControl = ({ server }: OwnProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const controls: Control[] = [{ command: 'remove', icon: <Remove /> }];

  /**
   * Function to send container commands to the API
   * @param command string - command to send to the API
   */
  const ServerControl = async (command: string) => {
    setIsLoading(true);
    await fetch(`/api/server/${command}/${server}`, { method: 'POST' }).finally(() => {
      setIsLoading(false);
      router.replace(router.asPath);
    });
  };

  return (
    <>
      <Refresh isLoading={isLoading} />
      {controls.map(({ command, icon }, idx) => (
        <div className='opacity-0 hover:text-blue-300' key={idx} onClick={() => ServerControl(command)}>
          {icon}
        </div>
      ))}
    </>
  );
};

export default ServerControl;
