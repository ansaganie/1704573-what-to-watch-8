import React from 'react';
import { Link} from 'react-router-dom';
import User from '../user/user';

type HeaderProps = {
  title?: string,
  breadcrumbs?: JSX.Element,
}

function Header({ title, breadcrumbs }: HeaderProps): JSX.Element {
  return (
    <header className={`page-header ${title ? 'user-page__head': 'film-card__head'}`}>
      <div className="logo">
        <Link className="logo__link" to="/">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {title ? <h1 className="page-title user-page__title">{title}</h1> : ''}
      {breadcrumbs ? breadcrumbs : ''}

      <User/>
    </header>
  );
}

export default Header;
