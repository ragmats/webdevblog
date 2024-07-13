import { useLocation, useNavigate } from "react-router-dom";

export default function Tags({
  post: { tags },
  selectedTags,
  clearAllFilters,
  updateSelectedTags,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dev-blog-tags">
      <span>&#91;&nbsp;</span>
      {tags.sort().map((tag) => (
        <span key={crypto.randomUUID()}>
          <button
            className={
              selectedTags.has(tag) ? "btn-tag btn-tag-selected" : "btn-tag"
            }
            onClick={() => {
              clearAllFilters();
              updateSelectedTags(tag);
              navigate("/", { state: { scrollTarget: "devblog" } });
            }}
          >
            {tag}
          </button>
          {tags.indexOf(tag) !== tags.length - 1 ? (
            <span>,&nbsp;</span>
          ) : (
            <span>&nbsp;&#93;</span>
          )}
        </span>
      ))}
    </div>
  );
}
