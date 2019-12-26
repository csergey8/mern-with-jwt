import React, { useState } from "react";

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const changeHandler = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }
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
            <button className="btn yellow darken-4">Log In</button>
            <button className="btn grey lighten-1 black-text">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};
