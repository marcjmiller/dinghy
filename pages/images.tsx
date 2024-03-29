import { format, fromUnixTime } from 'date-fns';
import { InferGetServerSidePropsType } from 'next';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ImageResponse } from './api/images';
import { DATE_FORMAT } from './_app';

/**
 * Images
 */
const images = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [dataSize, setDataSize] = useState(1024 * 1024);

  const toggleSize = () => {
    if (dataSize === 1024) {
      setDataSize(Math.floor(dataSize * 1024));
    } else {
      setDataSize(Math.floor(dataSize / 1024));
    }
  };

  return (
    <Layout>
      <main>
        <table className='table-auto'>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Server</th>
              <th>ID (sha256)</th>
              <th className='cursor-pointer' onClick={toggleSize}>
                Size ({dataSize === 1024 ? 'KB' : 'MB'})
              </th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((server) =>
              data[server].map((image, idx) => {
                return (
                  <tr key={idx}>
                    <td className='!text-left'>{image.RepoTags}</td>
                    <td>{server}</td>
                    <td>{image.Id.substring(7, 19)}</td>
                    <td>
                      {Math.floor(image.Size / dataSize)} {dataSize === 1024 ? 'KB' : 'MB'}
                    </td>
                    <td>{format(fromUnixTime(image.Created), DATE_FORMAT)}</td>
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
  const res = await fetch('http://localhost:3000/api/images');
  const data: ImageResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default images;
