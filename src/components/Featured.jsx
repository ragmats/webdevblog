import { useNavigate } from "react-router-dom";

export default function Featured({ postData, setSelectedFeaturedId }) {
  // Create array of featured posts sorted by date
  const featuredPosts = postData
    .filter((post) => post.featured === true)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  function filterPostsByID(id) {
    setSelectedFeaturedId(id);
  }

  const navigate = useNavigate();

  return (
    <div className="featured-posts-container">
      Featured Posts:
      {featuredPosts.map((post) => {
        return (
          <button
            className="btn-featured"
            key={post.id}
            onClick={() => {
              filterPostsByID(post.id);
              navigate("/");
            }}
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
