
import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Login() {
    const navigate = useNavigate();
    const { colour } = useTheme();

    const [LoggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handelLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("http://localhost:8000/api/auth/login", 
            {
            method: "POST",
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email:email, password:password })
        });

        const data = await res.json();

        if (data.success) 
            {

                localStorage.clear();
                localStorage.setItem("token",data.token);
                 const decode=JSON.parse(atob(data.token.split(".")[1]));
                 localStorage.setItem("role",decode.role);
                 
            setLoggedIn(true);
            alert("Login Successful");
            navigate("/dashboard");
            window.location.reload();
        } else 
            {
            alert(data.message);
        }

    } catch (error) 
    {
        console.log(error);
        alert("Server error");
    }
};

    return(
        <>
        <div className="AUthentication min-h-screen bg-gradient-to-br from-blue-300 to-purple-100 flex items-center justify-center">
            {
                LoggedIn ?(
                    <h1 className="text-5xl font-bold text-white text-center">Welcome to Cognix</h1>
                ):(
                    <form onSubmit={handelLogin}
                    className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md"
                    >

                      <div className="flex justify-center mb-6">
                        <span className="material-symbols-outlined" style={{fontSize: "100px",  color: "carbon", padding: "10px", borderRadius: "18px"}}> school</span>
                      </div>

                        <div className="flex flex-col items-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">
                                Welcome Back
                            </h2>
                        </div>
                        <input type="email" placeholder="Enter Your Email" value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg mb-4 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition bg-indigo-50"
                        />
                        <input type="password" placeholder="Enter Your Password" value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg mb-6 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition bg-indigo-50"
                        />
                        <input type="submit" value="Login"
                        style={{ backgroundColor: colour }}
                        className="w-full text-white font-bold py-3 rounded-lg transition duration-200 cursor-pointer shadow-lg hover:shadow-xl"
                        />

                        <h3 className="text-center text-gray-700 text-sm mt-6 mb-6">
                            Don't have an account? 
                            <Link to="/signup">Sign-Up</Link>
                            </h3>

                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200">
                          <h4 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center">
                            <span className="mr-2">✨</span>What you will get:
                          </h4>
                          <ul className="space-y-3">
                              <li className="flex items-start text-sm text-gray-700">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500 text-white mr-3 flex-shrink-0 mt-0.5 text-xs font-bold">🧠</span>
                                <span>AI-powered mood detection and adaptive UI.</span>
                              </li>
                              <li className="flex items-start text-sm text-gray-700">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-500 text-white mr-3 flex-shrink-0 mt-0.5 text-xs font-bold">🎯</span>
                                <span>Personalized content and recommendations.</span>
                              </li>
                              <li className="flex items-start text-sm text-gray-700">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-pink-500 text-white mr-3 flex-shrink-0 mt-0.5 text-xs font-bold">🎮</span>
                                <span>Interactive AI tutor & Learning Games.</span>
                              </li>
                          </ul>
                        </div>
                    </form>
                )
            }
        </div>
        </>
    )

}

export default Login;