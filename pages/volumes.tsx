import { format, fromUnixTime } from "date-fns";
import Dockerode from "dockerode";
import { InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import Header from "../components/Header";
import { dateFormat } from "./_app";

type Volumes = {
  Volumes: Dockerode.VolumeInspectInfo[];
  Warnings: string[];
};

const volumes = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="w-full">
      <Header />
      <table className="table-auto">
        <thead>
          <th>Name</th>
          <th>Driver</th>
        </thead>
        <tbody>
          {data.Volumes.map((volume, idx) => {
            return (
              <tr key={idx}>
                <td className="!text-left">{volume.Name.substring(0, 15)}</td>
                <td>{volume.Driver}</td>
                <td>{format(new Date(volume['CreatedAt']), dateFormat)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/volumes");
  const data: Volumes = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default volumes;
