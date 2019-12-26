import React, { useState, useEffect, useContext } from "react";
import { useMessage } from '../hooks/message.hook';
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const  message  = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const auth = useContext(AuthContext)

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError])

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register/", "POST", { ...form });
      message(data.message);
      clearError();
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login/", "POST", { ...form });
      message(data.message);
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Link Trim</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Auth</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  className="yellow-input"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="first_name">E-mail</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  className="yellow-input"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="first_name">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button disabled={loading} className="btn yellow darken-4" onClick={loginHandler}>
              Log In
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
              className="btn grey lighten-1 black-text"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
