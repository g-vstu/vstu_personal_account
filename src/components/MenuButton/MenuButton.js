import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {StudentNavButtons} from '../NavigationButtons/StudentNavButtons';
import {TeacherNavButtons} from '../NavigationButtons/TeacherNavButtons';

import {setMenuCondition} from '../../store/extraSlice';

import './style.css';

export const MenuButton = ({userRole}) => {
  const isOpenMenu = useSelector((state) => state.extra.isOpenMenu);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    dispatch(setMenuCondition(!isOpenMenu));
  };

  return (
    <>
      <button className="menu-btn" onClick={toggleMenu}>
        <div className={`menu-icon ${isOpenMenu ? 'open' : ''}`}></div>
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
