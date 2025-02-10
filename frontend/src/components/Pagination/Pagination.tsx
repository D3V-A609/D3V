// components/Pagination/Pagination.tsx
import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const currentGroup = Math.ceil((currentPage + 1) / 5);
    const lastGroup = Math.ceil(totalPages / 5);
    const start = (currentGroup - 1) * 5;
    const end = Math.min(currentGroup * 5 - 1, totalPages - 1);

    if (currentGroup === 1) {
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 5) {
        pageNumbers.push('...');
        pageNumbers.push(totalPages - 1);
      }
    } else if (currentGroup === lastGroup) {
      pageNumbers.push(0);
      pageNumbers.push('...');
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(0);
      pageNumbers.push('...');
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages - 1);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 0}
        className="arrow-button"
      >
        &lt;
      </button>
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="ellipsis">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={currentPage === page ? "active" : ""}
          >
            {Number(page) + 1}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={currentPage === totalPages - 1}
        className="arrow-button"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
