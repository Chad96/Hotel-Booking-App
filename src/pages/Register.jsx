import React from "react";

const Register = () => {
  return (
    <div className="register-page">
      <div className="container">
        <h2>Register</h2>
        <form>
          <label>Email</label>
          <input type="email" required />
          <label>Password</label>
          <input type="password" required />
          <label>Confirm Password</label>
          <input type="password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
