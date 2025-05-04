import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "Sign in failed");
      }
    } catch (err) {
      setError("Sign in failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Sign In
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
                  setError(data.message || "Google sign in failed");
                }
              } catch (err) {
                setError("Google sign in failed");
              }
            }
          }}
          onError={() => setError("Google sign in failed")}
          width="100%"
          theme="filled_blue"
          text="signin_with"
        />
      </div>
      <div className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
