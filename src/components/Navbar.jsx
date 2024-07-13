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
            onClick={() => {
              navigate("/");
              document.getElementById("profile").scrollIntoView();
            }}
          >
            profile
          </button>
          ,&nbsp;
        </span>
        <span>
          <button
            className="btn"
            onClick={() => {
              navigate("/");
              document.getElementById("filters").scrollIntoView();
            }}
          >
            filters
          </button>
          ,&nbsp;
        </span>
        <span>
          <button
            className="btn"
            onClick={() => {
              navigate("/");
              document.getElementById("projects").scrollIntoView();
            }}
          >
            projects
          </button>
          ,&nbsp;
        </span>

        <span>
          <button
            className="btn"
            onClick={() => {
              navigate("/");
              document.getElementById("devblog").scrollIntoView();
            }}
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
