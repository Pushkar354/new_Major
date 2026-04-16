import { useLocation, useNavigate } from "react-router-dom";

export default function Mycourse() {
  const location = useLocation();
  const navigate = useNavigate();
  const videos = location.state?.videos || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Suggested video</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {videos.map((video) => (
    <div
      key={video.id || video.url}
      className="bg-white p-4 rounded-xl shadow"
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="rounded-lg"
      />

      <h3 className="font-semibold mt-2">
        {video.title}
      </h3>

      <a
        href={video.url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 text-sm"
      >
        Watch Video
      </a>
    </div>
  ))}
</div>
      <button 
      onClick={()=>navigate("/Mycoursepage")}
      className="mt-6 px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg text-lg">
        Save Course</button>
    </div>
  );
}