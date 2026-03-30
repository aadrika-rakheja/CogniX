import React from 'react'
import StatCard from './StatCard'
import QuickActions from './QuickActions'
import SubjCard from './SubjCard'
import ContinueTopics from './ContinueTopics'

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-2">Welcome back, Student!👋🏻</h1>
      <h3 className="text-gray-500 text-lg mb-8">Continue your learning journey</h3>
      <div className="mx-1 ">
        <StatCard />

         <div className="flex ">
            <div className="w-[66%]">
               <h1 className="text-xl font-semibold text-black mt-8 ">Your Subjects</h1>
              <SubjCard />

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