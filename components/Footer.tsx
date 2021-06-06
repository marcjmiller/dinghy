import React from 'react';
import Separator from './Separator';

/**
 * Footer
 * - Displayed to show some info about Dinghy
 */
const Footer = () => {
  return (
    <div className='w-full !h-16 text-center text-xs p-4'>
      <a href='https://github.com/marcjmiller/dinghy/' target='_blank' rel='noreferrer'>
        Docs
      </a>
      <Separator />
      <a href='https://github.com/marcjmiller/dinghy/' target='_blank' rel='noreferrer'>
        Github
      </a>
      <Separator />
      <a href='https://hub.docker.com/repository/docker/marcjmiller/dinghy' target='_blank' rel='noreferrer'>
        Dockerhub
      </a>
    </div>
  );
};

export default Footer;
