import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "StoreApp/store";
import "./login.css";

function LoginForm({ onLogIn }) {
  const [fields, setFields] = React.useState({});
  const { user, setUser } = useStore();
  const navigate = useNavigate()

  const onChange = React.useCallback((e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }, []);

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      setUser(fields);
      onLogIn && onLogIn();
      navigate('/dashboard');
    },
    [setUser, fields]
  );

  if (user) {
    return (
      <div className="login-form">
        <h2>Bem vindo {user.email}</h2>
      </div>
    )
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h2>Entre na sua conta</h2>
      <fieldset>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" name="email" value={fields?.email || ""} onChange={onChange} autoComplete="email" />
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
