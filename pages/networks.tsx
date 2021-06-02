import { format } from "date-fns";
import Dockerode from "dockerode";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import Header from "../components/Header";
import { dateFormat } from "./_app";

type Networks = {
  networks: Dockerode.NetworkInspectInfo[];
};

const images = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="w-full">
      <Header />
      <table className="table-auto">
        <thead>
          <th>Name</th>
          <th>Project</th>
          <th>ID</th>
          <th>Driver</th>
          <th>Created</th>
        </thead>
        <tbody>
          {data.networks.map((network, idx) => {
            return (
              <tr key={idx}>
                <td className="!text-left">{network.Name}</td>
                <td>{network.Labels["com.docker.compose.project"] || ""}</td>
                <td>{network.Id.substring(0, 15)}</td>
                <td>{network.Driver}</td>
                <td>{format(new Date(network.Created), dateFormat)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/networks");
  const data: Networks = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default images;
