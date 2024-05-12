import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useLocation, useNavigate} from 'react-router-dom';

import {NavigationButton} from '../NavigationButton';

import {clearGrades, fetchAllGrades, fetchAverageGrade, fetchAverageSemestrGrade} from '../../../store/gradeSlice';
import {clearWeekData, fetchWeekDay, fetchWeekName, fetchWeekNumber} from '../../../store/weekDataSlice';
import {clearSchedule, fetchStudentsSchedule} from '../../../store/scheduleSlice';
import {clearAttendances, fetchAttendances} from '../../../store/attendanceSlice';
import {persistor} from '../../../store';
import {clearStudentInfo} from '../../../store/studentSlice';
import {logoutUser} from '../../../store/authSlice';
import {fetchAbsences} from '../../../store/absencesSlice';

import userIcon from '../../../assets/images/buttonIcons/User.svg';
import calendarIcon from '../../../assets/images/buttonIcons/Calendar.svg';
import statisticIcon from '../../../assets/images/buttonIcons/Chart.svg';
import attendanceIcon from '../../../assets/images/buttonIcons/Component.svg';
import debtsIcon from '../../../assets/images/buttonIcons/Receipt.svg';
import userManualIcon from '../../../assets/images/buttonIcons/InfoSquare.svg';
import logoutIcon from '../../../assets/images/buttonIcons/Logout.svg';

import '../style.css'
import {setMenuCondition} from "../../../store/extraSlice";

export const StudentNavButtons = ({closeMenu}) => {
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
    dispatch(clearAttendances());
    persistor.purge();
    navigate("/login");
  };
  const handleProfileInfo = () => {
    dispatch(setMenuCondition(false));
  }

  const handleScheduleInfo = () => {
    dispatch(fetchStudentsSchedule( studentGroup.group.name));
    dispatch(fetchWeekDay());
    dispatch(fetchWeekNumber());
    dispatch(fetchWeekName());
    dispatch(setMenuCondition(false));
  };

  const handleGradesInfo = () => {
    dispatch(fetchAllGrades(userToken));
    dispatch(fetchAverageGrade(userToken));
    dispatch(fetchAverageSemestrGrade(userToken));
    dispatch(setMenuCondition(false));
  }

  const handleAbsencesInfo = () => {
    dispatch(fetchAbsences(userToken));
    dispatch(setMenuCondition(false));
  }

  const handleAttendanceInfo = () => {
    dispatch(fetchAttendances(userToken));
    dispatch(setMenuCondition(false));
  }

  const handleManualInfo= () => {
    dispatch(setMenuCondition(false));
  }

  return (
    <>
      <div className="sidebar">
        <NavigationButton to="/" clickFunction={handleProfileInfo} icon={userIcon} text="Мой профиль" isActive={location.pathname === '/'}/>
        <NavigationButton to="/schedule" clickFunction={handleScheduleInfo} icon={calendarIcon} text="Расписание"
                          isActive={location.pathname === '/schedule'}/>
        <NavigationButton to="/statistic" clickFunction={handleGradesInfo} icon={statisticIcon} text="Статистика"
                          isActive={location.pathname === '/statistic'}/>
        <NavigationButton to="/attendance" clickFunction={handleAttendanceInfo}  icon={attendanceIcon} text="Посещения занятий"
                          isActive={location.pathname === '/attendance'}/>
        <NavigationButton to="/debts" clickFunction={handleAbsencesInfo} icon={debtsIcon} text="Задолжности"
                          isActive={location.pathname === '/debts'}/>
        <div className="dividing_line"></div>
        <NavigationButton to="/manual" clickFunction={handleManualInfo}icon={userManualIcon} text="Руководство пользователя"
                          isActive={location.pathname === '/manual'}/>
        <NavigationButton to="/login" clickFunction={handleLogout} icon={logoutIcon} text="Выйти из профиля"/>
      </div>
    </>
  );
};
