import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import {NavigationButton} from '../NavigationButton';

import {clearGrades, fetchAllGrades, fetchAverageGrade, fetchAverageSemestrGrade} from '../../../store/gradeSlice';
import {clearWeekData, fetchWeekDay, fetchWeekName, fetchWeekNumber} from '../../../store/weekDataSlice';
import {clearSchedule, fetchStudentsSchedule} from '../../../store/scheduleSlice';
import {persistor} from '../../../store';
import {clearStudentInfo} from '../../../store/studentSlice';
import {logoutUser} from '../../../store/authSlice';

import userIcon from '../../../assets/images/buttonIcons/User.svg';
import calendarIcon from '../../../assets/images/buttonIcons/Calendar.svg';
import statisticIcon from '../../../assets/images/buttonIcons/Chart.svg';
import attendanceIcon from '../../../assets/images/buttonIcons/Component.svg';
import debtsIcon from '../../../assets/images/buttonIcons/Receipt.svg';
import userManualIcon from '../../../assets/images/buttonIcons/InfoSquare.svg';
import logoutIcon from '../../../assets/images/buttonIcons/Logout.svg';

import '../style.css'

export const StudentNavButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const studentGroup = useSelector((state) => state.student.studentInfo);
  const userToken = useSelector((state) => state.auth.userToken);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearStudentInfo());
    dispatch(clearSchedule());
    dispatch(clearWeekData());
    dispatch(clearGrades());
    persistor.purge();
    navigate("/login");
  };

  const handleScheduleInfo = () => {
    dispatch(fetchStudentsSchedule( studentGroup.group.name));
    dispatch(fetchWeekDay());
    dispatch(fetchWeekNumber());
    dispatch(fetchWeekName());
  };

  const handleGradesInfo = () => {
    dispatch(fetchAllGrades(userToken));
    dispatch(fetchAverageGrade(userToken));
    dispatch(fetchAverageSemestrGrade(userToken));
  }

  return (
    <>
      <div className="sidebar">
        <NavigationButton to="/" icon={userIcon} text="Мой профиль" isActive={location.pathname === '/'}/>
        <NavigationButton to="/schedule" clickFunction={handleScheduleInfo} icon={calendarIcon} text="Расписание"
                          isActive={location.pathname === '/schedule'}/>
        <NavigationButton to="/statistic" clickFunction={handleGradesInfo} icon={statisticIcon} text="Статистика"
                          isActive={location.pathname === '/statistic'}/>
        <NavigationButton to="/attendance" icon={attendanceIcon} text="Посещения занятий"
                          isActive={location.pathname === '/attendance'}/>
        <NavigationButton to="/debts" icon={debtsIcon} text="Задолжности" isActive={location.pathname === '/debts'}/>
        <div className="dividing_line"></div>
        <NavigationButton to="/manual" icon={userManualIcon} text="Руководство пользователя"
                          isActive={location.pathname === '/manual'}/>
        <NavigationButton to="/login" clickFunction={handleLogout} icon={logoutIcon} text="Выйти из профиля"/>
        {/*<button onClick={handleLogout} className="sidebar-button">*/}
        {/*  <div className="button-content">*/}
        {/*    <img src={logoutIcon} alt="Button icon" className="button_icon"/>*/}
        {/*    <span className="button_text">Выйти из профиля</span>*/}
        {/*  </div>*/}
        {/*</button>*/}
      </div>
    </>
  );
};
