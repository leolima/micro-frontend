import React from "react";
import { Link } from "react-router-dom";
import useStore from "StoreApp/store";
import './header.css'

const Header = () => {
  const { user, logOut } = useStore();

  return (
    <header className="header">
      <nav>
        <Link to="/">Logo</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/contact">Contato</Link>
      </nav>
      {user && (
        <a href="#" onClick={logOut}>
          Sair
        </a>
      )}
    </header>
  );
};

export default Header;
