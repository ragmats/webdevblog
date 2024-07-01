import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
import "./App.css";
import CubeHeader from "./components/CubeHeader";
import Filters from "./components/Filters";
import Profile from "./components/Profile";
import postData from "./posts.json";

// TODO Break into components
// TODO Add post slugs?
// TODO Populate postData with real posts
// TODO Add styles (light mode default)
// TODO Add icons to site (LinkedIn, etc.)
// TODO Add dark mode
// TODO Add action button

function App() {
  const [filteredPosts, setFilteredPosts] = useState(postData);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState(new Set());

  useEffect(() => {
    // Convert sets to arrays to enable some method
    const selectedTypesArray = Array.from(selectedTypes);
    const selectedTagsArray = Array.from(selectedTags);

    if (selectedTypesArray.length > 0 && selectedTagsArray.length === 0) {
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
  }, [selectedTypes, selectedTags]);

  // Create array of featured posts sorted by date
  const featuredPosts = postData.filter((post) => post.featured === true);

  // Split MM/DD/YYYY date into parts for better formatting control
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}.${day}.${year}`;
  }

  function updateSelectedTypes(type) {
    setSelectedTypes((currentSelectedTypes) => {
      const newSet = new Set(currentSelectedTypes);
      if (newSet.has(type)) newSet.delete(type);
      else newSet.add(type);
      return newSet;
    });
  }

  function updateSelectedTags(tag) {
    setSelectedTags((currentSelectedTags) => {
      const newSet = new Set(currentSelectedTags);
      if (newSet.has(tag)) newSet.delete(tag);
      else newSet.add(tag);
      return newSet;
    });
  }

  function filterPostsByID(id) {
    setFilteredPosts(postData.filter((post) => post.id === id));
  }

  function clearAllTags() {
    setSelectedTypes(new Set());
    setSelectedTags(new Set());
  }

  return (
    <>
      <CubeHeader />

      <Profile />

      <Filters
        postData={postData}
        selectedTypes={selectedTypes}
        selectedTags={selectedTags}
        updateSelectedTypes={updateSelectedTypes}
        updateSelectedTags={updateSelectedTags}
        clearAllTags={clearAllTags}
        filteredPostLen={filteredPosts.length}
      />

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

      <div>
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
    </>
  );
}

export default App;
