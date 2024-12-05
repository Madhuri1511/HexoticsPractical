// src/components/Authentication/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setError("Invalid email format");
      setSuccess("");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === email)) {
      setError("Email already exists");
      setSuccess("");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    setError("");
    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-500 to-teal-600">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create an Account
        </h2>
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}
        {success && (
          <p className="text-sm text-green-500 text-center">{success}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;