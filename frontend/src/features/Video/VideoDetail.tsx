import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

const VideoDetail: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const videos = useSelector((state: RootState) => state.youtube.videos);

  const currentVideo = videos.find(video => video.id.videoId === videoId);
  const relatedVideos = videos.filter(video => video.id.videoId !== videoId);

  if (!currentVideo) {
    return <div>Video not found</div>;
  }

  return (
    <div className="video-detail">
      <button onClick={() => navigate(-1)}>Back to list</button>
      <div className="video-player">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h2>{currentVideo.snippet.title}</h2>
      <p>{currentVideo.snippet.description}</p>
      <p>Channel: {currentVideo.snippet.channelTitle}</p>
      <p>Published: {new Date(currentVideo.snippet.publishedAt).toLocaleDateString()}</p>
      
      <h3>Related Videos</h3>
      <div className="related-videos">
        {relatedVideos.map(video => (
          <div key={video.id.videoId} onClick={() => navigate(`/video/${video.id.videoId}`)}>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <h4>{video.snippet.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetail;