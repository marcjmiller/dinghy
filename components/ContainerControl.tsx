import React from "react";
import Pause from "./icons/Pause";
import Start from "./icons/Start";
import Stop from "./icons/Stop";
import Remove from "./icons/Remove";
import Info from "./icons/Info";
import Link from "next/link";

interface Control {
  command: string;
  icon: JSX.Element;
}

interface OwnProps {
  containerId: string;
}

const ContainerControl = ({ containerId }: OwnProps) => {
  const controls: Control[] = [
    { command: "pause", icon: <Pause /> },
    { command: "start", icon: <Start /> },
    { command: "stop", icon: <Stop /> },
    { command: "remove", icon: <Remove /> },
  ];

  /**
   * Used to send commands to the API
   * @param containerId string - ID of the container to manage
   * @param control string - Command to send to API
   */
  const containerControl = (containerId: string, control: string) => {
    fetch(`/api/container/${containerId}/${control}`);
  };

  return (
    <>
      {controls.map(({ command, icon }, idx) => (
        <div
          className="hover:text-blue-300"
          key={idx}
          onClick={() => containerControl(containerId, command)}
        >
          {icon}
        </div>
      ))}
      <Link href={`/api/container/${containerId}`}>
        <a className="text-black hover:text-blue-300">
          <Info />
        </a>
      </Link>
    </>
  );
};

export default ContainerControl;
