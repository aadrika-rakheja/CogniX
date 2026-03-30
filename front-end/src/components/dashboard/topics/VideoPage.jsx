import React, { useEffect,useState } from 'react'
import { getTopicById } from '../../services/topicService';
import { useParams, useNavigate} from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import './css/VideoPage.css';
import Loader from '../../../global_components/loader/Loader';

function getEmbedUrl(url) {
  let videoId = "";

  if (url.includes("youtube.com/watch")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  }

  return `https://www.youtube.com/embed/${videoId}`;
}



function VideoPage() {
  const {id,tid}=useParams();
  const {colour} = useTheme();
  const navigate = useNavigate();
  const [topic,setTopic]=useState(null);
  useEffect(()=>{
    loadTopic();
  },[])

  const loadTopic=async()=>
    {
      setTopic(await getTopicById(id,tid));
    }

    if(!topic){
      return <Loader/>
    }


  return (
    <div className="video-page-container">
      <div className="video-block">
        <div className="video-wrapper">
          <iframe 
            src={getEmbedUrl(topic.content.link)} 
            title={topic.title} 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="info-block">
        <div className="topic-info">
          <h2 className="topic-title">{topic.title}</h2>
          <p className="topic-description">{topic.content.description}</p>
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
