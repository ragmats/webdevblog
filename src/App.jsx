import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
import "./App.css";
import postData from "./posts.json";

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

  // Create sorted array of all post types without duplicates
  const postTypesSet = new Set();
  postData.map((post) => postTypesSet.add(post.type));
  const allPostTypes = Array.from(postTypesSet).sort();

  // Create sorted array of all post tags without duplicates
  const postTagsSet = new Set();
  postData.map((post) => post.tags.map((tag) => postTagsSet.add(tag)));
  const allPostTags = Array.from(postTagsSet).sort();

  // Create array of featured posts sorted by date
  const featuredPosts = postData.filter((post) => post.featured === true);

  // Split MM/DD/YYYY date into parts for better formatting control
  function formatDate(dateString) {
    const [month, day, year] = dateString.split("/");
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

  function clearAllTags() {
    setSelectedTypes(new Set());
    setSelectedTags(new Set());
  }

  return (
    <>
      <div className="title-container">
        <div className="cube-container">
          <div className="face face-top">
            Steven Coy
            <br />
            Web Developer
          </div>
          <div className="face face-left">LinkedIn, GitHub, Hackerrank</div>
          <div className="face face-front">
            JavaScript, HTML, CSS, React, Next.js, Git, Python, Django, Flask
          </div>
          <div className="face face-back"></div>
          <div className="face face-right"></div>
          <div className="face face-bottom"></div>
        </div>
      </div>

      <div>Profile Summary</div>

      <div>
        Post Types:
        {allPostTypes.map((type) => (
          <button
            className={
              selectedTypes.has(type) ? "btn-tag btn-tag-selected" : "btn-tag"
            }
            key={crypto.randomUUID()}
            onClick={() => {
              updateSelectedTypes(type);
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div>
        Tags:
        {allPostTags.map((tag) => (
          <button
            className={
              selectedTags.has(tag) ? "btn-tag btn-tag-selected" : "btn-tag"
            }
            key={crypto.randomUUID()}
            onClick={() => updateSelectedTags(tag)}
          >
            {tag}
          </button>
        ))}
        <button onClick={() => clearAllTags()}>-reset tags-</button>
      </div>

      <div>
        Featured Posts:{" "}
        {featuredPosts.map((post) => {
          return (
            <div className="featured-post" key={post.id}>
              <img className="featured-post-image" src={post.image} />
            </div>
          );
        })}
      </div>

      <div>
        <p>Dev Blog</p>
        {filteredPosts.length === 0 && (
          <p>
            No posts!{" "}
            <button onClick={() => clearAllTags()}>Reset filters?</button>
          </p>
        )}
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
