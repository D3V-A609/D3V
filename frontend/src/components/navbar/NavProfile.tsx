import React from "react";

import "./NavProfile.css"

import default_img from '../../assets/images/logo.png';
import { FiLogOut } from "react-icons/fi";

interface userProfile {
    profileImage: string;
    nickname: string;
    job: string;
    onLogout: () => void;
}

const defaultImgDiv = (
    <div className="default-img-bg">
        <img src={default_img} className="default-img" alt="default-img" />
    </div>
)

const NavProfile: React.FC<userProfile> = ({profileImage, nickname, job, onLogout}) => {
    return(
    <div className="nav-profile">
        <div className="profile-img-col">
            {
                profileImage?
                <img src={profileImage} alt='profile' className='user-profile-image' />
                : defaultImgDiv
            }
        </div>
        <div className='user-info-col'>
            <div className='nickname'>{nickname}</div>
            <div className="job">{job}</div>
        </div>
        <div className="logout-div-col">
            <button onClick={onLogout} className="logout-btn">
                <FiLogOut color="#535353"/>
            </button>
        </div>
    </div>
    );
};

export default NavProfile;