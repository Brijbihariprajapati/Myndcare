import React, { useState } from "react";
import axios from "axios";
import "../App.css"; // Ensure this is the correct path to your CSS file
import { Navigate, useNavigate } from "react-router-dom";

const UserRegister = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters long";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("image", formData.image);

    try {
      const response = await axios.post('http://localhost:7000/api/auth/userregister', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("User registered successfully!");
navigate('/login')

} catch (error) {
      setMessage("Error occurred during registration");
    }
  };

  return (
    <div className="register-form-container">
      <div className="register-form-card">
        <h2 className="register-form-header">Create Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="register-form-group">
            <label htmlFor="name" className="register-form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`register-form-control ${
                errors.name ? "is-invalid" : ""
              }`}
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <div className="register-form-feedback">{errors.name}</div>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="email" className="register-form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`register-form-control ${
                errors.email ? "is-invalid" : ""
              }`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className="register-form-feedback">{errors.email}</div>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="password" className="register-form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`register-form-control ${
                errors.password ? "is-invalid" : ""
              }`}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <div className="register-form-feedback">{errors.password}</div>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="image" className="register-form-label">
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="register-form-control"
              onChange={handleChange}
            />
          </div>
          <div>
          <button type="submit" className="register-form-submit-btn">Register</button>
           <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',marginTop:'20px'}}>
            <p>I Have Already Account</p>
           <a href="/login">Login</a>

           </div>
          </div>
        </form>
        {message && <p className="register-form-message">{message}</p>}
      </div>
    </div>
  );
};

export default UserRegister;
