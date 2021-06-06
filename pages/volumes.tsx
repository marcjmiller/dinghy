import { format } from 'date-fns';
import { InferGetServerSidePropsType } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import { VolumeResponse } from './api/volumes';
import { DATE_FORMAT } from './_app';

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
              <th>Server</th>
              <th>Driver</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((server) =>
              data[server].Volumes.map((volume, idx) => {
                return (
                  <tr key={idx}>
                    <td className='!text-left'>{volume.Name}</td>
                    <td>{server}</td>
                    <td>{volume.Driver}</td>
                    <td>{format(new Date(volume['CreatedAt']), DATE_FORMAT)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/volumes');
  const data: VolumeResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default volumes;
