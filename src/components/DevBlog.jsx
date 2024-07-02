export default function DevBlog({
  selectedTypes,
  selectedTags,
  filteredPosts,
  clearAllTags,
  updateSelectedTypes,
  updateSelectedTags,
}) {
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
      <p>Dev Blog</p> {filteredPosts.length === 0 && <p>No posts!</p>}
      {filteredPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((post) => {
          return (
            <div className="post" key={post.id}>
              <p>{post.title}</p>
              <p>
                {/* Post Type */}
                <button
                  className={
                    selectedTypes.has(post.type)
                      ? "btn-tag btn-tag-selected"
                      : "btn-tag"
                  }
                  onClick={() => {
                    clearAllTags();
                    updateSelectedTypes(post.type);
                  }}
                >
                  {post.type}
                </button>
              </p>
              <p>{formatDate(post.date)}</p>
              {/* Post Tags */}
              {post.tags.sort().map((tag) => (
                <button
                  className={
                    selectedTags.has(tag)
                      ? "btn-tag btn-tag-selected"
                      : "btn-tag"
                  }
                  key={crypto.randomUUID()}
                  onClick={() => {
                    clearAllTags();
                    updateSelectedTags(tag);
                  }}
                >
                  {tag}
                </button>
              ))}
              {post.image ? (
                <img className="post-image" src={post.image} />
              ) : null}
              <p>
                {/* The following danerously set InnerHTML is a trusted source */}
                <span dangerouslySetInnerHTML={{ __html: post.body }} />
              </p>
            </div>
          );
        })}
    </div>
  );
}
