// import {useState,useEffect} from 'react'
// import '../css/SubjCard.css'
// import { useTheme } from '../../context/ThemeContext'
// import { getTopics } from '../services/topicService';
// import { useNavigate } from 'react-router-dom';


// function ContinueTopics() {

//   const [data, setData] = useState([]);
//   useEffect(()=>{
//     fetchData();
//   });

//   const fetchData=async()=>{
//     const res=await getTopics();
//     //set only 3 most recent topics
//     setData(res.splice(0,3));
//   }

//   const{colour}=useTheme();
//   const navigate=useNavigate();

//   return (
//     <div className="w-full mt-6">
//       {data.map((item)=>(
//         <div key={item._id} className="flex items-center bg-white rounded-xl border border-gray-200 p-2 mb-3 shadow-sm hover:shadow-md transition-shadow"
//               onClick={()=>{navigate(`/Subjects/${item.subjName}/video/${item._id}`)}}>
//           {/* Left side - Symbol in grey square */}
//           <div className="flex-shrink-0 mr-6">
//             <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
//               {item.symbolTopic}
//             </div>
//           </div>

//           {/* Right side content */}
//           <div className="flex-1">
//             {/* Topic name in big font */}
//             <h2 className="text-large font-semibold text-black mb-1">{item.title}</h2>

//             {/* Subject name and time on the same line */}
//             <div className="flex items-center justify-between mb-1">
//               <p className="text-gray-500 text-xs">{item.timeSeen || 0}/{item.content.duration} min</p>
//             </div>

//             {/* Progress bar */}
//             <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//               <div
//                 className="h-2 rounded-full transition-all duration-300"
//                 style={{
//                   width: `${(item.timeSeen || 0/ item.content.duration) * 100}%`,
//                   backgroundColor: colour
//                 }}
//               ></div>
//             </div>
//           </div>

//           {/* Right side button */}
//           <div className="flex-shrink-0 ml-6 mr-5">
//             <span className="material-symbols-outlined " style={{ color: colour,fontSize:"3rem"}}>play_arrow</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ContinueTopics


import { useState, useEffect } from "react";
import "../css/SubjCard.css";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { getUserProgress } from "../services/userProgress";

function ContinueTopics() {
  const [data, setData] = useState([]);
  const { colour } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getUserProgress();

      const courses = res.data.courseProgress;

      let allTopics = [];

      // 🔥 Flatten + filter in-progress topics
      courses.forEach((course) => {
        course.topicProgress.forEach((tp) => {
          if (tp.topic_status === "In-progress") {
            allTopics.push({
              ...tp.topic_id, // full topic data
              watchedTime: tp.watchedTime || 0,
              status: tp.topic_status,
              course_id: course.course_id,
            });
          }
        });
      });

      // 🔥 Sort by most watched (optional but better UX)
      allTopics.sort((a, b) => b.watchedTime - a.watchedTime);

      // 🔥 Take top 3
      setData(allTopics.slice(0, 3));
    } catch (err) {
      console.error("Error fetching continue topics:", err);
    }
  };

  return (
    <div className="w-full mt-6">
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No in-progress topics yet</p>
      ) : (
        data.map((item) => {
          const totalSeconds = (item.content?.duration || 1) * 60;

          const percent = Math.min(
            Math.floor((item.watchedTime / totalSeconds) * 100),
            100
          );

          return (
            <div
              key={item._id}
              className="flex items-center bg-white rounded-xl border border-gray-200 p-2 mb-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                navigate(
                  `/Subjects/${item.subjName}/video/${item._id}`,
                  {
                    state: {
                      course_id: item.course_id,
                      topicProgress: {
                        watchedTime: item.watchedTime,
                        topic_status: item.status,
                      },
                    },
                  }
                );
              }}
            >
              {/* Left icon */}
              <div className="flex-shrink-0 mr-6">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                  {item.symbolTopic}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-black mb-1">
                  {item.title}
                </h2>

                <div className="flex items-center justify-between mb-1">
                  <p className="text-gray-500 text-xs">
                    {Math.floor(item.watchedTime / 60)} /{" "}
                    {item.content?.duration || 0} min
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: colour,
                    }}
                  ></div>
                </div>

                <p className="text-xs text-gray-500">
                  {percent >= 90 ? "Almost Completed" : "Continue Learning"}
                </p>
              </div>

              {/* Play button */}
              <div className="flex-shrink-0 ml-6 mr-5">
                <span
                  className="material-symbols-outlined"
                  style={{ color: colour, fontSize: "3rem" }}
                >
                  play_arrow
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ContinueTopics;