import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after registration
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for programmatic navigation

  const formStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "0 auto",
    textAlign: "center",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "20px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registration successful!");
      // Redirect to login page after registration
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-page" style={containerStyle}>
      <div style={formStyle}>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
