import React from "react";
import LoginForm from "./components/LoginForm";
import Logo from "./components/Logo";
import './home.css'

const Home = () => {
  return (
    <div id="home">
      <Logo />
      <LoginForm />
    </div>
  );
};

export default Home;
