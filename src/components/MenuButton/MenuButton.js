import React, { useState } from 'react';

import { StudentNavButtons } from '../NavigationButtons/StudentNavButtons';
import { TeacherNavButtons } from '../NavigationButtons/TeacherNavButtons';

import open from '../../assets/images/headerIcons/open.svg';
import './style.css';

export const MenuButton = ({userRole}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <>
      <button className="menu-btn" onClick={toggleMenu}>
        <img src={open} alt="Open btn"/>
      </button>
      <div className={`menu-block ${isOpenMenu === true ? 'active-block' : 'disable-block'}`}>
        {userRole === 0 ?
          <StudentNavButtons/>
          :
          <TeacherNavButtons/>
        }
      </div>
    </>
  );
};
