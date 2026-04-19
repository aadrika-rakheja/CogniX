
import StatCard from './StatCard'
import QuickActions from './QuickActions'
import SubjCard from './SubjCard'
import ContinueTopics from './ContinueTopics'
import { useEffect, useState } from 'react'
import {getUserProgress} from '../services/userProgress'
import Loader from '../../global_components/loader/Loader'

function Dashboard() {
  const [response,setResponse]=useState();
  
  useEffect(()=>{
    const fetchProgress=async()=>{
      try{
        const data = await getUserProgress();
        setResponse(data);
         console.log(data); 
      }catch(e){
        console.log(e.message);
      }
    };

      fetchProgress();
  },[]);

  if(!response)
    return <Loader/>


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-2">Welcome back, Student!👋🏻</h1>
      <h3 className="text-gray-500 text-lg mb-8">Continue your learning journey</h3>
      <div className="mx-1 ">
        <StatCard stats={response?.dashboard_stats}/>

         <div className="flex ">
            <div className="w-[66%]">
               <h1 className="text-xl font-semibold text-black mt-8 ">Your Subjects</h1>
              <SubjCard subj={response?.data?.courseProgress}/>

              <h1 className="text-xl font-semibold text-black mt-8">Continue Learning</h1>
              <ContinueTopics/>
            </div>
            <div className="w-[33%]">
               <h1 className="text-xl font-semibold text-black ml-8 mt-8 ">Recommended for you</h1>
              <QuickActions />
            </div>
        </div>


      </div>
    </div>
  )
}

export default Dashboard