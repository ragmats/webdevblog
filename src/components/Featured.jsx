export default function Featured({ featuredPosts, filterPostsByID }) {
  return (
    <div className="featured-posts-container">
      Featured Posts:
      {featuredPosts
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((post) => {
          return (
            <button
              className="btn-featured"
              key={post.id}
              onClick={() => filterPostsByID(post.id)}
            >
              <div className="featured-post">
                <img className="featured-post-image" src={post.image} />
              </div>
            </button>
          );
        })}
    </div>
  );
}
