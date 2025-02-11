// components/LoadingPage.tsx
import React from 'react';
import './LoadingPage.css';

const LoadingPage: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingPage;
