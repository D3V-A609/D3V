import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ProtectedSignupRouteProps {
  step: number; // 요청된 라우트의 단계
  children: React.ReactNode; // 보호할 자식 컴포넌트
}

const ProtectedSignupRoute = ({ step, children }: ProtectedSignupRouteProps) => {
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);
  
  if (step > currentStep) {
    return <Navigate to="/auth/signup" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedSignupRoute;
