import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Login } from "./login";
import { Signup } from "./signup";
import Mycourse from "./MyCourse";
import MyCoursepage from "./Mycoursepage";
import YTVideo from "./YTCourse";
import GeneratePdfPage from "./coursePdf";
import AdvancedQuiz from "./Quiz";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Mycourse" element={<Mycourse/>}/>
      <Route path="/Mycoursepage" element={<MyCoursepage/>}/>
      <Route path="/course" element={<YTVideo/>}/>
      <Route path="/generatepdf" element={<GeneratePdfPage/>} />
      <Route path="/Quiz" element={<AdvancedQuiz/>}/>
    </Routes>
  );
}

export default App;