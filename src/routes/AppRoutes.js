import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {Login} from '../pages/Login';
import {TeacherProfile} from '../pages/TeacherProfile';
import {StudentProfile} from '../pages/StudentProfile';
import {MainLayout} from '../layouts/MainLayout';
import {StudentsSchedule} from '../pages/Schedule/StudentsSchedule';
import {TeacherSchedule} from '../pages/Schedule/TeacherSchedule';
import {Statistic} from '../pages/Statistic';

const AppRoutes = ({isAuthenticated, roles}) => {
  const [userRoleNumber, setUserRoleNumber] = useState(null);

  useEffect(() => {
    if (roles !== null) {
      const stateRole = roles.includes('USER') ? 1 : 0;
      if (stateRole === 0) {
        setUserRoleNumber(0);
      } else if (stateRole === 1) {
        setUserRoleNumber(1);
      }
    }
  }, [isAuthenticated, roles]);

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Navigate to="/login" replace={true}/>}/>
        </>
      ) : userRoleNumber === 0 ? (
        <>
          <Route path="/" element={<MainLayout role={userRoleNumber}/>}>
            <Route index element={<StudentProfile/>}/>
            <Route path="/schedule" element={<StudentsSchedule/>}/>
            <Route path="/statistic" element={<Statistic/>}/>
            <Route path="*" element={<Navigate to="/" replace={true}/>}/>
          </Route>
        </>
      ) : (
        <>
          <Route path="/" element={<MainLayout role={userRoleNumber}/>}>
            <Route index element={<TeacherProfile/>}/>
            <Route path="/schedule" element={<TeacherSchedule/>}/>
            <Route path="*" element={<Navigate to="/" replace={true}/>}/>
          </Route>
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;