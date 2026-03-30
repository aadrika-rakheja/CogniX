import {useState,useEffect} from 'react'
import '../css/SubjCard.css'
import { useTheme } from '../../context/ThemeContext'
import { getTopics } from '../services/topicService';
import { useNavigate } from 'react-router-dom';


function ContinueTopics() {

  const [data, setData] = useState([]);
  useEffect(()=>{
    fetchData();
  });

  const fetchData=async()=>{
    const res=await getTopics();
    //set only 3 most recent topics
    setData(res.splice(0,3));
  }

  const{colour}=useTheme();
  const navigate=useNavigate();

  return (
    <div className="w-full mt-6">
      {data.map((item)=>(
        <div key={item._id} className="flex items-center bg-white rounded-xl border border-gray-200 p-2 mb-3 shadow-sm hover:shadow-md transition-shadow"
              onClick={()=>{navigate(`/Subjects/${item.subjName}/video/${item._id}`)}}>
          {/* Left side - Symbol in grey square */}
          <div className="flex-shrink-0 mr-6">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
              {item.symbolTopic}
            </div>
          </div>

          {/* Right side content */}
          <div className="flex-1">
            {/* Topic name in big font */}
            <h2 className="text-large font-semibold text-black mb-1">{item.title}</h2>

            {/* Subject name and time on the same line */}
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-500 text-xs">{item.timeSeen || 0}/{item.content.duration} min</p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(item.timeSeen / item.content.duration) * 100}%`,
                  backgroundColor: colour
                }}
              ></div>
            </div>
          </div>

          {/* Right side button */}
          <div className="flex-shrink-0 ml-6 mr-5">
            <span className="material-symbols-outlined " style={{ color: colour,fontSize:"3rem"}}>play_arrow</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContinueTopics
