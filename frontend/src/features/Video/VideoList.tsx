import React from 'react';
import { Link } from 'react-router-dom';

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
  };
}

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <Link to={`/video/${video.id.videoId}`} key={video.id.videoId} className="video-item">
          <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
          <h3>{video.snippet.title}</h3>
          <p>{video.snippet.channelTitle}</p>
        </Link>
      ))}
    </div>
  );
};

export default VideoList;