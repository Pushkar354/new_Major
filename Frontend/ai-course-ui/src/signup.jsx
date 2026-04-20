import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("Signup success");
      return true;
    } else {
      alert("User exist");
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-gray-900 border border-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-400">
          Signup
        </h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full mb-4 p-3 rounded-xl bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full mb-4 p-3 rounded-xl bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />

        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full mb-6 p-3 rounded-xl bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />

        <button
          onClick={async () => {
            const success = await handleSignup();
            if (success) {
              navigate("/login");
            }
          }}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
        >
          Signup
        </button>

        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}