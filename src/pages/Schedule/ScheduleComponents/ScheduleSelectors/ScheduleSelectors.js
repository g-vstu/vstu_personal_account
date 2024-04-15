import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomSelect } from '../../../../components/CustomSelect';

import {
  setScheduleType,
  setWeekDay,
  setWeekName,
  setWeekNumber
} from '../../../../store/weekDataSlice';

import {matchDayOfWeek2, matchScheduleType, matchSelectScheduleType} from '../../../../assets/utils/functions';

import './style.css';

const typeOptions = [
  {value: 'ordinary-schedule', label: 'Обычное'},
  {value: 'session-schedule', label: 'Сессия'},
];

const dayOptions = [
  {value: 'MONDAY', label: 'Понедельник'},
  {value: 'TUESDAY', label: 'Вторник'},
  {value: 'WEDNESDAY', label: 'Среда'},
  {value: 'THURSDAY', label: 'Четверг'},
  {value: 'FRIDAY', label: 'Пятница'},
  {value: 'SATURDAY', label: 'Суббота'},
  {value: 'SUNDAY', label: 'Воскресенье'},
  {value: 'ALL', label: 'Все дни'},
];

const weekNumberOptions = [
  {value: 1, label: 1},
  {value: 2, label: 2},
  {value: 3, label: 3},
  {value: 4, label: 4},
  {value: 'все', label: 'все'}
];

export const ScheduleSelectors = ({isCorrespondenceSchedule, forAllWeek}) => {
  const weekDay = useSelector((state) => state.weekData.weekDay);
  const currentWeekNumber = useSelector((state) => state.weekData.weekNumber);
  const currentWeekName = useSelector((state) => state.weekData.weekName);
  const scheduleType = useSelector((state) => state.weekData.scheduleType);

  const [currentWeekDay, setCurrentWeekDay] = useState(matchDayOfWeek2(weekDay));
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(currentWeekNumber);
  const [selectedScheduleType, setSelectedScheduleType] = useState(matchSelectScheduleType(scheduleType));

  const [isCheckedNumerator, setIsCheckedNumerator] = useState(false);
  const [isCheckedDenominator, setIsCheckedDenominator] = useState(false);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstRender) {
      if (isCorrespondenceSchedule || forAllWeek === true) { //для заочников. сначала выводим на всю неделю расписание
        setCurrentWeekDay('Все дни');
        dispatch(setWeekDay('ALL'));
      }

      if (currentWeekName === true) {
        setIsCheckedNumerator(false);
        setIsCheckedDenominator(true);
      } else {
        setIsCheckedNumerator(true);
        setIsCheckedDenominator(false);
      }
      setIsFirstRender(false);
    } else {
      if (currentWeekName === true) {
        setIsCheckedNumerator(false);
        setIsCheckedDenominator(true);
      } else {
        setIsCheckedNumerator(true);
        setIsCheckedDenominator(false);
      }
    }
  }, [currentWeekName]);

  const handleTypeScheduleChange = (selectedOption) => {
    setSelectedScheduleType(matchScheduleType(selectedOption.value));
    dispatch(setScheduleType(selectedOption.value));
  };

  const handleWeekDayChange = (selectedOption) => {
    setCurrentWeekDay(matchDayOfWeek2(selectedOption.value));
    dispatch(setWeekDay(selectedOption.value));
  };

  const handleWeekNumberChange = (selectedOption) => {
    setSelectedWeekNumber(selectedOption.value);
    dispatch(setWeekNumber(selectedOption.value));

    if (selectedOption.value === 'все') {
      setIsCheckedNumerator(false);
      setIsCheckedDenominator(false);
    }

    // if (selectedOption.value === 1 || selectedOption.value === 3) {
    //   setWeekName(false);
    //   setIsCheckedNumerator(true);
    //   setIsCheckedDenominator(false);
    // } else {
    //   setWeekName(true);
    //   setIsCheckedNumerator(false);
    //   setIsCheckedDenominator(true);
    // }
  };

  const handleCheckboxNumerator = () => {
    setIsCheckedNumerator(true);
    setIsCheckedDenominator(false);
    dispatch(setWeekName(false));
  }

  const handleCheckboxDenominator = () => {
    setIsCheckedNumerator(false);
    setIsCheckedDenominator(true);
    dispatch(setWeekName(true));
  }

  return (
    <div className="schedule-selectors-container">
      <CustomSelect
        options={typeOptions}
        value={{value: selectedScheduleType, label: selectedScheduleType}}
        onChange={handleTypeScheduleChange}
        label="Выберите тип расписания"
      />
      <CustomSelect
        options={dayOptions}
        value={{value: currentWeekDay, label: currentWeekDay}}
        onChange={handleWeekDayChange}
        label="Выберите день недели"
        isDisabled={scheduleType === 'session-schedule'}
      />
      <CustomSelect
        options={weekNumberOptions}
        value={{value: selectedWeekNumber, label: selectedWeekNumber}}
        onChange={handleWeekNumberChange}
        label="Выберите неделю"
        isDisabled={currentWeekDay === 'Все дни' || scheduleType === 'session-schedule'}
      />
      <div className="checkbox-container">
        <label className="checkbox-label_1">
          Числитель/
        </label>
        <input
          className="schedule-checkbox"
          type="checkbox"
          checked={isCheckedNumerator}
          onChange={handleCheckboxNumerator}
          disabled={selectedWeekNumber === 'все' || currentWeekDay === 'Все дни' || scheduleType === 'session-schedule'}
        />
        <label className="checkbox-label_2">
          Знаменатель
        </label>
        <input
          className="schedule-checkbox"
          type="checkbox"
          checked={isCheckedDenominator}
          onChange={handleCheckboxDenominator}
          disabled={selectedWeekNumber === 'все' || currentWeekDay === 'Все дни' || scheduleType === 'session-schedule'}
        />
      </div>
    </div>
  );
};
