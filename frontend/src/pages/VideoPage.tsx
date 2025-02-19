import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/hooks/useRedux';
import { fetchVideos } from '../store/actions/youtubeActions';
import { fetchJobs } from '../store/actions/jobActions';
import Top10Filter from '../components/Top10/Top10Filter';
import VideoList from '../features/Video/VideoList';
import { RootState } from '../store/reducers';
import PageHeader from "../components/PageHeader/PageHeader"
import { FaYoutube } from "react-icons/fa6";
import './VideoPage.css'


const VideoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { videos, loading, error } = useSelector((state: RootState) => state.youtube);
  const userFavoriteJob = useSelector((state: RootState) => state.user.me?.favoriteJob);
  const [selectedJob, setSelectedJob] = useState(userFavoriteJob || 'FRONTEND');
  const [jobCategories, setJobCategories] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchJobs()).unwrap().then((jobs: string[]) => {
      setJobCategories(
        jobs.reduce((acc, job) => {
          acc[job] = job.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
          return acc;
        }, {} as { [key: string]: string })
      );
    }).catch((error) => console.error('Failed to fetch jobs:', error));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVideos(`${jobCategories[selectedJob] || selectedJob}`));
  }, [dispatch, selectedJob, jobCategories]);

  return (
    <div className="video-page">
      <PageHeader
      title="면접 영상 추천"
      description="YouTube에서 엄선한 면접 준비 영상을 확인하세요!"
      icon={<FaYoutube />}
      iconStyle="youtube-icon"
      />

      <Top10Filter
        selectedJob={selectedJob}
        onJobChange={setSelectedJob}
        jobCategories={jobCategories}
      />
      {error && <p>Error: {error}</p>}
      {!loading && !error && <VideoList videos={videos} />}
    </div>
  );
};

export default VideoPage;