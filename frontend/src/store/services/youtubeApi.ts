import { useState, useCallback } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
  };
}

interface UseYoutubeApiReturn {
  videos: Video[];
  loading: boolean;
  error: string | null;
  fetchVideos: (query: string, pageToken?: string) => Promise<void>;
  nextPageToken: string | null;
}

export const useYoutubeApi = (): UseYoutubeApiReturn => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  const fetchVideos = useCallback(async (query: string, pageToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: `intitle:면접 ${query}`,
          type: 'video',
          relevanceLanguage: 'ko',
          regionCode: 'KR',
          order: 'relevance',
          key: API_KEY,
          pageToken: pageToken || '',
        },
      });
      setVideos(prev => pageToken ? [...prev, ...response.data.items] : response.data.items);
      setNextPageToken(response.data.nextPageToken || null);
    } catch (err) {
      setError('Failed to fetch videos');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { videos, loading, error, fetchVideos, nextPageToken };
};
