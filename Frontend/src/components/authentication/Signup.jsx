import React from "react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

function Signup() {
   const { colour } = useTheme();
   const [Fullname, setFullname] = useState("");
   const [Email, setEmail] = useState("");
   const [Password, setPassword] = useState("");
    
    const handelSignup=async(e)=>{
        e.preventDefault();
        if(!Fullname || !Email || !Password)
        {
            alert("All Fields are Required..");
        }

        try 
        {
          const res=await fetch("http://localhost:2424/api/auth/signup",
            {
            method:"POST",
            headers:
            {
              "Content-Type":"application/json"
            },

            body:JSON.stringify({
              email:Email,
              password:Password
            })
          });

          const data= await res.json();

          if(data.success)
          {
            alert("Sign-Up Successful.");
          

          window.location.href="/";
          }

        else 
        {
          alert(data.message);
        }
      }
        catch(error)
        {
          console.log(error);
          alert("Server error");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-100 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
              <p className="text-sm text-gray-500">Join Cognix — start learning with AI</p>
            </div>

            <form onSubmit={handelSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={Fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg mb-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition bg-indigo-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg mb-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition bg-indigo-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg mb-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition bg-indigo-50"
                />
              </div>

              <input
                type="submit"
                value="Create Account"
                style={{ backgroundColor: colour }}
                className="w-full text-white font-bold py-3 rounded-lg transition duration-200 cursor-pointer shadow-lg hover:shadow-xl"
              />
            </form>

            <div className="mt-6 text-center text-gray-700 text-sm">
              Already have an account? <a href="#" className="text-indigo-600 hover:text-purple-600 font-semibold">Sign In</a>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200 mt-6">
              <h4 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center">
                <span className="mr-2">✨</span>What you'll get:
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500 text-white mr-3 flex-shrink-0 mt-0.5 text-xs font-bold">🧠</span>
                  <span>AI-powered mood detection and adaptive UI.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-500 text-white mr-3 flex-shrink-0 mt-0.5 text-xs font-bold">🎯</span>
                  <span>Personalized content and recommendations.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-pink-500 text-white mr-3 flex-shrink-0 mt-0.5 text-xs font-bold">🎮</span>
                  <span>Interactive AI tutor & Learning Games.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
    )
}

export default Signup;