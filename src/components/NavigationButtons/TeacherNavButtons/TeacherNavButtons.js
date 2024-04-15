import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';

import {logoutUser} from '../../../store/authSlice';
import {persistor} from '../../../store';

import {NavigationButton} from '../NavigationButton';

import userIcon from '../../../assets/images/buttonIcons/User.svg';
import calendarIcon from '../../../assets/images/buttonIcons/Calendar.svg';
import userManualIcon from '../../../assets/images/buttonIcons/InfoSquare.svg';
import logoutIcon from '../../../assets/images/buttonIcons/Logout.svg';
import {fetchTeacherSchedule, fetchTeacherWeekSchedule} from "../../../store/scheduleSlice";

export const TeacherNavButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const teacherFio = useSelector((state) => state.auth.userInfo.fio);

  const handleLogout = () => {
    dispatch(logoutUser());
    persistor.purge();
    navigate("/login");
  };

  const getSchedule = () => {
    dispatch(fetchTeacherSchedule(teacherFio));
  }

  return (
    <>
      <NavigationButton to="/" icon={userIcon} text="Мой профиль" isActive={location.pathname === '/'}/>
      <NavigationButton
        to="/schedule" icon={calendarIcon}
        text="Расписание"
        isActive={location.pathname === '/schedule'}
        onClick={getSchedule}
      />
      <div className="dividing_line"></div>
      <NavigationButton to="/manual" icon={userManualIcon} text="Руководство пользователя"
                        isActive={location.pathname === '/manual'}/>
      <button onClick={handleLogout} className="sidebar-button">
        <div className="button-content">
          <img src={logoutIcon} alt="Button icon" className="button_icon"/>
          <span className="button_text">Выйти из профиля</span>
        </div>
      </button>
    </>
  );
};
