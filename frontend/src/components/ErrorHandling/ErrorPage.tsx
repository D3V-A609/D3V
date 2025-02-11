// components/ErrorPage.tsx
import React, { useEffect, useRef } from 'react';

interface ErrorPageProps {
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      alert(message);
      hasMounted.current = true;
    }

    // console.log('error 발생: ', message);
    const timer = setTimeout(() => {
      window.location.reload();
    }, 1000); // 1초 후 새로고침
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="error-container">
    </div>
  );
};

export default ErrorPage;
