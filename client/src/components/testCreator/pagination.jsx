import React, { useEffect, useState } from "react";
import { ButtonChange, ButtonPagContainer, ChangePageContainer, PaginationContainer, PaginationCounter, RowsPage } from "../../styles/pages/testCreator";

const Pagination = ({ cant, rows, page, setPage }) => {
  const pagination = cant != 0 ? page : 0;
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    //RECALCULAR PAGINA
    const newPages = Math.ceil(cant / rows);
    setPages(newPages);
    if(page > newPages) setPage(newPages);
    if(page < 1 && cant != 0) setPage(1);
  }, [cant, rows]);

  useEffect(() => {
    //RECALCULAR VARIABLES
    setFrom(((page - 1) * rows) + 1);
    setTo(page * rows);
  }, [cant, page])

  return (
    <PaginationContainer>
      <PaginationCounter>
        {cant ? from : cant}-{to > cant ? cant : to} de {cant}
      </PaginationCounter>
      <ChangePageContainer>
        <RowsPage>Filas por pagina: {rows}</RowsPage>
        <ButtonPagContainer>
          <ButtonChange onClick={() => pagination != 0 && pagination != 1 && setPage(page - 1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </ButtonChange>
          <RowsPage>{pagination}/{pages}</RowsPage>
          <ButtonChange 
            onClick={() => pagination != pages && setPage(page + 1)}>
            <i className="fa-solid fa-arrow-right"></i>
          </ButtonChange>
        </ButtonPagContainer>
      </ChangePageContainer>
    </PaginationContainer>
  )
}

export default Pagination;