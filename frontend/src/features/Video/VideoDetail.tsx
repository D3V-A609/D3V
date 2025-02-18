import React from 'react';
import './VideoDetail.css';

interface VideoDetailProps {
  videoId: string;
  onBack: () => void;
}

const VideoDetail: React.FC<VideoDetailProps> = ({ videoId, onBack }) => (
  <div className="video-detail">
    <button onClick={onBack} className="video-back-button">뒤로 가기</button>
    <div className="video-wrapper">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

export default VideoDetail;