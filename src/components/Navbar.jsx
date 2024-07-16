import { useLocation, useNavigate } from "react-router-dom";
import ResetFiltersButton from "./ResetFiltersButton";

export default function Navbar({
  theme,
  setTheme,
  clearAllFilters,
  isFiltered,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  function toggleTheme() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("light");
  }

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
        <div className="theme-circle-container">
          <button
            className="theme-circle"
            onClick={() => toggleTheme()}
          ></button>
        </div>
      </span>
    </div>
  );
}
