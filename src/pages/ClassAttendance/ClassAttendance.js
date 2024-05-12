import React, {useState} from 'react';
import {useSelector} from "react-redux";

import {Spinner} from '../../components/Spinner';
import {ErrorMessage} from '../../components/Error/ErrorMessage';
import {Pagination} from '../../components/Pagination';

import {tableHeaderAttendances} from '../../assets/utils/arrays';
import {compareTypes, reverseDateForTable, shortenName} from '../../assets/utils/functions';

import './style.css';
import {useMediaQuery} from "react-responsive";

export const ClassAttendance = () => {
  const {attendanceStatus, attendances, attendanceError} = useSelector((state) => state.attendances);
  const isMobile = useMediaQuery({maxWidth: 520});
  console.log(attendances);

  const numberOfRecords = isMobile ? 5 : 10;
  const [currentPage, setCurrentPage] = useState(1);

  const lastRecordIndex = currentPage * numberOfRecords;
  const firstRecordIndex = lastRecordIndex - numberOfRecords;
  const currentRecords = attendances.slice(firstRecordIndex, lastRecordIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {attendanceStatus === 'loading' && <Spinner type="points" text="Идёт загрузка"/>}
      {attendanceError && <ErrorMessage error={attendanceError}/>}
      {attendanceStatus !== 'loading' && !attendanceError && (
        <>
          {
            attendances.length === 0 ?
              <div className="no-attendance">
                Нет сведений по посещаемости
              </div> :
              (
                <>
                  <h4 className="attendance-title">Посещаемость</h4>
                  <div className="schedule-table-block">
                    <table className="schedule-table">
                      <thead className="table-header">
                      <tr className="table-header_row">
                        {tableHeaderAttendances.map((name, index) => (
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
                          <td className="table-body_row_item">{compareTypes(item.typeClass)}</td>
                          <td className="table-body_row_item">{item.discipline}</td>
                          <td className="table-body_row_item lesson_number">{item.classTopic}</td>
                          <td className="table-body_row_item">{shortenName(item.teacherFIO)}</td>
                          <td className="table-body_row_item">{reverseDateForTable(item.dateOfLesson)}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mobile-attendance">
                    {currentRecords.map((item, index) => (
                      <div key={index} className="cart-item">
                        <h3 className="cart-item-header">{item.discipline}</h3>
                        <div className="cart-item-row">
                          <span className="cart-span">Тип занятия:</span>
                          {compareTypes(item.typeClass)}
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
                    totalRecords={attendances.length}
                    onPageChange={handlePageChange}
                  />
                </>
              )
          }
        </>
      )}
    </>
  );
};
