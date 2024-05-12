import React, {useState} from 'react';

import './style.css';

export const Pagination = ({ currentPage, numberOfRecords, totalRecords, onPageChange }) => {
  const totalPages = Math.ceil(totalRecords / numberOfRecords);

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
    window.scrollTo(0,0);
  };

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button className="pagination-button" key={i} onClick={() => handlePageChange(i)} disabled={currentPage === i}>
        {i}
      </button>
    );
  }

  return (
    <div className="pagination-block">
      <button className="pagination-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        &#8592;
      </button>
      {pageButtons}
      <button className="pagination-button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        &#8594;
      </button>
    </div>
  );
};
