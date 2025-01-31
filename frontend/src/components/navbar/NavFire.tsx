import React from "react";

import './Nav.css';

import fire_true from '../../assets/images/navbar/fire-true.png';
import fire_false from '../../assets/images/navbar/fire-false.png';

interface NavFireProps {
    continuousDays: number;
    nickname: string;
    isNavOpen: boolean;
}

const NavFire: React.FC<NavFireProps> = ({ continuousDays, nickname, isNavOpen }) => {
    // const fireTrueText = `${nickname}님!\n${continuousDays}일째 불꽃이 타오르고 있어요!`;
    const fireFalseText = `불꽃이 죽었어요.. 다시 문제를 풀며 저를 살려주세요`;

    return (
        <div className={`nav-fire-container ${!isNavOpen ? "nav-fire-container--close" : ""}`}>
            {isNavOpen ? 
                <>
                    <div className="fire-img-container">
                        <img 
                            src={continuousDays === 0 ? fire_false : fire_true} 
                            alt="불꽃 이미지" 
                            className="fire-img" 
                        />
                    </div>
                    <div className="fire-text-container">
                        <p className="fire-text">
                            {continuousDays === 0 ? fireFalseText : <><span className="bold-text">{nickname}</span>님!<br/><span className='red-text'>{continuousDays}</span>일째 불꽃이 타오르고 있어요!</>}
                        </p>
                    </div>
                </> 
                : 
                <img src={continuousDays === 0 ? fire_false : fire_true} 
                    alt="불꽃 이미지" 
                    className="fire-img" 
                />
            }
        </div>
    );
};

export default NavFire;
