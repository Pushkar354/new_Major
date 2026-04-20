import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Profile from "./profile";

export default function MyCourse() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [courses, setCourses] = useState([]);
  const [toggle,setToggle]=useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setUserName(decoded.name || "User");
    } catch (err) {
      console.error("Token decode error:", err);
    }
  }, []);



  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/user/mycourses", {
          method: "GET",
          headers: { token },
        });

        const data = await res.json();

        console.log("COURSES RESPONSE:", data);

        if (data.success) {
          setCourses(data.courses || []);
        } else {
          console.warn("No courses found");
          setCourses([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchCourses();
  }, []);

  const QuizzHandler=async(course_id)=>{
   try {
     const token = localStorage.getItem("token");
     const res = await fetch("http://localhost:3000/user/generateQuizz", {
          method: "POST",
          headers: {  "Content-Type": "application/json", token },
          body:JSON.stringify({id:course_id})
        });
        const data=await res.json();
         if (!res.ok || data.success === false) {
      alert(data.message || "Failed to generate Quiz");
     
      return;
    }
   if (res.ok || data.success === true) {
     alert(data.message || "Quiz generated");
     console.log(data.quizz);
      navigate("/Quiz", { state: { quiz: data.quizz.quiz } });
      
    }

   } catch (err) {
     alert(err.message);
   }
  }



 const openPdf=(pdf)=>{
   const base64 = pdf.replace("data:application/pdf;base64,", "");
     const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
 for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
     const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });

  const url = URL.createObjectURL(blob);
  window.open(url);
 } 
 const showCourse=(id)=>{
   const newState=!toggle[id]
  
   setToggle(prev=>({
    ...prev,
    [id]:newState
   }))
  const el=document.getElementById(id);
  if(el){
    el.style.display=newState ? "block":"none"
  }
  
 }
  const handleCourseClick = (course) => {
    if (!course?._id) {
      console.log("ID missing:", course);
      return;
    }
    console.log("Sending ID:", course._id);
    localStorage.setItem("courseId", course._id);
    navigate("/generatepdf", {
      state: { course },
    });
  };

  return (
    <div className="max-h-screen bg-[#eef3f8] p-4">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🧾</div>
            <div className="text-lg font-semibold text-gray-700">Dashboard</div>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <button onClick={() => navigate("/")}>Home</button>
            <span>🔔</span>
            <Profile />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  Hello {userName}
                </h2>
                <p className="text-xs text-gray-500">Good to see you back!</p>
              </div>
              <div className="flex gap-5 text-center">
                <div>
                  <p className="text-blue-600 font-bold">{courses.length}</p>
                  <p className="text-[11px] text-gray-500">Courses</p>
                </div>
                <div>
                  <p className="text-green-600 font-bold">0</p>
                  <p className="text-[11px] text-gray-500">Completed</p>
                </div>
                <div>
                  <p className="text-orange-500 font-bold">0</p>
                  <p className="text-[11px] text-gray-500">Assigned</p>
                </div>
              </div>



              <div className="relative w-16 h-16">
                <svg className="w-16 h-16">
                  <circle cx="32" cy="32" r="24" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                  <circle
                    cx="32"
                    cy="32"
                    r="24"
                    stroke="#0ea5e9"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="150"
                    strokeDashoffset="75"
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                  40%
                </div>
              </div>
            </div>


           

            {courses.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                No courses found
              </p>
            ) : (
             <div className="overflow-y-scroll h-[400px] ">

             { courses.map((course, i) => (
               <div
                  key={course._id || i}
                  className="bg-white rounded-xl shadow-sm p-4 m-2 flex justify-between items-center"
                  >
                  <div className="flex gap-3 items-center">
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                      📘
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 cursor-pointer " onClick={()=> showCourse(course._id)}>
                        {course.topic}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {new Date(course.createdAt).toDateString()}
                      </p>
                      <div>
                        <div id={course._id} className="hidden">

                        {course.data.map((item)=>(
                          <p className="text-[12px] p-1 text-blue-500 font-semibold cursor-pointer" onClick={()=>openPdf(item.pdf)}>
                            {item.filename}
                            
                          </p>
                        ))}
                        </div>
                      </div>
                      <p>

                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-500 rounded-full flex items-center justify-center text-xs">
                      60%
                    </div>
                    <button onClick={()=>QuizzHandler(course._id)} className="text-white bg-teal-600 px-3 py-1 rounded-full">
                      Quiz
                    </button>
                    <button
                      onClick={() => showCourse(course._id)}
                      className="text-white bg-teal-600 px-3 py-1 rounded-full">
                      →
                    </button>
                  </div>
                </div>
              ))}
              </div>
            )}
            

          </div>
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Career Path Advise
              </h3>
              <p className="text-xs text-gray-500 mt-2">
                AI based suggestion for your career growth
              </p>
              <button className="mt-3 bg-teal-600 text-white px-3 py-1 rounded-lg text-sm">
                Explore
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Your Progress
              </h3>
              <div className="flex justify-between items-end h-28">
                {[30, 50, 70, 40, 60, 80, 55].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 bg-teal-500 rounded"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Your Task List
              </h3>
              <ul className="mt-3 text-xs text-gray-600 space-y-1">
                <li>✔ Complete your profile</li>
                <li>✔ Finish module</li>
                <li>✔ Attempt quiz</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-6 flex justify-center gap-8 text-gray-500 text-sm mt-40">
          <span>About Us</span>
          <span>API Access</span>
          <span>FAQ</span>
          <span>Contribute Resources</span>
        </div>
    </div>
    
  );
}