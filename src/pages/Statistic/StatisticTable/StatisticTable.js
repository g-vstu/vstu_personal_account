import React from 'react';
import {useSelector} from 'react-redux';

import {tableHeaderGrades} from '../../../assets/utils/arrays';
import {reverseDateForTable} from '../../../assets/utils/functions';

export const StatisticTable = () => {
  const allGrades = useSelector((state) => state.grades.grades);

  return (
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
        {allGrades.map((item) => (
          <tr key={item.id} className="table-body_row_item">
            <td className="table-body_row_item">-</td>
            <td className="table-body_row_item">{item.discipline}</td>
            <td className="table-body_row_item lesson_number">{item.grade}</td>
            <td className="table-body_row_item">-</td>
            <td className="table-body_row_item">{reverseDateForTable(item.dateOfLesson)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
