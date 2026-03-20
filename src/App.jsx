import MoodSidebar from "./components/sidebar/MoodSidebar";
import NavBar from "./components/Header/NavBar"
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeProvider } from './context/ThemeContext'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AItutor from "./components/ai-tutor/AItutor";

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
                  <Route path="/ai-tut" element={<AItutor/>} />
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
