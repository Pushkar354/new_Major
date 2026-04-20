import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Profile from "./profile";
import Course from "./YTCourse"

export default function GeneratePdfPage() {
  const location = useLocation();
  const course = location.state?.course || {};
  const modules = course.modules || [];
  const navigate = useNavigate();
  const [loadingIndex, setLoadingIndex] = useState(null);



  const handleAction = async (mod, type, index) => {
    try {
      setLoadingIndex(index);
      const res = await fetch("http://localhost:3000/user/generatepdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          topic: mod.title,
          hours: 1,
          modules: [mod],
        }),
      });



      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      if (type === "open") window.open(url);
      else {
        const a = document.createElement("a");
        a.href = url;
        a.download = `${mod.title}.pdf`;
        a.click();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleYoutube = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/suggestYoutube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ query: course.topic }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/Course", {
          state: { videos: data.data, topic: course.topic },
        });
      } else {
        alert("Failed to fetch videos");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (modules.length === 0) {
    return <p className="text-center mt-10">No modules found</p>;
  }

  return (
    <div className="min-h-screen bg-[#dfe9f3]">
      <header className="flex justify-between items-center px-10 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <h1 className="text-xl font-semibold text-gray-800">
            AI Course <span className="text-green-500">Lab</span>
          </h1>
        </div>

        <div className="flex items-center gap-8 text-gray-700 text-sm">
          <button 
          onClick={() => navigate("/")}
          className="border-b-2 border-black pb-1">
            Home
          </button>

          <button
            onClick={() => navigate("/Mycoursepage")}
            className="hover:text-black">
            My Learning
          </button>

          <div className="rounded-full flex items-center justify-center text-white">
            <Profile/>
          </div>
        </div>
      </header>



      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">
          {course.topic}
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          Explore AI generated modules and downloadable content
        </p>

        <button
          onClick={handleYoutube}
          className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow"
        >
          Suggested Videos
        </button>
      </div>



      <div className="max-w-[1400px] mx-auto mt-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2 line-clamp-2">
                  {mod.title}
                </h3>

                <p className="text-xs text-gray-400 mb-2">
                  {mod.lessons?.length || 1} lessons
                </p>

                <ul className="text-sm text-gray-600 space-y-1 max-h-28 overflow-y-auto">
                  {(mod.lessons || []).slice(0, 4).map((lesson, j) => (
                    <li key={j}>• {lesson.title}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleAction(mod, "open", i)}
                  className="flex-1 bg-blue-500 text-white text-sm px-3 py-1 rounded-lg"
                >
                  {loadingIndex === i ? "Opening..." : "Open"}
                </button>

                <button
                  onClick={() => handleAction(mod, "download", i)}
                  className="flex-1 bg-teal-500 text-white text-sm px-3 py-1 rounded-lg"
                >
                  {loadingIndex === i ? "..." : "Download"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>



      <footer className="mt-16 text-center text-gray-600 text-sm py-6">
        <p>Free, Instant Courses Generated by AI</p>
        <p className="mt-1">© 2026 AI Course Lab</p>
      </footer>
    </div>
  );
}