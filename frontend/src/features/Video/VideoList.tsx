import React from 'react';
import './VideoList.css';

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
  onVideoSelect: (videoId: string) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect }) => (
  <div className="video-list">
    {videos.map((video) => (
      <div key={video.id.videoId} className="video-item" onClick={() => onVideoSelect(video.id.videoId)}>
        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
        <h3>{video.snippet.title}</h3>
        <p>{video.snippet.channelTitle}</p>
      </div>
    ))}
  </div>
);

export default VideoList;