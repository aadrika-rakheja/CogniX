import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { GraduationCap } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const { colour } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handelLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:2424/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                // ✅ Store token and user identity
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("username", data.user.name || data.user.email);
                localStorage.setItem("email", data.user.email || "");

                // ✅ Decode role
                const decode = JSON.parse(atob(data.token.split(".")[1]));
                localStorage.setItem("role", decode.role);

                alert("Login Successful");

                const role = localStorage.getItem("role");
                if (role == "user")
                  navigate("/dashboard");
                else
                  navigate("/admin");

                
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Server error");
        }
    };

return (
  <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f5f3ff] to-[#faf5ff] flex items-center justify-center px-4">
    
    <div className="w-full max-w-md">
      
      {/* Logo + Title */}
      <div className="text-center mb-10">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl shadow-lg mb-4 bg-gradient-to-br from-indigo-500 to-purple-600">
          <span
            className="material-symbols-outlined text-white"
            style={{ fontSize: "28px" }}
          >
            school
          </span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          CogniX
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          AI-Assisted Adaptive Learning Platform
        </p>
      </div>

      {/* Card */}
      <form
        onSubmit={handelLogin}
        className="bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_10px_40px_rgba(99,102,241,0.15)] rounded-2xl p-8 space-y-6 transition-all duration-300 hover:shadow-[0_15px_50px_rgba(99,102,241,0.25)]"
      >
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
          Welcome Back
        </h2>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Email
          </label>

          <div className="mt-2 relative">
            <input
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md"
            />
            <span className="absolute left-3 top-3 text-gray-400 text-sm">✉️</span>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>

          <div className="mt-2 relative">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md"
            />
            <span className="absolute left-3 top-3 text-gray-400 text-sm">🔒</span>
            <span className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600 transition">
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-xl transition-all duration-200 active:scale-[0.97]"
        >
          Sign In
        </button>

        {/* Footer */}
      {/* Attractive Footer */}
<div className="pt-6 border-t border-gray-100 space-y-5">
  
  {/* Signup CTA */}
  <p className="text-sm text-center text-gray-500">
    Don’t have an account?
    <Link
      to="/signup"
      className="ml-1 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition"
    >
      Create one
    </Link>
  </p>

  {/* Feature Highlight Card */}
  <div className="relative overflow-hidden rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 shadow-sm hover:shadow-md transition-all duration-300">
    
    {/* subtle glow */}
    <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-200 opacity-30 rounded-full blur-2xl"></div>

    <p className="text-xs font-semibold text-indigo-600 mb-3 text-center tracking-wide">
      ✨ Why CogniX?
    </p>

    <div className="space-y-2 text-xs text-gray-600">
      
      <div className="flex items-start gap-2">
        <span className="mt-[2px] h-2 w-2 rounded-full bg-indigo-500"></span>
        <p>AI-powered adaptive learning experience</p>
      </div>

      <div className="flex items-start gap-2">
        <span className="mt-[2px] h-2 w-2 rounded-full bg-purple-500"></span>
        <p>Smart recommendations based on your progress</p>
      </div>

      <div className="flex items-start gap-2">
        <span className="mt-[2px] h-2 w-2 rounded-full bg-pink-500"></span>
        <p>Interactive AI tutor & gamified learning</p>
      </div>

    </div>
  </div>

</div>

      </form>
    </div>
  </div>
);
}

export default Login;