import React from "react";

import "./NavProfile.css"

import default_img from '../../assets/images/logo.png';
import { FiLogOut } from "react-icons/fi";

interface ProfileProps {
    profileImage: string;
    nickname: string;
    job: string;
    onLogout: () => void;
  }
  
  interface NavProfileProps {
    profile: ProfileProps; // profile 객체를 전달받음
    isNavOpen: boolean;
  }

const defaultImgDiv = (
    <div className="default-img-bg">
        <img src={default_img} className="default-img" alt="default-img" />
    </div>
)

const NavProfile: React.FC<NavProfileProps> = ({profile, isNavOpen}) => {
    
    return(
    <div className={`nav-profile ${!isNavOpen?'nav-profile--close': '' }`} >
        {isNavOpen? 
            <>
                <div className="profile-img-col">
                    {
                        profile.profileImage?
                        <img src={profile.profileImage} alt='profile' className='user-profile-image' />
                        : defaultImgDiv
                    }
                </div>
                <div className='user-info-col'>
                    <div className='nickname'>{profile.nickname}</div>
                    <div className="job">{profile.job}</div>
                </div>
                <div className="logout-div-col">
                    <button onClick={profile.onLogout} className="logout-btn">
                        <FiLogOut color="#535353"/>
                    </button>
                </div>
            </>
        : 
            <div className="profile-img-col profile-img-col--close">
                {
                    profile.profileImage?
                    <img src={profile.profileImage} alt='profile' className='user-profile-image' />
                    : defaultImgDiv
                }
            </div> 
        }
    </div>
    );
};

export default NavProfile;