import React, { useState } from "react";
import axios from "axios";
import "../App.css"; // Ensure this is the correct path to your CSS file
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/auth/userlogin', formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const tokenn = response.data.token;
  
      localStorage.setItem('token', tokenn); 
  
      setMessage("Login successful!");
      navigate('/home'); 
    } catch (error) {
      setMessage("Error occurred during login");
    }
  };
  

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <h2 className="login-form-header">Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="login-form-group">
            <div className="login-form-input-container">
              <label htmlFor="email" className="login-form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="login-form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="login-form-group">
            <div className="login-form-input-container">
              <label htmlFor="password" className="login-form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="login-form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-form-submit-btn">Login</button>
          <div className="login-form-footer">
            <p>Don't have an account?</p>
            <a href="/register">Register</a>
          </div>
        </form>
        {message && <p className="login-form-message">{message}</p>}
      </div>
    </div>
  );
};

export default UserLogin;
