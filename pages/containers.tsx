import { format, fromUnixTime } from "date-fns";
import Dockerode from "dockerode";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import ContainerControl from "../components/ContainerControl";
import Header from "../components/Header";
import { dateFormat } from "./_app";

type Containers = {
  containers: Dockerode.ContainerInfo[];
};

const containers = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const controls = ["Pause", "Restart", "Start", "Stop", "Unpause"];

  return (
    <div className="w-full">
      <Header />
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Project</th>
            <th>State</th>
            <th>Image</th>
            <th>Ports</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {data.containers.map((container, idx) => {
            return (
              <tr key={idx}>
                <td className="!text-left flex justify-between name">
                  {container.Names[0].substr(1)}
                  <div>
                    <ContainerControl containerId={container.Id} />
                  </div>
                </td>
                <td>{container.Labels["com.docker.compose.project"] || ""}</td>
                <td>{container.State}</td>
                <td>{container.Image}</td>
                <td>
                  {container.Ports.map((port, idx) => {
                    if (idx % 2 === 0)
                      return (
                        <p key={idx}>
                          <a
                            href={`http://localhost:${port.PublicPort}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {port.PublicPort}
                          </a>
                        </p>
                      );
                  })}
                </td>
                <td>{format(fromUnixTime(container.Created), dateFormat)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/containers");
  const data: Containers = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default containers;
