import React from 'react';
import './Footer.sass';

const Footer = () => {
  return (
    <footer>
      <h2>IMDb Clone made by Gabriel von Platen</h2>
      <ul className='stack-used-list'>
        <li>React</li>
        <li>Typescript</li>
        <li>Sass</li>
      </ul>
      <div className='github-link'>
        <a
          href='https://github.com/GabrielvonPlaten/Filmor-Client'
          target='_blank'
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
