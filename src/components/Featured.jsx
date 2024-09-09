import { Link, useNavigate } from "react-router-dom";
import SectionHeader from "./SectionHeader";

export default function Featured({ postData, clearAllFilters, theme }) {
  // Create array of featured posts sorted by date
  const featuredPosts = postData
    .filter((post) => post.featured === true)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const navigate = useNavigate();

  return (
    <>
      <div className="jump-link" id="projects">
        {/* <h2>#featured projects</h2> */}
        <SectionHeader
          remixIconName="RiCodeBoxLine"
          headerText="featured projects"
          theme={theme}
        />
      </div>
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
                  src={
                    theme === "light"
                      ? `${import.meta.env.VITE_BASE_URL}img/${post.imageLight}`
                      : `${import.meta.env.VITE_BASE_URL}img/${post.imageDark}`
                  }
                />
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
