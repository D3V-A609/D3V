import React, { useState, useEffect } from 'react';
import { useYoutubeApi } from '../store/services/YoutubeApi';
import SearchBar from '../components/SearchBar/SearchBar';
import VideoList from '../features/Video/VideoList';
import VideoDetail from '../features/Video/VideoDetail';
import PageHeader from "../components/PageHeader/PageHeader"
import { FaYoutube } from "react-icons/fa6";
import './VideoPage.css';

const VideoPage: React.FC = () => {
  const { videos, loading, error, fetchVideos, nextPageToken } = useYoutubeApi();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchVideos('software developer interview');
  }, [fetchVideos]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchVideos(query);
    setSelectedVideoId(null);
  };

  const handleLoadMore = () => {
    if (nextPageToken) {
      fetchVideos(searchQuery, nextPageToken);
    }
  };

  return (
    <div className="video-page">
      <PageHeader
      title="면접 영상 추천"
      description="YouTube에서 엄선한 면접 준비 영상을 확인하세요!"
      icon={<FaYoutube />}
      iconStyle="youtube-icon"
    />
    <div className="search-container">
        <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
      </div>
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {selectedVideoId ? (
        <VideoDetail videoId={selectedVideoId} onBack={() => setSelectedVideoId(null)} />
      ) : (
        <>
          <VideoList videos={videos} onVideoSelect={setSelectedVideoId} />
          {nextPageToken && (
            <button onClick={handleLoadMore} className="load-more-button">
              더 보기
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default VideoPage;