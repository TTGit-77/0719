// src/components/AuthPage.jsx
import React, { useState } from "react";
import "./AuthPage.css";

export default function AuthPage({ onLoginSuccess, onSignupSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await onLoginSuccess({
        email: formData.email,
        password: formData.password,
      });
    } else {
      await onSignupSuccess({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="form-toggle">
          <button
            className={isLogin ? "active-tab" : "inactive-tab"}
            type="button"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active-tab" : "inactive-tab"}
            type="button"
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input-field"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="input-field"
            required
          />
          <button
            type="submit"
            className="submit-btn"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="toggle-msg">
          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            className="toggle-link"
            onClick={() => setIsLogin(!isLogin)}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

