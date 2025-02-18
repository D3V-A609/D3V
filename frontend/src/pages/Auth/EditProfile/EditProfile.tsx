import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import { IoIosEyeOff, IoMdEye, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../../../store/hooks/useRedux'
import { fetchUserInfo } from '../../../store/actions/userActions';
import authApi from '../../../store/services/authApi'; // authApi 임포트

const EditProfile: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [nickname, setNickname] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [nicknameError, setNicknameError] = useState(''); // 닉네임 에러 상태 추가
  const [nicknameMessage, setNicknameMessage] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { me, loading, error } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUserInfo(null)); // 내 정보 가져오기
  }, [dispatch]);

  useEffect(() => {
    // 사용자 정보가 로드되면 상태 업데이트
    if (me) {
      setNickname(me.nickname || '');
      setGithubUrl(me.githubUrl || '');
    }
  }, [me]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  // 닉네임 중복 확인 함수
  const checkNicknameAvailability = async (nickname: string) => {
    try {
      const response = await authApi.checkNicknameDuplication(nickname);
      if (response.result) {
        // 현재 사용 중인 닉네임인 경우 에러 메시지 표시하지 않음
        if (me && me.nickname === nickname) {
          setNicknameError('');
          setNicknameMessage('');
        } else {
          setNicknameError(response.message); // 중복인 경우 에러 메시지 설정
          setNicknameMessage('');
        }
      } else {
        setNicknameError(''); // 에러 메시지 초기화
        setNicknameMessage('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error);
      setNicknameError('닉네임 중복 확인에 실패했습니다.'); // 에러 발생 시 메시지 설정
      setNicknameMessage('');
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 닉네임 유효성 검사
    if (nicknameError) {
      alert(nicknameError);
      return;
    }

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('githubUrl', githubUrl);
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }

    try {
      // authApi의 updateProfile 함수를 사용하여 API 호출
      const response = await authApi.updateProfile(formData);

      if (response.message === '정보 수정에 성공했습니다.') {
        alert('회원 정보가 수정되었습니다.');
        // 성공적으로 수정되었을 경우, 페이지 이동 또는 상태 업데이트
        navigate('/'); // 예시: 메인 페이지로 이동
      } else {
        alert('회원 정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원 정보 수정 실패:', error);
      alert('회원 정보 수정에 실패했습니다.');
    }
  };

  // 로딩 중이거나 에러가 발생했을 경우 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // 사용자 정보가 없을 경우 처리
  if (!me) {
    return <div>사용자 정보를 불러올 수 없습니다.</div>;
  }

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
            <label htmlFor="profile-upload" className="change-profile-button">프로필 이미지 변경</label>
          </div>
        </aside>

        <main className="profile-content">
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
                    className="verify-email-button"
                    onClick={() => setIsEmailVerified(true)}
                  >
                    이메일 인증
                  </button>
                )}
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
                onBlur={() => checkNicknameAvailability(nickname)} // 닉네임 중복 확인
              />
              {nicknameError && <div className="error-message">{nicknameError}</div>} {/* 에러 메시지 표시 */}
               {nicknameMessage && <div className="success-message">{nicknameMessage}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="github">GitHub 주소</label>
              <input
                type="url"
                id="github"
                placeholder="GitHub 주소를 입력하세요"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>비밀번호 변경</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? "password" : "text"}
                  placeholder="새 비밀번호 (영문, 숫자, 특수문자) *"
                  required
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
                  type={showConfirmPassword ? "password" : "text"}
                  placeholder="새 비밀번호 확인"
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <IoMdEye /> : <IoIosEyeOff />}
                </button>
              </div>
            </div>
          
        
            <button type="submit" className="save-button">저장</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
