export default function Tags({
  post: { tags },
  selectedTags,
  clearAllFilters,
  updateSelectedTags,
}) {
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
            }}
          >
            {tag}
          </button>
          {tags.indexOf(tag) !== tags.length - 1 ? <span>,&nbsp;</span> : null}
        </span>
      ))}
      <span>&nbsp;&#93;</span>
    </div>
  );
}
