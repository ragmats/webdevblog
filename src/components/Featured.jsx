import { useNavigate } from "react-router-dom";

export default function Featured({
  postData,
  clearAllFilters,
  selectedFeaturedId,
  setSelectedFeaturedId,
}) {
  // Create array of featured posts sorted by date
  const featuredPosts = postData
    .filter((post) => post.featured === true)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  function filterPostsByID(id) {
    setSelectedFeaturedId(id);
  }

  const navigate = useNavigate();

  return (
    <>
      <h2>#featured</h2>
      <div className="featured-posts-container">
        {featuredPosts.map((post) => {
          return (
            <button
              className={
                post.id === selectedFeaturedId
                  ? "btn-featured-selected"
                  : "btn-featured"
              }
              key={post.id}
              onClick={() => {
                clearAllFilters();
                filterPostsByID(post.id);
                navigate("/");
              }}
            >
              <div className="featured-post">
                <img
                  className={
                    post.imageIsLogo
                      ? "featured-post-image logo"
                      : "featured-post-image"
                  }
                  src={post.image}
                />
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
