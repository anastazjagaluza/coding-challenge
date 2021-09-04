import React from "react";
import { ILimit, INavigation } from "../../../types";
import "./Navigation.css";

function Navigation({isFirstPage, isLastPage, handleOffset, currentLimit, handleLimit}: INavigation) {
  const limits: ILimit[] = [10, 20, 50];
  
  const dispatchNewLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    handleLimit(target.value);
  }

  return (
        <div className="container-links">
        <button disabled={isFirstPage} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Previous</button>
        <select onChange={(e) => dispatchNewLimit(e)}>
          {limits.map(limit => <option key={limit} defaultValue={currentLimit} value={limit}>{limit}</option>)}
        </select>
        <button disabled={isLastPage} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Next</button>
      </div>
    )
}

export default Navigation;