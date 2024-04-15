import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { ErrorMessage } from '../../../components/Error/ErrorMessage';
import { SessionTable } from '../ScheduleComponents/SessionTable';
import { ScheduleSelectors } from '../ScheduleComponents/ScheduleSelectors';
import { Spinner } from '../../../components/Spinner';
import { StudentsTable } from '../ScheduleComponents/StudentsTable';

import {fetchStudentsSessionSchedule} from "../../../store/scheduleSlice";

export const StudentsSchedule = () => {
  const {studentsScheduleStatus, studentsScheduleData, studentsScheduleError} = useSelector((state) => state.schedule);

  const groupName = useSelector((state) => state.student.studentGroup);
  const selectedGroup = useSelector((state) => state.selectsData.group);
  const scheduleType = useSelector((state) => state.weekData.scheduleType);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudentsSessionSchedule(groupName));
  }, [groupName]);

  return (
    <>
      {studentsScheduleStatus === 'loading' && <Spinner type="points" text="Идёт загрузка" />}
      {studentsScheduleError && <ErrorMessage error={studentsScheduleError} />}
      {studentsScheduleStatus !== 'loading' && !studentsScheduleError && (
        <>
          <div className="group-selectors-block">
            <ScheduleSelectors isCorrespondenceSchedule={false} />
          </div>
          {
            scheduleType==='ordinary-schedule'
              ?
              <StudentsTable scheduleData={studentsScheduleData} isCorrespondenceSchedule={false} />
              :
              <SessionTable isStudentSession={true} />
          }
        </>
      )}
    </>
  );
};
