import React, { useState } from "react";
import { RootState } from '../../../store';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { resetSignupForm, setError } from "../../../store/slices/authSlice";
import authApi from '../../../store/services/authApi';
import { toast } from 'react-toastify';
import "./Step3.css";

const Step3: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedJob, setSelectedJob] = useState('');

  const jobOptions = [
    { value: "FRONTEND", label: "프론트엔드" },
    { value: "BACKEND", label: "백엔드" }
  ];

  const signupForm = useSelector((state: RootState) => state.auth.signupForm);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(setError(null));
      
      const formData = new FormData();
      
      // signUp 파라미터로 전달할 데이터 객체 생성
      formData.append("email", signupForm.email);
      formData.append("password", signupForm.password);
      formData.append("nickname", signupForm.nickname);
      formData.append("githubUrl", signupForm.githubUrl || '');
      formData.append("favoriteJob", selectedJob);
      
      // 프로필 이미지 처리
      if (signupForm.profileImage) {
        formData.append('profile_image', signupForm.profileImage);
      }

      const response = await authApi.signup(formData);

      console.log(response)
      
      if (response.message === '회원가입에 성공하였습니다.') {
        dispatch(resetSignupForm());
        
        toast.success('회원가입이 완료되었습니다.', {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          toastId: 'signup-success',
        });
        navigate('/', { replace: true });
      }
    } catch (error: unknown) {
      dispatch(setError('회원가입에 실패했습니다.'));
      console.error('Signup failed:', error);
      
      toast.error('회원가입에 실패했습니다.', {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        toastId: 'signup-error'
      });
    }
  };


  return (
    <div className="signup-step">
      <h2>마지막 단계</h2>
      <p className="signup-description">
        관심있는 직무를 선택해주세요.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="signup-form-group">
          <label>관심 직무</label>
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            required
          >
            <option value="">관심 직무를 선택해주세요</option>
            {jobOptions.map((job) => (
              <option key={job.value} value={job.value}>
                {job.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Step3;
