import router from 'next/router';
import React, { useState } from 'react';
import { handleChange } from '../utils';

interface OwnProps {
  /** The function to close the modal */
  closeModal: () => void;
}

/**
 * Server modal
 */
const ServerModal = ({ closeModal }: OwnProps) => {
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [socket, setSocket] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (name && ((host && port) || socket)) {
      const dockerOptions = host && port ? { host: host, port: port } : { socket: socket };
      const postBody = { name: name, dockerOptions: dockerOptions };
      setIsLoading(true);
      await fetch('/api/server/add', { method: 'POST', body: JSON.stringify(postBody) }).finally(() => {
        setIsLoading(false);
        router.replace(router.asPath);
        closeModal();
      });
    }
  };

  return (
    <>
      <div className='modal-background' onClick={closeModal} />
      <div className='flex flex-col justify-start w-1/2 p-4 text-black bg-white rounded-lg modal'>
        <div className='flex justify-center'>Add a server</div>
        <div className='flex flex-col w-full mb-2'>
          <label>Name</label>
          <input
            type='text'
            placeholder='Server Name'
            value={name}
            onChange={({ target: { value } }) => handleChange(setName, value)}
            required
            autoFocus
          />
        </div>
        <div className='flex flex-col w-full mb-2'>
          <label>Host / Port</label>
          <div className='flex w-full'>
            <input
              className='w-5/6 mr-2'
              type='text'
              placeholder='Host address'
              value={host}
              onChange={({ target: { value } }) => handleChange(setHost, value)}
              disabled={socket !== ''}
            />
            <input
              className='w-1/6'
              type='text'
              placeholder='Port'
              value={port}
              onChange={({ target: { value } }) => handleChange(setPort, value)}
              disabled={socket !== ''}
            />
          </div>
        </div>
        <div className='flex flex-col w-full mb-4'>
          <label>Socket</label>
          <input
            type='text'
            placeholder='Socket, defaults to /var/run/docker.sock'
            value={socket}
            onChange={({ target: { value } }) => handleChange(setSocket, value)}
            disabled={host !== '' || port !== ''}
          />
        </div>
        <div className='self-center w-48 mt-4 button' onClick={handleSubmit}>
          {isLoading ? 'Loading' : 'Submit'}
        </div>
      </div>
    </>
  );
};

export default ServerModal;
