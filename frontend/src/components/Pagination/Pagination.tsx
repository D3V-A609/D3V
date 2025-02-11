// components/Pagination/Pagination.tsx
import './Pagination.css'

interface PaginationProps {
  currentPage: number;         // 현재 페이지 (0-based)
  totalPages: number;          // 전체 페이지 수
  first: boolean;             // 첫 페이지 여부
  last: boolean;              // 마지막 페이지 여부
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  first,
  last,
  onPageChange,
}) => {
  // 페이지네이션 번호 생성 로직
  const getPageNumbers = () => {
    const pageNumbers = [];
    const currentGroup = Math.ceil((currentPage + 1) / 5);
    const lastGroup = Math.ceil(totalPages / 5);
    const start = (currentGroup - 1) * 5;
    const end = Math.min(currentGroup * 5 - 1, totalPages - 1);

    // 첫 번째 그룹인 경우
    if (currentGroup === 1) {
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 5) {
        pageNumbers.push('...');
        pageNumbers.push(totalPages - 1);
      }
    } 
    // 마지막 그룹인 경우
    else if (currentGroup === lastGroup) {
      pageNumbers.push(0);
      pageNumbers.push('...');
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    } 
    // 중간 그룹인 경우
    else {
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
        onClick={() => onPageChange(currentPage - 1)}
        disabled={first}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={last}
        className="arrow-button"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;