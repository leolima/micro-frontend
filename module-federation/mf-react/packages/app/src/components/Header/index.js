import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "@nanostores/react";
import { $user, setUser } from 'StoreNanoApp/store';
import './header.css'

const Header = () => {
  const user = useStore($user);

  return (
    <header className="header">
      <nav>
        <Link to="/">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/contact">Contato</Link>
      </nav>
      {user && (
        <a href="#" onClick={() => setUser('')}>
          Sair
        </a>
      )}
    </header>
  );
};

export default Header;
