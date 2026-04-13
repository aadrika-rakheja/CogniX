import MainLayout from "./global_components/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeProvider } from './context/ThemeContext'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AItutor from "./components/ai-tutor/AItutor";
import DisplayTopics from "./components/dashboard/topics/DisplayTopics";
import AdminPage from "./components/admin/AdminPage";
import VideoPage from "./components/dashboard/topics/videoPage";
import GamesDashboard from "./components/games/GamesDashboard";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import QuizGame from "./pages/QuizGame";
import AdminPanel from './pages/AdminPanel';
import ProtectedRoutes from "./components/authentication/ProtectedRouter"; 
import GameCard from "./components/games/GameCard";


function App() {
  return (
    <>
    <ThemeProvider>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>

          <Route element={<MainLayout/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/Subjects/:id" element={<DisplayTopics/>}/>
            <Route path="/Subjects/:id/video/:tid" element={<VideoPage/>} />
            <Route path="/ai-tut" element={<AItutor/>} />
            <Route path="/quiz" element={<QuizGame/>}/>
            <Route path="/admin" element={<AdminPage/>} />
          </Route>
          
        </Routes>
            
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
