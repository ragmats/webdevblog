import { useLocation, useNavigate } from "react-router-dom";
import ResetFiltersButton from "./ResetFiltersButton";

export default function Navbar({ clearAllFilters, isFiltered }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className={
        isFiltered && location.pathname === "/"
          ? "nav-container space-between"
          : "nav-container"
      }
    >
      <ResetFiltersButton
        clearAllFilters={clearAllFilters}
        isFiltered={isFiltered}
      />
      <div className="nav">
        <span>&#91;&nbsp;</span>
        <a onClick={() => navigate("/")} href="#profile">
          profile
        </a>
        ,&nbsp;
        <a onClick={() => navigate("/")} href="#filters">
          filters
        </a>
        ,&nbsp;
        <a onClick={() => navigate("/")} href="#devblog">
          blog
        </a>
        ,&nbsp;
        <button
          className="btn"
          onClick={() => {
            clearAllFilters();
            navigate("/");
          }}
        >
          home
        </button>
        <span>&nbsp;&#93;</span>
      </div>
    </div>
  );
}
