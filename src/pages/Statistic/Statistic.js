import React from 'react';
import {useSelector} from 'react-redux';

import {Spinner} from '../../components/Spinner';
import {ErrorMessage} from '../../components/Error/ErrorMessage';

import bookImage from '../../assets/images/book-img.svg';
import './style.css';
import {StatisticTable} from "./StatisticTable";

export const Statistic = () => {
  const {
    gradesStatus,
    averageGradeStatus,
    semestrAverageGradeStatus,
    gradesError,
    averageGradeError,
    semestrAverageGradeError
  } = useSelector((state) => state.schedule);

  const averageGrade = useSelector((state) => state.grades.averageGrade);
  const semestrAverageGrade = useSelector((state) => state.grades.semestrAverageGrade);

  return (
    <>
      {gradesStatus === 'loading' || averageGradeStatus === 'loading' || semestrAverageGradeStatus === 'loading' &&
        <Spinner type="points" text="Идёт загрузка"/>}
      {
        gradesError && <ErrorMessage error={gradesError}/>
        || averageGradeError && <ErrorMessage error={averageGradeError}/>
        || semestrAverageGradeError && <ErrorMessage error={semestrAverageGradeError}/>
      }
      {
        gradesStatus !== 'loading' && !gradesError &&
        averageGradeStatus !== 'loading' && !averageGradeError &&
        semestrAverageGradeStatus !== 'loading' && !semestrAverageGradeError && (
          <>
            <div className="statistic-blocks">
              <div className="statistic-block">
                <div>
                  <h3 className="grade">{averageGrade}</h3>
                  <div className="grade-description">Общий средний балл</div>
                </div>
                <div>
                  <img src={bookImage} alt="Book icon"/>
                </div>
              </div>
              <div className="statistic-block">
                <div>
                  <h3 className="grade">{semestrAverageGrade}</h3>
                  <div className="grade-description">Cредний балл за семестр</div>
                </div>
                <div>
                  <img src={bookImage} alt="Book icon"/>
                </div>
              </div>
            </div>
            <StatisticTable />
          </>
        )}
    </>
  );
};
