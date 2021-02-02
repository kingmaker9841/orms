import React from "react";
import PropTypes from 'prop-types'
import { Button } from "reactstrap";
import _ from "lodash";

const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  onPreviousChange,
  onNextChange,
  currentPage,
  className
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav className={className ? className : ''}>
      <ul className="pagination">
        <li className="page-item">
          <Button
            className="page-link mr-1 my-1"
            onClick={onPreviousChange}
            id="previous-state"
            disabled={currentPage === 1}>
            Previous
          </Button>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}>
            <Button
              className="page-link ml-1 my-1"
              onClick={() => onPageChange(page)}>
              {page}
            </Button>
          </li>
        ))}
        <li className="page-item">
          <Button
            className="page-link ml-2 my-1"
            onClick={onNextChange}
            disabled={currentPage === pageCount || currentPage >= pageCount}>
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
};
Pagination.propTypes={
  itemsCount:PropTypes.number.isRequired,
  pageSize:PropTypes.number.isRequired,
  currentPage:PropTypes.number.isRequired,
  onPageChange:PropTypes.func.isRequired,
  onPreviousChange:PropTypes.func.isRequired,
  onNextChange:PropTypes.func.isRequired,

}

export default Pagination;
