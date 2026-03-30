import React from 'react'
import { useTheme } from '../../context/ThemeContext'

function StatCard() {
  const { colour } = useTheme()

    const data=[
        {
        title: "Total Study Time",
        value: "12 hours",
        icon:"timer",
        desc: "keep going"
        },
        {
        title: "Completed",
        value: "28/55",
        icon:"book_ribbon",
        desc: "Topics done"
        },
         {
        title: "Streak",
        value: "12 days",
        icon:"star",
        desc: "Keep it up!"
        },
        {
        title: "Avg. Score",
        value: "85%",
        icon:"show_chart",
        desc: "Good work"
        }
    ];
    
  return (
    <ul className="w-full grid xsm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0 mt-6">
      {data.map((item,index)=>(
        <li key={index} className="relative p-6 rounded-2xl border border-gray-200 bg-white overflow-hidden" 
          style={{ boxShadow: `0 10px 25px 5px ${colour}10` }}>
        {/* Left Content */}
        <div className="pr-12">
          <h3 className="text-gray-500 text-sm font-medium mb-2">{item.title}</h3>
          <h1 className="text-black font-bold text-2xl mb-1">{item.value}</h1>
          <h3 className="text-gray-400 text-sm">{item.desc}</h3>
        </div>
        
        {/* Icon - Top Right */}
        <span 
          className="material-symbols-outlined absolute top-4 right-4 text-4xl" 
          style={{ color: colour }}>
          {item.icon}
        </span>
      </li>
      ))}
    </ul>
  )
}

export default StatCard
