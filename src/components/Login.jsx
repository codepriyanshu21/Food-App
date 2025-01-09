import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../utils/UserContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setUserName } = useContext(UserContext);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserName("Welcome " + name);
    navigate("/");
  };

  const handleUsernameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={name}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline transition duration-200"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
