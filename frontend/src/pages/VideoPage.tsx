import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import { FaYoutube } from "react-icons/fa6";

const VideoPage:React.FC = () => {
  return (
    <PageHeader
      title="면접 영상 추천"
      description="음..."
      icon={<FaYoutube />}
      iconStyle="youtube-icon"
    />
  )
}

export default VideoPage;