import React, { useState } from 'react';
import Pause from './icons/Pause';
import Start from './icons/Start';
import Stop from './icons/Stop';
import Remove from './icons/Remove';
import Info from './icons/Info';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Refresh from './icons/Refresh';

interface Control {
  /** Command to send to the API */
  command: string;

  /** React component (an Icon) to display in the container control component */
  icon: JSX.Element;
}

interface OwnProps {
  /** Container ID of the container to be manipulated */
  containerId: string;
}

/**
 * ContainerControl
 * - Displayed in container rows to provide a means to start/stop/pause/unpause/remove containers.
 */
const ContainerControl = ({ containerId }: OwnProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const controls: Control[] = [
    { command: 'pause', icon: <Pause /> },
    { command: 'start', icon: <Start /> },
    { command: 'stop', icon: <Stop /> },
    { command: 'remove', icon: <Remove /> },
  ];

  /**
   * Function to send container commands to the API
   * @param containerId string - ID of the container to manage
   * @param control string - Command to send to API
   */
  const containerControl = async (containerId: string, control: string) => {
    setIsLoading(true);
    await fetch(`/api/container/${containerId}/${control}`).finally(() => {
      setIsLoading(false);
      router.replace(router.asPath);
    });
  };

  return (
    <>
      {isLoading && <Refresh />}
      {controls.map(({ command, icon }, idx) => (
        <div className='opacity-0 hover:text-blue-300' key={idx} onClick={() => containerControl(containerId, command)}>
          {icon}
        </div>
      ))}
      <Link href={`/api/container/${containerId}`}>
        <div className='opacity-0  hover:text-blue-300'>
          <Info />
        </div>
      </Link>
    </>
  );
};

export default ContainerControl;
