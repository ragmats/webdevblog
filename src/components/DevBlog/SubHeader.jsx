import { formatDate } from "../../utils/formatDate";

export default function SubHeader({
  post: { date, type },
  selectedTypes,
  clearAllFilters,
  updateSelectedTypes,
}) {
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
          }}
        >
          {type}
        </button>
      </span>
    </div>
  );
}
