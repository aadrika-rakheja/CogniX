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

import { useState, useEffect } from "react";
import Forum from "./pages/Forum";
import NewDiscussion from "./pages/NewDiscussion";
import DiscussionDetail from "./pages/DiscussionDetail";

import {
  getDiscussions,
  createDiscussion,
  deleteDiscussion,
  upvoteDiscussion,
} from "./services/discussionServices";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    const data = await getDiscussions();
    setDiscussions(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload?.id) {
            localStorage.setItem("userId", payload.id);
          } else {
            localStorage.setItem("userId", Date.now().toString());
          }
        } catch (error) {
          localStorage.setItem("userId", Date.now().toString());
        }
      } else {
        localStorage.setItem("userId", Date.now().toString());
      }
    }
  }, []);

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

          {/* uplaksh */}
           <Route path="/forum"  element={<Forum discussions={discussions} setDiscussions={setDiscussions}  refreshDiscussions={fetchDiscussions}  />}/>
           <Route path="/new-discussion"  element={ <NewDiscussion refreshDiscussions={fetchDiscussions} /> }/>
           <Route path="/discussion/:id" element={<DiscussionDetail />} />

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