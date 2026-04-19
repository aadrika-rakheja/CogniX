import MainLayout from "./global_components/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProgressDashboard from "./pages/ProgressDashboard";
import AItutor from "./components/ai-tutor/AItutor";
import DisplayTopics from "./components/dashboard/topics/DisplayTopics";
import AdminPage from "./components/admin/AdminPage";
import VideoPage from "./components/dashboard/topics/videoPage";
import GamesDashboard from "./components/games/GamesDashboard";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import QuizGame from "./pages/QuizGame";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoutes from "./components/authentication/ProtectedRouter";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route element={<MainLayout />}>
           <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}/>
           <Route path="/Subjects/:id" element={<ProtectedRoutes><DisplayTopics /></ProtectedRoutes>}/>
           <Route path="/Subjects/:id/video/:tid" element={<ProtectedRoutes><VideoPage /></ProtectedRoutes>}/>
           <Route path="/ai-tut" element={<ProtectedRoutes><AItutor /></ProtectedRoutes>}/>
           <Route path="/quiz/:topic" element={<ProtectedRoutes><QuizGame /></ProtectedRoutes>}/>
           <Route path="/quiz" element={<div>Select a game first</div>} />
           <Route path="/games" element={ <ProtectedRoutes><GamesDashboard /></ProtectedRoutes>} />
           <Route path="/progress" element={<ProtectedRoutes><ProgressDashboard/></ProtectedRoutes>} />

            {/* ADMIN */}
            <Route path="/admin" element={<ProtectedRoutes adminOnly={true}><AdminPage /></ProtectedRoutes>}/>
            <Route path="/admin/:topic" element={<ProtectedRoutes adminOnly={true}><AdminPanel /></ProtectedRoutes>}/>

            

          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;