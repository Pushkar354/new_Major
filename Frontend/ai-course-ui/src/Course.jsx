import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Course() {
  const location = useLocation();
  const courseId = location.state?.courseId || localStorage.getItem("courseId");

  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);


  
useEffect(() => {
  const fetchCourse = async () => {
    try {
      console.log("Fetching course with ID:", courseId);

      const res = await fetch(`http://localhost:3000/user/course/${courseId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      console.log("RESPONSE STATUS:", res.status);

      const data = await res.json();
      console.log("API DATA:", data);

      if (data.success) {
        setCourse(data.course);
        setCurrentVideo(data.course.modules?.[0]);
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  if (courseId) {
    fetchCourse();
  } else {
    console.log("courseId is missing");
  }
}, [courseId]);
  console.log("COURSE ID:", courseId);




  const getVideoId = (url) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : "";
  };

  if (!course) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#eef3f8] p-4">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">


        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">{course.topic}</h2>

          {currentVideo && (
            <>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${getVideoId(currentVideo.url)}`}
                title="video player"
                allowFullScreen
                className="rounded-lg">
                </iframe>

              <h3 className="mt-3 font-medium">{currentVideo.title}</h3>
              <p className="text-sm text-gray-500">
                {currentVideo.description}
              </p>
            </>
          )}
        </div>



        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow p-4 overflow-y-auto max-h-[80vh]">
          <h3 className="text-md font-semibold mb-3">Course Videos</h3>

          {course.modules.map((video) => (
            <div
              key={video.id || video.url}
              onClick={() => setCurrentVideo(video)}
              className="flex gap-3 mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-20 h-14 rounded"
              />

              <div>
                <p className="text-sm font-medium line-clamp-2">
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}