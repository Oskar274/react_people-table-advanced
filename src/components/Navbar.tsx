/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import classNames from 'classnames';

export const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="#/">
            Home
          </a>

          <a
            aria-current="page"
            className="navbar-item has-background-grey-lighter"
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};
