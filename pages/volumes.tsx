import { format } from 'date-fns';
import Dockerode from 'dockerode';
import { InferGetServerSidePropsType } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import { DATE_FORMAT } from './_app';

type Volumes = {
  /** Volumes returned from the API*/
  Volumes: Dockerode.VolumeInspectInfo[];

  /** Any warnings/errors from the API */
  Warnings: string[];
};

/**
 * Volumes
 */
const volumes = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <main>
        <table className='table-auto'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Driver</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {data.Volumes.map((volume, idx) => {
              return (
                <tr key={idx}>
                  <td className='!text-left'>{volume.Name}</td>
                  <td>{volume.Driver}</td>
                  <td>{format(new Date(volume['CreatedAt']), DATE_FORMAT)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/volumes');
  const data: Volumes = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default volumes;
