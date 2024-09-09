import { useNavigate } from "react-router-dom";
import SectionHeader from "./SectionHeader";

export default function Filters({
  postData,
  selectedTypes,
  selectedTags,
  updateSelectedTypes,
  updateSelectedTags,
  theme,
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
    <>
      <div className="jump-link" id="filters">
        {/* <h2>#filters</h2> */}
        <SectionHeader
          remixIconName="RiFoldersLine"
          headerText="filters"
          theme={theme}
        />
      </div>
      <div className="filters-container">
        <div className="filters-types-container">
          <span>Types: &#91;&nbsp;</span>
          {allPostTypes.map((type) => (
            <span key={crypto.randomUUID()}>
              <button
                className={
                  selectedTypes.has(type)
                    ? "btn-tag btn-tag-selected"
                    : "btn-tag"
                }
                onClick={() => {
                  updateSelectedTypes(type);
                  navigate("/");
                }}
              >
                {type}
              </button>
              {allPostTypes.indexOf(type) !== allPostTypes.length - 1 ? (
                <span>,&nbsp;</span>
              ) : null}
            </span>
          ))}
          <span>&nbsp;&#93;</span>
        </div>

        <div className="filters-tags-container">
          <span>Tags: &#91;&nbsp;</span>
          {allPostTags.map((tag) => (
            <span key={crypto.randomUUID()}>
              <button
                className={
                  selectedTags.has(tag) ? "btn-tag btn-tag-selected" : "btn-tag"
                }
                onClick={() => {
                  updateSelectedTags(tag);
                  navigate("/");
                }}
              >
                {tag}
              </button>
              {allPostTags.indexOf(tag) !== allPostTags.length - 1 ? (
                <span>,&nbsp;</span>
              ) : (
                <span>&nbsp;&#93;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
