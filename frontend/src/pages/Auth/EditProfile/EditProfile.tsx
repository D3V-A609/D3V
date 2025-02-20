import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../../../store/hooks/useRedux'
// import { fetchUserInfo } from '../../../store/actions/userActions';
import authApi from '../../../store/services/authApi';
import { fetchJobs } from '../../../store/actions/jobActions';
import { RootState } from '../../../store';
import { logoutSuccess } from '../../../store/slices/authSlice';
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
  const { jobs } = useAppSelector((state: RootState) => state.jobs);
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    return () => {
      if (profileImage instanceof File) {
        URL.revokeObjectURL(URL.createObjectURL(profileImage));
      }
    };
  }, [profileImage]);

  const hasChanges = () => {
    // 비밀번호 필드 검증
    const isPasswordValid = (!password && !confirmPassword) || 
                          (password && confirmPassword && password === confirmPassword);
    
    // 다른 필드들의 변경사항 확인
    const hasOtherChanges = 
      nickname !== originalData.nickname ||
      githubUrl !== originalData.githubUrl ||
      profileImage !== originalData.profileImage ||
      favoriteJob !== originalData.favoriteJob;

    return (hasOtherChanges || (password && confirmPassword)) && isPasswordValid;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(file);  // 실제 파일 저장
      
      // 이미지 미리보기 업데이트
      const imageElement = document.querySelector('.profile-image') as HTMLImageElement;
      if (imageElement) {
        imageElement.src = previewUrl;
      }
    }
  }

  const isValidGithubUrl = (url: string): boolean => {
    if (!url) return true; // 빈 값은 허용
    const githubUrlPattern = /^https?:\/\/github\.com\/[a-zA-Z0-9_-]{1,39}$/i;
    return githubUrlPattern.test(url);
  };

  const validatePassword = () => {
    const passwordInput = document.querySelector('input[type="password"]');
    const confirmInput = document.querySelector('input[placeholder="새 비밀번호 확인"]');
    const errorDiv = document.querySelector('.error-message');
    
    // 둘 다 비어있는 경우
    if (!password && !confirmPassword) {
      setPasswordError('');
      passwordInput?.classList.remove('valid', 'invalid');
      confirmInput?.classList.remove('valid', 'invalid');
      return true;
    }

    // 하나만 입력된 경우
    if ((!password && confirmPassword) || (password && !confirmPassword)) {
      setPasswordError('비밀번호를 모두 입력해주세요.');
      passwordInput?.classList.add('invalid');
      confirmInput?.classList.add('invalid');
      errorDiv?.classList.add('error');
      return false;
    }

    // 비밀번호 유효성 검사 (영문, 숫자, 특수문자 포함)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.');
      passwordInput?.classList.add('invalid');
      confirmInput?.classList.add('invalid');
      errorDiv?.classList.add('error');
      return false;
    }

    // 비밀번호 일치 여부 확인
    if (password === confirmPassword) {
      setPasswordError('비밀번호가 일치합니다.');
      passwordInput?.classList.add('valid');
      confirmInput?.classList.add('valid');
      errorDiv?.classList.add('success');
      return true;
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      passwordInput?.classList.add('invalid');
      confirmInput?.classList.add('invalid');
      errorDiv?.classList.add('error');
      return false;
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidGithubUrl(githubUrl)) {
      alert('올바른 GitHub 프로필 URL을 입력해주세요.');
      return;
    }

    if (nicknameError) {
      alert(nicknameError);
      return;
    }

    if (!validatePassword()) {
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
    
    if (profileImage instanceof File) {  // File 타입 체크 추가
      formData.append('profile_image', profileImage);
    }
    
    if (password) {
      formData.append('password', password);
    }

    try {
      const response = await authApi.updateProfile(formData);
      if (response.memberId) {
        alert('회원 정보가 수정되었습니다.');
        window.location.reload();
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
          <div className="delete-account-section">
            <button 
              type="button" 
              onClick={() => {
                if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
                  authApi.deleteMember().then(() => {
                    dispatch(logoutSuccess());  
                    window.location.href = '/';
                  }).catch((error) => {
                    console.error('회원 탈퇴 처리 실패:', error);
                    alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
                  });
                }
              }}
              className="delete-account-button"
            >
              회원 탈퇴
            </button>
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
              </div>
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
                    // 첫 번째 입력필드에서는 validatePassword를 즉시 호출하지 않음
                  }}
                  onBlur={validatePassword} // 포커스를 잃을 때 검증
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
                  }}
                  onBlur={validatePassword} // 포커스를 잃을 때 검증
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
