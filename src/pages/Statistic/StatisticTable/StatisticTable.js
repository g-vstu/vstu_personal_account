import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {tableHeaderGrades} from '../../../assets/utils/arrays';
import {reverseDateForTable, shortenName} from '../../../assets/utils/functions';

export const StatisticTable = () => {
  const allGrades = useSelector((state) => state.grades.grades);

  const numberOfRecords = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const lastRecordIndex = currentPage * numberOfRecords;
  const firstRecordIndex = lastRecordIndex - numberOfRecords;
  const currentRecords = allGrades.slice(firstRecordIndex, lastRecordIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  const pageButtons = [];
  for (let i = 1; i <= Math.ceil(allGrades.length / numberOfRecords); i++) {
    pageButtons.push(
      <button key={i} onClick={() => setCurrentPage(i)} disabled={currentPage === i}>
        {i}
      </button>
    );
  }

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
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          пред
        </button>
        {pageButtons}
        <button onClick={nextPage} disabled={lastRecordIndex >= allGrades.length}>
          след
        </button>
      </div>
    </>
  );
};
