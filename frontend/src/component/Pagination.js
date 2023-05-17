import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          <a className="page-link" href="#">
            {number}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
