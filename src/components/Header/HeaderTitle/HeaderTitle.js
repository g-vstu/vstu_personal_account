import React from 'react';

import personIcon from '../../../assets/images/vector.svg';
import './style.css';

export const HeaderTitle = ({blockName, logoImg, titleText}) => {
  return (
    <div className={blockName}>
      <img className={logoImg} src={personIcon} alt="Person icon"/>
      <p className={titleText}>
        Личный кабинет студента УО "ВГТУ"
      </p>
    </div>
  );
};
