import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import { IoIosEyeOff, IoMdEye, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../../../store/hooks/useRedux'
// import { fetchUserInfo } from '../../../store/actions/userActions';
import authApi from '../../../store/services/authApi';
import { fetchJobs } from '../../../store/actions/jobActions';
import { RootState } from '../../../store';
// import TokenService from '../../../store/services/token/tokenService';
// import { updateEmailVerification } from '../../../store/slices/userSlice';

const formatJobName = (jobName: string) => {
  return (jobName ?? '').replace('_', ' ').toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const EditProfile: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nickname, setNickname] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [githubUrlError, setGithubUrlError] = useState('');
  const [favoriteJob, setFavoriteJob] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [isTimerActive, setIsTimerActive] = useState(false);
 
  const { jobs } = useAppSelector((state: RootState) => state.jobs);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { me, loading, error } = useAppSelector(state => state.user);

  // 원본 데이터 상태
  const [originalData, setOriginalData] = useState({
    nickname: '',
    githubUrl: '',
    profileImage: null as File | null,
    favoriteJob: ''
  });

  useEffect(() => {
    // dispatch(fetchUserInfo(null));
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (me) {
      setNickname(me.nickname || '');
      setGithubUrl(me.githubUrl || '');
      setFavoriteJob(me.favoriteJob || '');
      setOriginalData({
        nickname: me.nickname || '',
        githubUrl: me.githubUrl || '',
        profileImage: null,
        favoriteJob: me.favoriteJob || ''
      });
    }
  }, [me]);

  const hasChanges = () => {
    const isPasswordValid = !password || (password && confirmPassword && password === confirmPassword);
    const hasPasswordChange = password !== '' && confirmPassword !== '' && password === confirmPassword;
    
    return (
      nickname !== originalData.nickname ||
      githubUrl !== originalData.githubUrl ||
      profileImage !== originalData.profileImage ||
      favoriteJob !== originalData.favoriteJob ||
      hasPasswordChange
    ) && isPasswordValid;
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const isValidGithubUrl = (url: string): boolean => {
    if (!url) return true; // 빈 값은 허용
    const githubUrlPattern = /^https?:\/\/github\.com\/[a-zA-Z0-9_-]{1,39}$/i;
    return githubUrlPattern.test(url);
  };

  const validatePassword = () => {
    if (!password && !confirmPassword) {
      setPasswordError('');
      return true;
    }

    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }

    setPasswordError('비밀번호가 일치합니다.');
    return true;
  };


  const checkNicknameAvailability = async (nickname: string) => {
    try {
      const response = await authApi.checkNicknameDuplication(nickname);
      if (response.result) {
        if (me && me.nickname === nickname) {
          setNicknameError('');
          setNicknameMessage('');
        } else {
          setNicknameError(response.message);
          setNicknameMessage('');
        }
      } else {
        setNicknameError('');
        setNicknameMessage('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error);
      setNicknameError('닉네임 중복 확인에 실패했습니다.');
      setNicknameMessage('');
    }
  };

  const handleStartVerification = async (e: React.MouseEvent) => {
    e.preventDefault(); // 이벤트 전파 방지
    try {
      if (!me?.email) {
        alert('이메일 정보를 찾을 수 없습니다.');
        return;
      } 
      const response = await authApi.sendEmailVerification(me.email);
      if (response.result) {
        setShowVerificationInput(true);
        setVerificationCode('');
        setTimeLeft(300); // 5분 타이머 설정
        setIsTimerActive(true);
        alert('인증 코드가 이메일로 전송되었습니다.');
      } else {
        alert('인증 코드 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('이메일 인증 코드 전송 실패:', error);
      alert('인증 코드 전송에 실패했습니다.');
    }
  };
  
  const handleVerifyCode = async (e: React.MouseEvent) => {
    e.preventDefault(); // 이벤트 전파 방지
    
    try {
      if (!me?.email) {
        alert('이메일 정보를 찾을 수 없습니다.');
        return;
      } 
      const response = await authApi.verifyEmailCode(me.email, verificationCode);
      if (response.result) {
        // dispatch(updateEmailVerification(true));
        setIsEmailVerified(true);
        setShowVerificationInput(false);
        setIsTimerActive(false);
        alert('이메일 인증이 완료되었습니다.');
      } else {
        alert('잘못된 인증 코드입니다.');
      }
    } catch (error) {
      console.error('이메일 인증 실패:', error);
      alert('이메일 인증에 실패했습니다.');
    }
  };

  // 타이머 관련 useEffect
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) {
      if (timeLeft === 0) {
        setShowVerificationInput(false);
        setIsTimerActive(false);
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setShowVerificationInput(false);
          setIsTimerActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerActive, timeLeft]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const token = TokenService.getAccessToken();
    // console.log('Current token:', token);

    if (!isValidGithubUrl(githubUrl)) {
      alert('올바른 GitHub 프로필 URL을 입력해주세요.');
      return;
    }

    if (nicknameError) {
      alert(nicknameError);
      return;
    }

    if (!validatePassword()) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = new FormData();
    
    if (nickname !== originalData.nickname) {
      formData.append('nickname', nickname);
    }
    
    if (githubUrl !== originalData.githubUrl) {
      formData.append('githubUrl', githubUrl);
    }

    if (favoriteJob !== originalData.favoriteJob) {
      formData.append('favoriteJob', favoriteJob);
    }
    
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }
    
    if (password) {
      formData.append('password', password);
    }

    try {
      const response = await authApi.updateProfile(formData);
      if (response.message === '정보 수정에 성공했습니다.') {
        alert('회원 정보가 수정되었습니다.');
        navigate('/');
      } else {
        alert('회원 정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원 정보 수정 실패:', error);
      alert('회원 정보 수정에 실패했습니다.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!me) return <div>사용자 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="edit-profile-container">
      <header className="edit-profile-header">
        <h1>회원 정보 수정</h1>
      </header>

      <div className="edit-profile-body">
        <aside className="profile-sidebar">
          <div className="profile-section">
            <img
              src={me.profileImg || "https://via.placeholder.com/150"}
              alt="프로필 이미지"
              className="profile-image"
            />
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="profile-upload" className="change-profile-button">
              프로필 이미지 변경
            </label>
          </div>
        </aside>

        <main className="profile-main">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">이메일 주소</label>
              <div className="email-input-wrapper">
                <input
                  type="email"
                  id="email"
                  value={me.email || "이메일 정보 없음"}
                  readOnly
                />
                {isEmailVerified ? (
                  <span className="email-verified">
                    <IoMdCheckmarkCircleOutline /> 인증됨
                  </span>
                ) : (
                  <button
                    type="button" 
                    className="verify-email-button"
                    onClick={handleStartVerification}
                    disabled={showVerificationInput}
                  >
                    이메일 인증
                  </button>
                )}
              </div>
              {showVerificationInput && (
                <div className="verification-input-wrapper">
                  <input
                    type="text"
                    placeholder="인증 코드를 입력하세요"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); // Enter 키 기본 동작 방지
                      }
                    }}
                  />
                  <button 
                    type="button"  // type을 명시적으로 지정
                    onClick={handleVerifyCode}
                  >
                    확인
                  </button>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                placeholder="새 닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onBlur={() => checkNicknameAvailability(nickname)}
              />
              {nicknameError && <div className="error-message">{nicknameError}</div>}
              {nicknameMessage && <div className="success-message">{nicknameMessage}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="github">GitHub 주소</label>
              <input
                type="url"
                id="github"
                placeholder="GitHub 주소를 입력하세요 (예: https://github.com/username)"
                value={githubUrl}
                onChange={(e) => {
                  setGithubUrl(e.target.value);
                  if (!isValidGithubUrl(e.target.value)) {
                    setGithubUrlError('올바른 GitHub 프로필 URL을 입력해주세요.');
                  } else {
                    setGithubUrlError('');
                  }
                }}
              />
              {githubUrlError && <div className="error-message">{githubUrlError}</div>}
            </div>


            <div className="form-group">
              <label htmlFor="favoriteJob">관심직무</label>
              <select
                id="favoriteJob"
                value={favoriteJob}
                onChange={(e) => setFavoriteJob(e.target.value)}
              >
                <option value="">관심 직무를 선택해주세요 (선택사항)</option>
                {jobs.map((job) => (
                  <option key={job} value={job}>
                    {formatJobName(job)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>비밀번호 변경</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="새 비밀번호 (영문, 숫자, 특수문자) *"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword();
                  }}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>비밀번호 확인</label>
              <div className="password-input-wrapper">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="새 비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validatePassword();
                  }}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <IoMdEye /> : <IoIosEyeOff />}
                </button>
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>



            {hasChanges() ? (
              <button type="submit" className="save-button">저장</button>
            ) : (
              <button type="submit" className="save-button" disabled>
                변경사항 없음
              </button>
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
