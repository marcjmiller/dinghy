import { InferGetServerSidePropsType } from 'next';
import React, { useState } from 'react';
import ThreeDots from '../components/icons/ThreeDots';
import Layout from '../components/Layout';
import ServerControl from '../components/ServerControl';
import ServerModal from '../components/ServerModal';
import { ServerResponse } from './api/servers';

/**
 * Servers
 */
const servers = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Layout>
        <main>
          <table className='table-auto'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Containers</th>
                <th>Running</th>
                <th>Paused</th>
                <th>Stopped</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((server, idx) => (
                <tr key={idx}>
                  <td className='!text-left flex justify-between name'>
                    {server}{' '}
                    <div>
                      <ServerControl server={server} />
                      <ThreeDots />
                    </div>
                  </td>
                  <td>{data[server].Containers}</td>
                  <td>{data[server].ContainersRunning}</td>
                  <td>{data[server].ContainersPaused}</td>
                  <td>{data[server].ContainersStopped}</td>
                  <td>{data[server].Images}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='w-48 mt-4 button' onClick={() => setShowModal(true)}>
            Add a server
          </div>
        </main>
      </Layout>
      {showModal && <ServerModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/servers');
  const data: ServerResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default servers;
