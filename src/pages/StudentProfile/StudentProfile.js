import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getStudentInfo} from '../../store/studentSlice';
import {getCurrentDate} from '../../assets/utils/functions';

import './style.css';

export const StudentProfile = () => {
  const userToken = useSelector((state) => state.auth.userToken);
  const userName = useSelector((state) => state.student.studentInfo ? state.student.studentInfo.name : '');
  const codeSpecialization = useSelector((state) => state.student.studentInfo ? state.student.studentInfo.group.spec.specCode : '');
  const specializationName = useSelector((state) => state.student.studentInfo ? state.student.studentInfo.group.spec.name : '');
  const groupName = useSelector((state) => state.student.studentGroup);

  const dispatch = useDispatch();

  const currentDate = getCurrentDate();


  useEffect(() => {
    dispatch(getStudentInfo(userToken))
  }, [userToken])

  return (
    <div className="profile-container">
      <div className="student-info">
        <div className="student-info-header">
          <h2 className="student-name">Здравствуйте, {userName}!</h2>
          <div className="current-date">Сегодня - {currentDate}</div>
        </div>
        <div>
          <div className="student-info-row">
            <span className="student-info-row-name">Код специальности:</span>
            <span className="student-info-row-data">{codeSpecialization}</span>
          </div>
          <div className="student-info-row">
            <span className="student-info-row-name">Название:</span>
            <span className="student-info-row-data">{specializationName}</span>
          </div>
          <div className="student-info-row">
            <span className="student-info-row-name">Группа:</span>
            <span className="student-info-row-data">{groupName}</span>
          </div>
        </div>
      </div>
      <div className="notifications">
        <div className="notifications-header">
          <h3 className="notifications-title">Уведомления</h3>
          <span className="see-all">Посмотреть все</span>
        </div>
        <div className="notification-block">
          <h4 className="notification-title">Admin, 28.08.22</h4>
          <p className="notification-text">Таким образом, современная методология разработки способствует повышению
            качества новых предложений.
            Предварительные выводы неутешительны: семантический.</p>
        </div>
        <div className="notification-block">
          <h4 className="notification-title">Admin, 28.08.22</h4>
          <p className="notification-text">Таким образом, современная методология разработки способствует повышению
            качества новых предложений.
            Предварительные выводы неутешительны: семантический.</p>
        </div>
        <div className="notification-block">
          <h4 className="notification-title">Admin, 28.08.22</h4>
          <p className="notification-text">Таким образом, современная методология разработки способствует повышению
            качества новых предложений.
            Предварительные выводы неутешительны: семантический.</p>
        </div>
      </div>
    </div>
  );
};
