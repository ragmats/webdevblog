import { Link, useNavigate } from "react-router-dom";

export default function Featured({ postData, clearAllFilters }) {
  // Create array of featured posts sorted by date
  const featuredPosts = postData
    .filter((post) => post.featured === true)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const navigate = useNavigate();

  return (
    <>
      <h2 id="projects">#featured projects</h2>
      <div className="featured-posts-container">
        {featuredPosts.map((post) => {
          return (
            <button
              className="btn-featured"
              key={post.id}
              onClick={() => {
                clearAllFilters();
                navigate(`/posts/${post.slug}`);
              }}
            >
              <div className="featured-post">
                <img
                  className={
                    post.imageIsLogo
                      ? "featured-post-image logo"
                      : "featured-post-image"
                  }
                  src={`${import.meta.env.VITE_BASE_URL}img/${post.image}`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
