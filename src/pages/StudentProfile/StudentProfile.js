import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getStudentInfo} from '../../store/studentSlice';

export const StudentProfile = () => {

  const userName = useSelector((state) => state.auth.userInfo.fio);
  const userToken = useSelector((state) => state.auth.userToken);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentInfo(userToken))
  }, [userToken])

  return (
    <div>
      StudentProfile
    </div>
  );
};
