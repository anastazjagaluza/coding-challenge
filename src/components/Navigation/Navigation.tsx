import React, { useState } from "react";
import { sortables } from "../../util/constants";
import { ILimit, INavigation } from "../../util/types";
import "./Navigation.css";

function Navigation({isFirstPage, isLastPage, handleOffset, handleLimit, currentLimit, handleSortBy, handleSearch }: INavigation) {
  const [searchValue, setSearchValue] = useState<string>();
  const [searchCategory, setSearchCategory] = useState<"name" | "abilities">();

  const limits: ILimit[] = [10, 20, 50];
  
  const dispatchNewLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    handleLimit(target.value);
    window.history.pushState({}, "", `/?limit=${target.value}`)
    window.history.go();
  }

  const dispatchNewSortable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    if (handleSortBy != null) {
      handleSortBy(target.value);
      window.history.pushState({}, "", `/?sortBy=${target.value}`)
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
      window.history.pushState({}, "", `/?search=${searchValue}&category=${searchCategory}`);
      window.history.go(1);
    }
  }

  return (
        <div className="container-navigation">
          <div className="container-limits">
            {currentLimit != null && (
              <>
            <span>Show </span>
            <select defaultValue="default" onChange={(e) => dispatchNewLimit(e)}>
              <option value="default" disabled>Choose a limit</option>
              {limits.map(limit => <option key={limit} value={limit}>{limit}</option>)}
            </select>
            <span> on each page</span>
            </>
            )}
          </div>
          <div className="container-sorting">
            {handleSortBy != null && (
              <>
            <span>Sort by</span>
            <select defaultValue="default" onChange={(e) => dispatchNewSortable(e)}>
              <option value="default">Choose a category</option>
              {sortables.map(sortable => <option key={sortable} value={sortable}>{sortable.replace("-", " ")}</option>)}
            </select>
            </>
            )}
          </div>
        <div className="container-search">
          <form onSubmit={(e: React.FormEvent) => initiateSearch(e)}>
            <span>Search </span>
            <input onChange={(e) => dispatchSearchValue(e)} required type="text"></input>
            <span>in</span>
            <select defaultValue="default" onChange={(e) => dispatchSearchCategory(e)} required>
              <option value="default" disabled>Choose a category</option>
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