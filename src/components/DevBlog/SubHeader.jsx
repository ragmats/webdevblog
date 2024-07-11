import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

export default function SubHeader({
  post: { date, type },
  selectedTypes,
  clearAllFilters,
  updateSelectedTypes,
}) {
  const navigate = useNavigate();

  return (
    <div className="dev-blog-sub-header">
      {formatDate(date)}
      <span>
        <span>// </span>
        <button
          className={
            selectedTypes.has(type) ? "btn-type btn-type-selected" : "btn-type"
          }
          onClick={() => {
            clearAllFilters();
            updateSelectedTypes(type);
            navigate("/");
          }}
        >
          {type}
        </button>
      </span>
    </div>
  );
}
