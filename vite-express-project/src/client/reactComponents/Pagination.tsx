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
  if (maxPage !== 1 && maxPage !== 0) {
    return (
      <div className="flex items-center justify-center">
        {page !== 1 && (
          <>
            <button className="mr-1" onClick={() => editPage(1)}>
              1
            </button>
            <button className="mr-1" onClick={() => editPage(page - 1)}>
              {"<"}
            </button>
          </>
        )}
        <button onClick={() => editPage(page)}>{page}</button>
        {page !== maxPage && (
          <>
            <button className="ml-1" onClick={() => editPage(page + 1)}>
              {">"}
            </button>
            <button className="ml-1" onClick={() => editPage(maxPage)}>
              {maxPage}
            </button>
          </>
        )}
      </div>
    );
  }
}

export default Pagination;
