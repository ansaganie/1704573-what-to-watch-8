import React from 'react';
import Logo from '../logo/logo';

function Footer():JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="page-footer">
      <Logo light/>
      <div className="copyright">
        <p>© {year} What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
