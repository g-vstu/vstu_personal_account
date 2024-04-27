import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {CustomSelect} from '../../components/CustomSelect';

import {
  compareTypes,
  getCurrentMonth,
  getCurrentYear,
  matchMonths,
  matchMonths2,
  reverseDateForTable
} from '../../assets/utils/functions';
import {setMonth, setYear} from '../../store/absencesSlice';

import './style.css';
import smile from "../../assets/images/smile.svg";

const monthOptions = [
  {value: 'January', label: 'Янаварь'},
  {value: 'February', label: 'Февраль'},
  {value: 'March', label: 'Март'},
  {value: 'April', label: 'Апрель'},
  {value: 'May', label: 'Май'},
  {value: 'June', label: 'Июнь'},
  {value: 'July', label: 'Июль'},
  {value: 'August', label: 'Август'},
  {value: 'September', label: 'Сентябрь'},
  {value: 'October', label: 'Октябрь'},
  {value: 'November', label: 'Ноябрь'},
  {value: 'December', label: 'Декабрь'},
];

export const Debts = () => {
  const absences = useSelector((state) => state.absences.absences);
  const month = useSelector((state) => state.absences.month);
  // console.log(absences);
  // console.log(month);

  const [selectedMonth, setSelectedMonth] = useState(matchMonths(getCurrentMonth()));
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [filteredDebts, setFilteredDebts] = useState(null);

  const dispatch = useDispatch();

  useEffect(()=>{
    const data=filterDebts(absences,selectedMonth,selectedYear);
console.log('data',data)
    setFilteredDebts(data);
  },[absences,selectedMonth,selectedYear]);

  const filterDebts=(array,month,year)=>{
    console.log(array);
    console.log(matchMonths2(month).toUpperCase());
    console.log(year);
    const foundItem = array.find(item => item.month === matchMonths2(month).toUpperCase() && item.year === year);
    return foundItem ? foundItem.absencesDTOS : [];
  }

  const yearOptions = [...new Set(absences.map(item => item.year))].map(year => ({
    value: year,
    label: year.toString()
  }));

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(matchMonths(selectedOption.value));
    dispatch(setMonth(selectedOption.value));
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear((selectedOption.value));
    dispatch(setYear(selectedOption.value));
  };

  return (
    <div>
      <div className="attendance-selectors">
        <CustomSelect
          options={monthOptions}
          value={{value: selectedMonth, label: selectedMonth}}
          onChange={handleMonthChange}
          label="Выберите месяц"
        />
        <CustomSelect
          options={yearOptions}
          value={{value: selectedYear, label: selectedYear}}
          onChange={handleYearChange}
          label="Выберите год"
        />
      </div>
      <div>
        <div>
          { filteredDebts === null || filteredDebts.length === 0 ? (
            <div className="no-debts">
              <h2 className="no-debts-title">Долгов нет</h2>
              <img src={smile} alt="Smile"/>
            </div>
          ) : (
            <div className="debts-container">
              {filteredDebts.map((item, index) => (
                <div key={index} className="debt-item">
                  <h3 className="debt-item-header">{item.discipline}</h3>
                  <div className="debt-item-row">
                    <span className="debt-span">Пропущено часов:</span>
                    {item.absenceTime}
                  </div>
                  <div className="debt-item-row">
                    <span className="debt-span">Дата пропуска:</span>
                    {reverseDateForTable(item.date)}
                  </div>
                  <div className="debt-item-row">
                    <span className="debt-span">Тип занятия:</span>
                    {compareTypes(item.lessonType)}
                  </div>
                  <div className="debt-item-row">
                    <span className="debt-span">Причина пропуска:</span>
                    {item.reasonMsg}
                  </div>
                  <div className="debt-item-row">
                    <span className="debt-span">ФИО преподавателя:</span>
                    {item.teacher}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
