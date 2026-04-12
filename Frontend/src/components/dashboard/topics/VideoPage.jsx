import { useEffect,useState,useRef } from 'react'
import { getTopicById } from '../../services/topicService';
import { useParams, useNavigate, useLocation} from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import './css/VideoPage.css';
import Loader from '../../../global_components/loader/Loader';
import YouTube from "react-youtube";
import { updateUserProgress } from '../../services/userProgress';



function getYoutubeVideoId(url) {
  let videoId = "";

  if (url.includes("youtube.com/watch")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0];
  }

  return videoId;
}


function VideoPage() {
  const {id,tid}=useParams();
  const location = useLocation();
  const playRef=useRef(null);
  const passedSubject = location.state?.subject || null;
  const passedTopicProgress = location.state?.topicProgress || null;
  const {colour} = useTheme();
  const navigate = useNavigate();
  const [topic,setTopic]=useState(null);
  
  const [topicProgress,setTopicProgress]=useState(passedTopicProgress);
  useEffect(()=>{
    loadTopic();
  },[])

  useEffect(()=>{
      const handleBeforeUnload = () => {
        if(!playRef.current)return;
        const currentTime=playRef.current.getCurrentTime();
        const isCompleted = currentTime >= playRef.current.getDuration() * 0.9;
        navigator.sendBeacon(
          'http://localhost:2424/userProgress/updateUserProgress', 
          JSON.stringify({ 
            course_id: passedSubject._id,
            topic_id: tid,
            watchedTime: Math.floor(currentTime),
            completed: isCompleted,
          })
        );
      };
       window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [id, tid]);


  const loadTopic=async()=>
    {
      const topicData = await getTopicById(id,tid);
      setTopic(topicData);
      // Extract progress info if available in the topic data
      if (topicData?.topicProgress) {
        setTopicProgress(topicData.topicProgress);
      }
    }

    if(!topic){
      return <Loader/>
    }

    const sendProgress=async(time)=>{
      try{
        const isCompleted=time >= playRef.current.getDuration()*0.9;

        await updateUserProgress({
          course_id:passedSubject._id,
          topic_id:tid,
          watchedTime:Math.floor(time),
          completed:isCompleted
        })
      }
      catch(err){
        console.log("Error updating progress:", err.message);
      }
    }

    const handleReady=(e)=>{
      playRef.current=e.target;
    }

    const handleChange=(e)=>{
      if(!playRef.current)return;

      const currentTime=playRef.current.getCurrentTime();

      if(e.data===2)//paused
          sendProgress(currentTime);
      else if(e.data===0){
        const duration=playRef.current.getDuration();
        sendProgress(duration);
      }
    }

  
      

      
  return (
    <div className="video-page-container">
      <div className="video-block">
        <div className="video-wrapper">
          <YouTube
        videoId={getYoutubeVideoId(topic.content.link)}
        opts={{
          width: "100%",
          height: "400",
          playerVars: {
            autoplay: 0,
            origin: window.location.origin
          },
        }}
        onReady={handleReady}
        onStateChange={handleChange}
      />
        </div>
      </div>

      <div className="info-block">
        <div className="topic-info">
          <div className="flex items-center justify-between mb-2">
            <h2 className="topic-title">{topic.title}</h2>
            {topicProgress && (
              <span className="px-3 py-1 rounded-full text-xs font-medium capitalize" 
                    style={{
                      backgroundColor: topicProgress.topic_status?.toLowerCase() === 'completed' ? '#d1fae5' : '#fef3c7',
                      color: topicProgress.topic_status?.toLowerCase() === 'completed' ? '#065f46' : '#92400e'
                    }}>
                {topicProgress.topic_status?.replace('-', ' ') || 'Not Started'}
              </span>
            )}
          </div>
          <p className="topic-description">{topic.content.description}</p>
          {topicProgress && (
            <div className="mt-3">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{
                    width: `${topicProgress.topic_status?.toLowerCase() === 'completed' ? 100 : (topicProgress.topic_status?.toLowerCase() === 'in-progress' ? 50 : 0)}%`,
                    backgroundColor: colour
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 font-medium">
                {topicProgress.topic_status?.toLowerCase() === 'completed' ? 'Completed' : (topicProgress.topic_status?.toLowerCase() === 'in-progress' ? '50% Progress' : 'Not Started')}
              </span>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button className="action-button notes-button">
            📝 Notes
          </button>
          <button className="action-button ai-button" 
                  onClick={()=>{navigate("/ai-tut")}}>
            ✨ Ask AI
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoPage
