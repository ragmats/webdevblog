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
          <button
            className="btn"
            onClick={() =>
              navigate("/", { state: { scrollTarget: "profile" } })
            }
          >
            profile
          </button>
          ,&nbsp;
        </span>
        <span>
          <button
            className="btn"
            onClick={() =>
              navigate("/", { state: { scrollTarget: "filters" } })
            }
          >
            filters
          </button>
          ,&nbsp;
        </span>
        <span>
          <button
            className="btn"
            onClick={() =>
              navigate("/", { state: { scrollTarget: "projects" } })
            }
          >
            projects
          </button>
          ,&nbsp;
        </span>

        <span>
          <button
            className="btn"
            onClick={() =>
              navigate("/", { state: { scrollTarget: "devblog" } })
            }
          >
            blog
          </button>
          ,&nbsp;
        </span>
        <div>
          <button
            className="btn"
            onClick={() => {
              clearAllFilters();
              navigate("/", { state: { scrollTarget: "top" } });
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
