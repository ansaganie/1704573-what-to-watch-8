import React from 'react';
import Logo from '../logo/logo';
import User from '../user/user';

type HeaderProps = {
  title?: string,
  breadcrumbs?: JSX.Element,
}

function Header({ title, breadcrumbs }: HeaderProps): JSX.Element {
  return (
    <header className={`page-header ${title ? 'user-page__head': 'film-card__head'}`}>
      <Logo/>

      {title ? <h1 className="page-title user-page__title">{title}</h1> : ''}
      {breadcrumbs ? breadcrumbs : ''}

      <User/>
    </header>
  );
}

export default Header;
