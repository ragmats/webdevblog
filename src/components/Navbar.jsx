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
      <span className="nav">
        <span>
          &#91;&nbsp;
          <a onClick={() => navigate("/")} href="#profile">
            profile
          </a>
          ,&nbsp;
        </span>
        <span>
          <a onClick={() => navigate("/")} href="#filters">
            filters
          </a>
          ,&nbsp;
        </span>
        <span>
          <a onClick={() => navigate("/")} href="#devblog">
            blog
          </a>
          ,&nbsp;
        </span>
        <div>
          <button
            className="btn"
            onClick={() => {
              clearAllFilters();
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            home
          </button>
          <span>&nbsp;&#93;</span>
        </div>
      </span>
    </div>
  );
}
