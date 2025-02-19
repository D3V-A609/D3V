import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import './VideoDetail.css'

const VideoDetail: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const videos = useSelector((state: RootState) => state.youtube.videos);
  const [currentVideoId, setCurrentVideoId] = useState(videoId); // Track selected video ID

  const currentVideo = videos.find((video) => video.id.videoId === currentVideoId);
  const relatedVideos = videos.filter((video) => video.id.videoId !== currentVideoId);

  if (!currentVideo) {
    return <div>Video not found</div>;
  }

  const handleRelatedVideoClick = (videoId: string) => {
    setCurrentVideoId(videoId);
  };

  return (
    <div className="video-detail">
      <button onClick={() => navigate('/video')}>목록</button>
      <div className="video-player">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${currentVideoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h2>{currentVideo.snippet.title}</h2>
      <p>{currentVideo.snippet.description}</p>
      <p>Channel: {currentVideo.snippet.channelTitle}</p>
      <p>Published: {new Date(currentVideo.snippet.publishedAt).toLocaleDateString()}</p>

      <div className="related-videos">
        {relatedVideos.map((video) => (
          <div key={video.id.videoId} onClick={() => handleRelatedVideoClick(video.id.videoId)}>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <h4>{video.snippet.title}</h4>
            <p>{video.snippet.channelTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetail;