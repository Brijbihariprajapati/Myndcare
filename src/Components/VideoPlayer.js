import { Button } from 'react-bootstrap'; 
import React from 'react';
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
const VideoPlayer = () => {
  const { state } = useLocation();
  const { video } = state;
  const naviagte = useNavigate()
  return (
    <div className="container mt-5">
      <h2>{video.title}</h2>
      <video width="600" controls>
        <source src={`http://localhost:7000/public/video/${video.video}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
      <div>
            <Button onClick={()=>naviagte(-1)}>Back</Button>
            </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
