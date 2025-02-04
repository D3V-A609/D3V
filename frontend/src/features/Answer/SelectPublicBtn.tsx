import React from 'react';

interface VisibilityOptionsProps {
  selectedOption: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectPublicBtn:React.FC<VisibilityOptionsProps> = ({selectedOption, onChange}) => {
  return (
  <div className="select-public-btn-container">
    <div>
      <input
        type="radio"
        id="PUBLIC"
        name="visibility"
        value="PUBLIC"
        checked={selectedOption === 'PUBLIC'}
        onChange={onChange}
      />
      <label htmlFor="PUBLIC">전체 공개</label>
    </div>

    <div>
      <input
        type="radio"
        id="PROTECTED"
        name="visibility"
        value="PROTECTED"
        checked={selectedOption === 'PROTECTED'}
        onChange={onChange}
      />
      <label htmlFor="PROTECTED">친구 공개</label>
    </div>

    <div>
      <input
        type="radio"
        id="PRIVATE"
        name="visibility"
        value="PRIVATE"
        checked={selectedOption === 'PRIVATE'}
        onChange={onChange}
      />
      <label htmlFor="PRIVATE">나만 보기</label>
    </div>
  </div>);
}

export default SelectPublicBtn;