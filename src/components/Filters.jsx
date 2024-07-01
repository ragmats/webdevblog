export default function Filters({
  postData,
  selectedTypes,
  selectedTags,
  updateSelectedTypes,
  updateSelectedTags,
  clearAllTags,
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
            onClick={() => updateSelectedTags(tag)}
          >
            {tag}
          </button>
        ))}
        {filteredPostLen !== postData.length ? (
          <button onClick={() => clearAllTags()}>// reset filters //</button>
        ) : null}
      </div>
    </div>
  );
}
