import React from "react";

const Login = () => {
  return (
    <div className="login-page">
      <div className="container">
        <h2>Login</h2>
        <form>
          <label>Email</label>
          <input type="email" required />
          <label>Password</label>
          <input type="password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
