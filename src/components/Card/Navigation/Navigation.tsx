import React from "react";
import { ILimit, INavigation } from "../../../types";
import "./Navigation.css";

function Navigation({isFirstPage, isLastPage, handleOffset, handleLimit, currentLimit, handleSortBy }: INavigation) {
  const limits: ILimit[] = [10, 20, 50];
  const sortables = ["Name", "Height", "Weight"];
  
  const dispatchNewLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    handleLimit(target.value);
  }

  const dispatchNewSortable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    if (handleSortBy != null) {
      handleSortBy(target.value);
    }
  }

  return (
        <div className="container-links">
        <button disabled={isFirstPage} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Previous</button>
        {currentLimit != null && (
          <>
        <span>Show </span>
        <select id="select-limits" onChange={(e) => dispatchNewLimit(e)}>
          {limits.map(limit => <option key={limit} defaultValue={currentLimit} value={limit}>{limit}</option>)}
        </select>
        <span> on each page</span>
        </>
        )}
        {handleSortBy != null && (
          <>
        <span>Sort by</span>
        <select id="select-limits" onChange={(e) => dispatchNewSortable(e)}>
          {sortables.map(sortable => <option key={sortable} value={sortable}>{sortable.replace("-", " ")}</option>)}
        </select>
        </>
        )}
        <button disabled={isLastPage} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Next</button>
      </div>
    )
}

export default Navigation;