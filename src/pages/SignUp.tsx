import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "Sign up failed");
      }
    } catch (err) {
      setError("Sign up failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full p-2 border rounded"
          required
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="bg-red-500 relative bottom-11 w-1/2 left-92"
        >
          {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
        </span>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
      <div className="my-4 flex justify-center">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (credentialResponse.credential) {
              try {
                const res = await fetch(`${BACKEND_URL}/api/auth/google`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    credential: credentialResponse.credential,
                  }),
                });
                const data = await res.json();
                if (res.ok && data.token) {
                  localStorage.setItem("token", data.token);
                  navigate("/");
                } else {
                  setError(data.message || "Google sign up failed");
                }
              } catch (err) {
                setError("Google sign up failed");
              }
            }
          }}
          onError={() => setError("Google sign up failed")}
          width="100%"
          theme="filled_blue"
          text="signup_with"
        />
      </div>
      <div className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-600">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
