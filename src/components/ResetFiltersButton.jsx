import { useLocation } from "react-router-dom";

export default function ResetFiltersButton({ clearAllFilters, isFiltered }) {
  const location = useLocation();

  return (
    <>
      {isFiltered && location.pathname === "/" ? (
        <button
          onClick={() => clearAllFilters()}
          className="btn btn-reset-filters"
        >
          reset filters
        </button>
      ) : null}
    </>
  );
}
