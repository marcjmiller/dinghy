import React from 'react';

/**
 * Footer
 * - Displayed on the index page to show some info about Dinghy
 */
const Footer = () => {
  return (
    <div className='flex items-center justify-center w-full !h-16'>
      <p>
        Powered by{' '}
        <a href='https://nextjs.org' target='_blank' rel='noreferrer'>
          NextJS
        </a>
        .
      </p>
    </div>
  );
};

export default Footer;
