import React from "react";

function Pagination({
  page,
  maxPage,
  editPage,
}: {
  page: number;
  maxPage: number;
  editPage: (value: number) => Promise<void>;
}) {
  function handleFirstPageClick() {
    editPage(1);
  }

  function handlePreviousPageClick() {
    editPage(page - 1);
  }

  function handleNextPageClick() {
    editPage(page + 1);
  }

  function handleLastPageClick() {
    editPage(maxPage);
  }

  if (maxPage <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center text-lg">
      {page !== 1 && (
        <>
          <button className="mr-1" onClick={handleFirstPageClick}>
            1
          </button>
          <button className="mr-1" onClick={handlePreviousPageClick}>
            {"<"}
          </button>
        </>
      )}
      <button onClick={() => editPage(page)}>{page}</button>
      {page !== maxPage && (
        <>
          <button className="ml-1" onClick={handleNextPageClick}>
            {">"}
          </button>
          <button className="ml-1" onClick={handleLastPageClick}>
            {maxPage}
          </button>
        </>
      )}
    </div>
  );
}

export default Pagination;
