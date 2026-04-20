// 




import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || "User");
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <Popup
        trigger={
          <button className="focus:outline-none">
            <img
              src="/profile.png"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-700 hover:scale-105 transition"
            />
          </button>
        }
        position="bottom right"
        arrow={false}
      >
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-3 text-white w-52">
          
          <div className="flex items-center gap-3 p-2 border-b border-gray-800">
            <img
              src="/profile.png"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-indigo-300">{userName}</p>
              <p className="text-xs text-gray-400">Welcome back</p>
            </div>
          </div>

          <div className="flex flex-col mt-2 text-sm">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-lg hover:bg-gray-800 transition text-left"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 rounded-lg hover:bg-gray-800 transition text-left"
                >
                  Signup
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/Mycoursepage")}
                  className="px-4 py-2 rounded-lg hover:bg-gray-800 transition text-left"
                >
                  📚 My Learning
                </button>
                <button className="px-4 py-2 rounded-lg hover:bg-gray-800 transition text-left">
                  ⚙️ Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg hover:bg-red-900 text-red-400 transition text-left"
                >
                  🚪 Logout
                </button>
              </>
            )}
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default Profile;