import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function DevBlog({
  postData,
  filteredPosts,
  setFilteredPosts,
  selectedTypes,
  selectedTags,
  selectedFeaturedId,
  clearAllFilters,
  updateSelectedTypes,
  updateSelectedTags,
}) {
  useEffect(() => {
    // Convert sets to arrays to enable some method
    const selectedTypesArray = Array.from(selectedTypes);
    const selectedTagsArray = Array.from(selectedTags);

    if (selectedFeaturedId) {
      // Filter posts for that featured ID
      setFilteredPosts(
        postData.filter((post) => post.id === selectedFeaturedId)
      );
    } else if (
      selectedTypesArray.length > 0 &&
      selectedTagsArray.length === 0
    ) {
      // Filter posts that have any of the selected types
      setFilteredPosts(
        postData.filter((post) => selectedTypesArray.includes(post.type))
      );
    } else if (
      selectedTypesArray.length === 0 &&
      selectedTagsArray.length > 0
    ) {
      // Filter posts that have any of the selected tags
      setFilteredPosts(
        postData.filter((post) =>
          selectedTagsArray.some((tag) => post.tags.includes(tag))
        )
      );
    } else if (selectedTypesArray.length > 0 && selectedTagsArray.length > 0) {
      // Filter posts that have any of the selected types and any of the selected tags
      setFilteredPosts(
        postData.filter((post) =>
          selectedTagsArray.some(
            (tag) =>
              selectedTypesArray.includes(post.type) && post.tags.includes(tag)
          )
        )
      );
    } else {
      setFilteredPosts(postData);
    }
  }, [selectedTypes, selectedTags, selectedFeaturedId]);

  // Split MM/DD/YYYY date into parts for better formatting control
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}.${day}.${year}`;
  }

  return (
    <div className="dev-blog-container">
      <h2>Dev Blog</h2> {filteredPosts.length === 0 && <p>No posts!</p>}
      {filteredPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((post) => {
          return (
            <div className="post" key={post.id}>
              <h3>
                <Link onClick={clearAllFilters} to={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              {post.image ? (
                <img className="post-image" src={post.image} />
              ) : null}
              <div className="dev-blog-sub-header">
                {formatDate(post.date)}
                {/* Post Type */}
                <span>
                  <span>// </span>
                  <button
                    className={
                      selectedTypes.has(post.type)
                        ? "btn-type btn-type-selected"
                        : "btn-type"
                    }
                    onClick={() => {
                      clearAllFilters();
                      updateSelectedTypes(post.type);
                    }}
                  >
                    {post.type}
                  </button>
                </span>
              </div>
              <p>
                {/* The following danerously set InnerHTML is a trusted source */}
                <span dangerouslySetInnerHTML={{ __html: post.body }} />
              </p>
              {/* Post Tags */}
              <div className="dev-blog-tags">
                <span>{"[ "}</span>
                {post.tags.sort().map((tag) => (
                  <span key={crypto.randomUUID()}>
                    <button
                      className={
                        selectedTags.has(tag)
                          ? "btn-tag btn-tag-selected"
                          : "btn-tag"
                      }
                      onClick={() => {
                        clearAllFilters();
                        updateSelectedTags(tag);
                      }}
                    >
                      {tag}
                    </button>
                    {post.tags.indexOf(tag) !== post.tags.length - 1 ? (
                      <span>,&nbsp;</span>
                    ) : null}
                  </span>
                ))}
                <span>{"  ]"}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
