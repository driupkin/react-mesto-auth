import React from 'react';
import { useHistory } from 'react-router-dom';

function Header(props) {
  const history = useHistory();

  function signOut() {
    localStorage.removeItem('jwt', 'headerTitle');
    localStorage.removeItem('headerTitle');
    history.push('/login');
  }

  return (
    <header className="header">
      <div className="logo"></div>
      <h2 className="header__title">{props.title.email}
        <a
          className="header__link"
          href={`/${props.title.link}`}
          onClick={signOut}
        >{props.title.name}
        </a>
      </h2>
    </header>
  );
}

export default Header;