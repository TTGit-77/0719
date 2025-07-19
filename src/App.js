import React, { useState, useEffect } from "react";
import AuthPage from "./components/AuthPage";
import Quotes from "./components/Quotes";

const API_URL = 'https://quote-backend-zy4v.onrender.com/api';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && name) {
      setLoggedIn(true);
      setUser({ name });
    }
  }, []);

  const handleLoginSuccess = async (credentials) => {
    try {
      console.log('Attempting login with:', credentials);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data && data.token && data.name) {
        setLoggedIn(true);
        setUser({ name: data.name });
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        setError(null);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };

  const handleSignupSuccess = async (credentials) => {
    try {
      console.log('Attempting signup with:', credentials);
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      console.log('Signup response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      if (data && data.token && data.name) {
        setLoggedIn(true);
        setUser({ name: data.name });
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        setError(null);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {!loggedIn ? (
        <AuthPage 
          onLoginSuccess={handleLoginSuccess}
          onSignupSuccess={handleSignupSuccess} 
        />
      ) : (
        <Quotes 
          user={user} 
          onLogout={() => {
            setLoggedIn(false);
            setUser(null);
            localStorage.clear();
          }} 
        />
      )}
    </div>
  );
}

export default App;