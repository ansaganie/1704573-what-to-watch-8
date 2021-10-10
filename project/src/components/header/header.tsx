import React from 'react';
import { Link} from 'react-router-dom';

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

      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </li>
        <li className="user-block__item">
          <Link to="/sign-out" className="user-block__link">Sign out</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
