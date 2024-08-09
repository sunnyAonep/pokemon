export const handleNextPage = (
  currentPage: number,
  setCurrentPage: (page: number) => void,
  handlePageChange: (page: number) => void,
  count: number
) => {
  const nextPage = currentPage + 1;
  if (nextPage <= Math.ceil(count / 20)) {
    setCurrentPage(nextPage);
    handlePageChange(nextPage);
  }
};

export const handlePreviousPage = (
  currentPage: number,
  setCurrentPage: (page: number) => void,
  handlePageChange: (page: number) => void
) => {
  if (currentPage > 1) {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    handlePageChange(prevPage);
  }
};
