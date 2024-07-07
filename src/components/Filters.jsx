import { useNavigate } from "react-router-dom";

export default function Filters({
  postData,
  selectedTypes,
  selectedTags,
  updateSelectedTypes,
  updateSelectedTags,
  clearAllFilters,
  filteredPostLen,
}) {
  // Create sorted array of all post types without duplicates
  const postTypesSet = new Set();
  postData.map((post) => postTypesSet.add(post.type));
  const allPostTypes = Array.from(postTypesSet).sort();

  // Create sorted array of all post tags without duplicates
  const postTagsSet = new Set();
  postData.map((post) => post.tags.map((tag) => postTagsSet.add(tag)));
  const allPostTags = Array.from(postTagsSet).sort();

  const navigate = useNavigate();

  return (
    <div className="filters-container">
      <div>
        Post Types:
        {allPostTypes.map((type) => (
          <button
            className={
              selectedTypes.has(type) ? "btn-tag btn-tag-selected" : "btn-tag"
            }
            key={crypto.randomUUID()}
            onClick={() => {
              updateSelectedTypes(type);
              navigate("/");
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div>
        Tags:
        {allPostTags.map((tag) => (
          <button
            className={
              selectedTags.has(tag) ? "btn-tag btn-tag-selected" : "btn-tag"
            }
            key={crypto.randomUUID()}
            onClick={() => {
              updateSelectedTags(tag);
              navigate("/");
            }}
          >
            {tag}
          </button>
        ))}
        {filteredPostLen !== postData.length && location.pathname === "/" ? (
          <button onClick={() => clearAllFilters()}>// reset filters //</button>
        ) : null}
      </div>
    </div>
  );
}
