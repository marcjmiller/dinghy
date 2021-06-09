import { format } from 'date-fns';
import { InferGetServerSidePropsType } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import { NetworkResponse } from './api/networks';
import { DATE_FORMAT } from './_app';

/**
 * Networks
 */
const networks = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <main>
        <table className='table-auto'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Server</th>
              <th>Project</th>
              <th>ID (sha256)</th>
              <th>Driver</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((server) =>
              data[server].map((network, idx) => {
                return (
                  <tr key={idx}>
                    <td className='!text-left'>{network.Name}</td>
                    <td>{server}</td>
                    <td>{network.Labels['com.docker.compose.project'] || ''}</td>
                    <td>{network.Id.substring(0, 15)}</td>
                    <td>{network.Driver}</td>
                    <td>{format(new Date(network.Created), DATE_FORMAT)}</td>
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
  const res = await fetch('http://localhost:3000/api/networks');
  const data: NetworkResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default networks;
