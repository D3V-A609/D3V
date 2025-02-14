// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';

// interface ProtectedSignupRouteProps {
//   step: number;
//   children: React.ReactNode;
// }

// const ProtectedSignupRoute = ({ step, children }: ProtectedSignupRouteProps) => {
//   const currentStep = useSelector((state: RootState) => state.auth.currentStep);
  
//   if (step > currentStep) {
//     return <Navigate to="/auth/signup" replace />;
//   }
//   return <>{children}</>;
// };

// export default ProtectedSignupRoute;