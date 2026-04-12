import {useState} from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { useNavigate } from 'react-router-dom';



export default function TopicCard({topic,subject}) {
  const { colour } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  
  const getDifficultyClasses = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border border-green-500';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-500';
      case 'advanced':
        return 'bg-red-100 text-red-800 border border-red-500';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-500';
    }
  };

  const duration=topic.topicProgress?.topic_id?.content?.duration ||1;
  const watchedTime=topic.topicProgress?.watchedTime || 0;
  const topicProgressPercent=((duration*60)<=watchedTime)?100:Math.round(watchedTime   /(duration*60)*100) || 0;
  const topicStatus=topic.topicProgress?.topic_status || "Not Started";

  const navigate = useNavigate();
  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-md border transition-all duration-300"
      style={{
        borderColor: isHovered ? colour : '#e5e7eb',
        boxShadow: isHovered ? `0 10px 15px -3px ${colour}20` : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={()=>{navigate(`/Subjects/${subject._id}/video/${topic._id}`, {
        state: { subject, topicProgress: topic.topicProgress }
      })}}
    >

      <div 
        className="w-full h-38 rounded-lg flex items-center justify-center mb-3 relative cursor-pointer" 
        style={{backgroundColor: `color-mix(in srgb, ${colour} 15%, white)`}} 
      >
        <span className={`text-5xl opacity-80 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-80'}`}>
          {topic.symbolTopic}
        </span>
        {isHovered && (
          <div 
            className="absolute flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
            style={{
              width: '73px',
              height: '73px',
              backgroundColor: colour,
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <span className="material-symbols-outlined text-white ">play_arrow</span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{topic.desc}</p>
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getDifficultyClasses(topic.level)}`}>
        {topic.level}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500 ease-in-out" 
            style={{width: `${topicProgressPercent}%`, backgroundColor: colour}}
          ></div>
        </div>
        <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
          {topicStatus === 'completed' ? '✓' : `${topicProgressPercent}%`}
        </span>
      </div>
      <p className="text-xs text-gray-500 font-medium capitalize">{topicStatus === 'completed' ? 'Completed' : topicStatus.replace('-', ' ')}</p>
    </div>
  )
}
