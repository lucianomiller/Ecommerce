import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";

const PaginationC = ({ pagination, onPaginationChange }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [pagination]);

  if (!Array.isArray(pagination) || !pagination.length) return null;

  const handleChange = (event, value) => {
    setPage(value);
    page !== value && onPaginationChange && onPaginationChange(value);
  };

  return (
    <Pagination
      count={pagination.length}
      page={page}
      onChange={handleChange}
      style={{ alignSelf: "flex-end" }}
      showFirstButton
      showLastButton
    />
  );
};

export default PaginationC;
