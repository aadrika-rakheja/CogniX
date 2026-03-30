import {useState,useEffect} from 'react'
import { useTheme } from '../../context/ThemeContext'
import { getAllSubjects } from '../services/subjService'  
import '../css/SubjCard.css'
import { useNavigate } from 'react-router-dom'
import { getTopicsSubjwise } from '../services/topicService'
import Loader from '../../global_components/loader/Loader'


function SubjCard() {
  const { colour } = useTheme();
  const [data,setSubjData]=useState([]);
 

  useEffect(()=>{
    loadSubj();
  },[]);

  const loadSubj=async()=>{
    const s=await getAllSubjects();
    setSubjData(s);
  }


  if(!data)
    return <Loader/>
  
const navigate=useNavigate();
  
  return (
    <>
    <ul className="w-full grid sm:grid-cols-1 lg:grid-cols-2 gap-6 list-none p-0 mt-6 custom-css" style={{'--moodcolour': colour}}>
      {data.map((item)=>(
        <li key={item._id} className="relative p-6 rounded-2xl border border-gray-200 bg-white overflow-hidden "
          style={{boxShadow: `0 10px 25px 5px ${colour}10` }}
          onClick={()=>navigate(`/Subjects/${item._id}`)}>

          {/*left content*/}
          <h2 className='text-3xl my-2'>{item.symbol}</h2>
          <h2 className="text-black font-semibold text-xl my-1">{item.subjName}</h2>
          <h3 className="text-gray-500 text-sm font-medium mb-2">{item.attemptedTopics} out of {item.totTopics} topics attempted</h3>


          <div className='progressTrack'>
            <div style={{width:`${((0))*100}%`, backgroundColor: colour}} className='progressFill' >
            </div>
          </div>

          
          <h3 className="text-gray-400 text-sm font-medium">{Math.round((item.attemptedTopics/item.totTopics)*100) || 0 }% completed</h3>


          {/* Icon - Top Right */}
          <span 
            className="material-symbols-outlined absolute top-8 right-4 text-xl" 
            style={{ color: colour }}>
            arrow_forward_ios
          </span>
        </li>
      ))}
    </ul>
    </>
  )
}

export default SubjCard
