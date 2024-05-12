import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from 'react-responsive';

import {Pagination} from '../../../components/Pagination';

import {tableHeaderGrades} from '../../../assets/utils/arrays';
import { reverseDateForTable, shortenName} from '../../../assets/utils/functions';

export const StatisticTable = () => {
  const allGrades = useSelector((state) => state.grades.grades);
  const isMobile = useMediaQuery({maxWidth: 520});

  const numberOfRecords = isMobile ? 5 : 10;
  const [currentPage, setCurrentPage] = useState(1);

  const lastRecordIndex = currentPage * numberOfRecords;
  const firstRecordIndex = lastRecordIndex - numberOfRecords;
  const currentRecords = allGrades.slice(firstRecordIndex, lastRecordIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="schedule-table-block">
        <table className="schedule-table">
          <thead className="table-header">
          <tr className="table-header_row">
            {tableHeaderGrades.map((name, index) => (
              <th className="table-header_item" key={index}>
                {name}
              </th>
            ))
            }
          </tr>
          </thead>
          <tbody>
          {currentRecords.map((item, index) => (
            <tr key={index} className="table-body_row_item">
              <td className="table-body_row_item">{item.classTopic}</td>
              <td className="table-body_row_item">{item.discipline}</td>
              <td className="table-body_row_item lesson_number">{item.grade}</td>
              <td className="table-body_row_item">{shortenName(item.teacherFIO)}</td>
              <td className="table-body_row_item">{reverseDateForTable(item.dateOfLesson)}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="mobile-statistic">
        {currentRecords.map((item, index) => (
          <div key={index} className="cart-item">
            <h3 className="cart-item-header">{item.discipline}</h3>
            <div className="cart-item-row">
              <span className="cart-span">Оценка:</span>
              {item.grade}
            </div>
            <div className="cart-item-row">
              <span className="cart-span">Тема занятия:</span>
              {item.classTopic === null ? '-' : item.classTopic}
            </div>
            <div className="cart-item-row">
              <span className="cart-span">ФИО преподавателя:</span>
              {shortenName(item.teacherFIO)}
            </div>
            <div className="cart-item-row">
              <span className="cart-span">Дата:</span>
              {reverseDateForTable(item.dateOfLesson)}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        numberOfRecords={numberOfRecords}
        totalRecords={allGrades.length}
        onPageChange={handlePageChange}
      />
    </>
  );
};
