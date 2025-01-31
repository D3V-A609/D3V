import React, { useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 120px; /* 전체 컨테이너 너비 */
`;

const ToggleText = styled.span`
  font-size: 12px;
  color: #535353;
  text-align: center;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 47.7px;
  height: 23.33px;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #49a0ff;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: #daecff; /* 비공개 상태 */
  }

  &:focus + ${ToggleSlider} {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + ${ToggleSlider}:before {
    transform: translateX(26px);
  }
`;

const ToggleButton: React.FC = () => {
  const [isPublic, setIsPublic] = useState(false);

  return (
    <ToggleContainer>
      <ToggleText>공개</ToggleText>
      <ToggleSwitch>
        <CheckBox
          type="checkbox"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
        <ToggleSlider />
      </ToggleSwitch>
      <ToggleText> 비공개</ToggleText>
    </ToggleContainer>
  );
};

export default ToggleButton;
