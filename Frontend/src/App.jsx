import MoodSidebar from "./global_components/sidebar/MoodSidebar";
import NavBar from "./global_components/Header/NavBar"
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeProvider } from './context/ThemeContext'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AItutor from "./components/ai-tutor/AItutor";
import DisplayTopics from "./components/dashboard/topics/DisplayTopics";
import AdminPage from "./components/admin/AdminPage";
import VideoPage from "./components/dashboard/topics/videoPage";


function App() {
  return (
    <>
    <ThemeProvider>
      <BrowserRouter>
        <NavBar />
            <div className="flex h-screen">
              <div className="w-[80%]">
                <Routes>
                  <Route path="/" element={<Dashboard/>} />
                  <Route path="/Subjects/:id" element={<DisplayTopics/>}/>
                  <Route path="/Subjects/:id/video/:tid" element={<VideoPage/>} />
                  <Route path="/ai-tut" element={<AItutor/>} />
                  <Route path="/admin" element={<AdminPage/>} />
                </Routes>
              </div>
              <div className="w-[20%]">
                <MoodSidebar />
              </div>
            </div>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
