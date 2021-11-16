import React from 'react';
import Logo from '../logo/logo';
import User from '../user/user';

type HeaderProps = {
  children?: React.ReactNode;
  userPage?: boolean,
  filmCard?: boolean,
}

function Header({ children, userPage, filmCard }: HeaderProps): JSX.Element {
  const className = (`
    page-header
    ${userPage && 'user-page__head'}
    ${filmCard && 'film-card__head'}
  `);

  return (
    <header className={className}>
      <Logo/>
      {children}
      <User/>
    </header>
  );
}

export default Header;
