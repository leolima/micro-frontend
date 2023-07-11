import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@nanostores/react";
import { $user, setUser } from 'StoreNanoApp/store';
import "./login.css";

function LoginForm({ onLogIn }) {
  const navigate = useNavigate()
  const user = useStore($user);

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      setUser(document.querySelector('#email')?.value);
      onLogIn && onLogIn();
      navigate('/dashboard');
    },
    [setUser]
  );

  if (user) {
    return (<div className="login-form"><h2>Bem vindo {user}</h2></div>)
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h2>Entre na sua conta</h2>
      <fieldset>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" name="email" autoComplete="email" />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" />
      </fieldset>
      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginForm;
