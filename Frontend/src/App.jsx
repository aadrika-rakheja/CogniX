import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import QuizGame from "./pages/QuizGame";
import AdminPanel from "./pages/AdminPanel";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoutes from "./components/ProtectedRouter";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/quiz"
            element={
              <ProtectedRoutes>
                <QuizGame />
              </ProtectedRoutes>
            }
          />
{/* 🔥 ADMIN ROUTE (FIXED) */}
<Route
  path="/admin/:topic"
  element={
    <ProtectedRoutes adminOnly={true}>
      <AdminPanel />
    </ProtectedRoutes>
  }
/>

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;