import "./NavigationLinks.css";

function NavigationLinks({isFirstPage, isLastPage, handleOffset}: {isFirstPage: boolean, isLastPage: boolean, handleOffset: Function}) {
    return (
        <div className="container-links">
        <button disabled={isFirstPage} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Previous</button>
        <button disabled={isLastPage} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Next</button>
      </div>
    )
}

export default NavigationLinks;