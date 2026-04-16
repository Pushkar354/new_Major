import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successfull");
      localStorage.setItem("token", data.token);
      return true;
    } else {
      alert("User exist");
      return false;
    }
    
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <input
          onChange={(e) => setEmail(e.target.value)} placeholder="Email"
          type="email"
          className="w-full mb-4 p-3 rounded-xl border border-gray-300"
        />

        <input
          onChange={(e) => setPassword(e.target.value)} placeholder="Password"
          type="password"
          className="w-full mb-6 p-3 rounded-xl border border-gray-300"
        />

        <button 
        onClick={async()=>{
            const success = await handleLogin();
            if(success){
              navigate("/");
            }
            
          }
        }
        className="w-full py-3 bg-blue-600 text-white rounded-xl">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account? <button onClick={() => navigate("/signup")}>Signup</button>
        </p>
      </div>
    </div>
  );
}
