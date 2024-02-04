const paginateData = (totalRecords, currentPage, pageSize, data) => {
  const totalPages = Math.ceil(totalRecords / +pageSize);
  return { data, page: +currentPage, totalPages };
};

export default paginateData;
