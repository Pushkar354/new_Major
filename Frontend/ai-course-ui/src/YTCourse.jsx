import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Profile from "./profile";
import { motion } from "framer-motion";

export default function YTVideo() {
  const location = useLocation();
  const navigate = useNavigate();

  const savedVideos = JSON.parse(localStorage.getItem("videos"));
  const videos = location.state?.videos || savedVideos || [];

  useEffect(() => {
    if (location.state?.videos) {
      localStorage.setItem("videos", JSON.stringify(location.state.videos));
    }
  }, [location.state]);

  const [currentVideo, setCurrentVideo] = useState(
    videos.length > 0 ? videos[0] : null
  );

  useEffect(() => {
    if (videos.length > 0 && !currentVideo) {
      setCurrentVideo(videos[0]);
    }
  }, [videos]);

  const getVideoId = (url) => {
    if (!url) return "";
    const regExp =
      /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  if (!videos.length) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-black">
        <p className="text-red-400 text-lg mb-4">No Videos Found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

     
      <div className="flex justify-between items-center px-6 py-3 border-b border-gray-800">
        <div className="flex items-center">
          <img
            src="./logo1.png"
            className="h-20 w-52 hover:scale-105 transition"
          />
        </div>

        <div className="flex items-center gap-6 text-gray-300">
          <span className="border-b-2 border-indigo-500 pb-1 cursor-pointer">
            All Courses
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer hover:text-indigo-400"
            onClick={() => navigate("/Mycoursepage")}
          >
            My Learning
          </motion.button>

          <Profile />
        </div>
      </div>

      
      <div className="flex-1 p-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">


          <div className="col-span-12 lg:col-span-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-4">
            {currentVideo && (
              <>
                <iframe
                  width="100%"
                  height="420"
                  src={`https://www.youtube.com/embed/${getVideoId(
                    currentVideo.url
                  )}`}
                  title="video player"
                  allowFullScreen
                  className="rounded-xl"
                ></iframe>

                <h3 className="mt-4 text-lg font-semibold text-indigo-300">
                  {currentVideo.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {currentVideo.description}
                </p>
              </>
            )}
          </div>


          <div className="col-span-12 lg:col-span-4 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-4 overflow-y-auto max-h-[80vh]">
            <h3 className="text-md font-semibold mb-4 text-indigo-400">
              Recommended Videos
            </h3>

            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => setCurrentVideo(video)}
                className={`flex gap-3 mb-3 cursor-pointer p-2 rounded-lg transition 
                ${
                  currentVideo?.id === video.id
                    ? "bg-indigo-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-24 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium line-clamp-2 text-gray-200">
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>


      <div className="bg-gray-900 border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
        <span className="mx-3 hover:text-indigo-400 cursor-pointer">About</span>
        <span className="mx-3 hover:text-indigo-400 cursor-pointer">API</span>
        <span className="mx-3 hover:text-indigo-400 cursor-pointer">Help</span>
        <span className="mx-3 hover:text-indigo-400 cursor-pointer">Privacy</span>
      </div>

    </div>
  );
}