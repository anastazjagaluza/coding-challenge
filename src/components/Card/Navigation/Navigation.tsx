import React, { useState } from "react";
import { ILimit, INavigation } from "../../../types";
import "./Navigation.css";

function Navigation({isFirstPage, isLastPage, handleOffset, handleLimit, currentLimit, handleSortBy, handleSearch }: INavigation) {
  const [searchValue, setSearchValue] = useState<string>();
  const [searchCategory, setSearchCategory] = useState<"name" | "abilities">();

  const limits: ILimit[] = [10, 20, 50];
  const sortables = ["Name", "Height", "Weight"];
  
  const dispatchNewLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    handleLimit(target.value);
    window.history.pushState({}, "", `/?limit=${target.value}`)
  }

  const dispatchNewSortable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    if (handleSortBy != null) {
      handleSortBy(target.value);
    }
  }
  
  const dispatchSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setSearchValue(target.value);
  }
  
  const dispatchSearchCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    if (target.value === "name" || target.value === "abilities") {
      setSearchCategory(target.value);
    }
  }

  const initiateSearch = (e: React.FormEvent) => {
    if (searchValue != null && searchCategory != null) {
      e.preventDefault();
      handleSearch({searchValue, searchCategory});
    }
  }

  return (
        <div className="container-navigation">
          <div className="container-sorting">

        {currentLimit != null && (
          <>
        <span>Show </span>
        <select defaultValue={currentLimit} onChange={(e) => dispatchNewLimit(e)}>
          {limits.map(limit => <option key={limit} value={limit}>{limit}</option>)}
        </select>
        <span> on each page</span>
        </>
        )}
        {handleSortBy != null && (
          <>
        <span>Sort by</span>
        <select onChange={(e) => dispatchNewSortable(e)}>
          {sortables.map(sortable => <option key={sortable} value={sortable}>{sortable.replace("-", " ")}</option>)}
        </select>
        </>
        )}
        </div>
        <div className="container-links">
          <button disabled={isFirstPage} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Previous</button>
          <button disabled={isLastPage} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Next</button>
        </div>  
        <div className="container-search">
          <form onSubmit={(e: React.FormEvent) => initiateSearch(e)}>
            <span>Search </span>
            <input onChange={(e) => dispatchSearchValue(e)} required type="text"></input>
            <span>in</span>
            <select defaultValue="default" onChange={(e) => dispatchSearchCategory(e)} required>
              <option value="default" disabled>Please choose</option>
              <option value="name">Name</option>
              <option value="abilities">Abilities</option>
            </select>
            <button type="submit">Search</button>
          </form>
        </div>

      </div>
    )
}

export default Navigation;