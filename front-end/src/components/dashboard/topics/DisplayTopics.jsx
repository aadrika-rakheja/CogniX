import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import TopicCard from './TopicCard';
import { getTopicsSubjwise } from '../../services/topicService';
import { getSubjectByID } from '../../services/subjService';
import './css/DisplayTopics.css';

export default function DisplayTopics() {
     const {id}=useParams();
     const {colour} = useTheme();
     const [topics,setTopics]=useState([]);
     const [sbj,setSbj]=useState(null);
     const [activeFilter, setActiveFilter] = useState('All');
     
     useEffect(()=>{
        loadTopics();
        loadSubject();
     },[id])

     const loadSubject=async()=>{
      const subject=await getSubjectByID(id);
      setSbj(subject.data);
     }
     console.log(sbj);

     const loadTopics=async()=>{
        const topicsData= await getTopicsSubjwise(id);
        setTopics(topicsData);
     }

     const filteredTopics=activeFilter=="All"?topics:topics.filter(topic=>topic.level==activeFilter);
     const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <>
    {sbj && (
      <div className="subject-header-block" style={{'--moodcolour': colour}}>
        <div className="subject-left-section">
          <div className="subject-symbol">{sbj.symbol}</div>
        </div>
        
        <div className="subject-center-section">
          <h1 className="subject-title">{sbj.subjName}</h1>
          <p className="subject-description">{sbj.desc || 'No description available'}</p>
          
          <div className="progress-section">
            <label className="progress-label">Progress</label>
            <div className="progressTrack">
              <div 
                className="progressFill" 
                style={{
                  width: `${sbj.progress || 0}%`,
                  backgroundColor: colour
                }}
              ></div>
            </div>
            <span className="progress-label">{sbj.progress || 0}% Complete</span>
          </div>
        </div>

        <div className="subject-right-section">
          <div className="stats-box">
            <p className="stats-number completed-count">{topics.filter(t => t.status === 'completed').length}</p>
            <p className="stats-label">Completed</p>
          </div>
          <div className="stats-box">
            <p className="stats-number inprogress-count">{topics.filter(t => t.status === 'in-progress').length}</p>
            <p className="stats-label">In Progress</p>
          </div>
          <div className="stats-box">
            <p className="stats-number">{topics.filter(t => !t.status || t.status === 'not-started').length}</p>
            <p className="stats-label">Not Started</p>
          </div>
        </div>
      </div>
    )}



    <div className="flex items-center justify-between mb-6 p-6">
      <h2 className="text-xl font-semibold text-black">Topics</h2>
      <div className="flex gap-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-4 py-1 rounded-md font-xs transition-all duration-300"
            style={{
              backgroundColor: activeFilter === filter ? colour : '#e2e5e9',
              color: activeFilter === filter ? 'white' : '#111827',
              border: `2px solid ${activeFilter === filter ? colour : '#fbfafa'}`,
            }}
            onMouseEnter={(e) => {
              if (activeFilter !== filter) {
                e.target.style.backgroundColor = `color-mix(in srgb, ${colour} 10%, white)`;
              }
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== filter) {
                e.target.style.backgroundColor = '#e2e5e9';
              }
            }}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
        {filteredTopics.map((topic)=>(
            <TopicCard topic={topic} key={topic._id}/>
        ))}
    </div>
    </>
    
  )
}
