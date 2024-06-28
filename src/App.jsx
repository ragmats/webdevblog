import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
import "./App.css";
import postData from "./posts.json";

// TODO Add basic profile summary
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

      <div className="profile">
        <div className="profile-photo"></div>
        <div className="profile-summary">
          <p>
            Hi, I'm Steven. I started building websites as a teenager with HTML
            and CSS in Notepad. These days, I like to make web applications
            mostly with JavaScript and React. While I've taken courses like
            Harvard's CS50x, my development skills are largely self-taught.
          </p>
          <p>
            Here's how it goes: I think of an idea, dive into the unknown,
            obsess about it, and finally it's done! I learn best through
            projects, so I always try to have one in progress, no matter how
            small.
          </p>
          <p>
            This site, which I built with React, is a showcase of my coding
            projects, experiments, and discussions. If you prefer a more
            professional photo than my cat, visit my{" "}
            <a href="https://www.linkedin.com/in/stevenlewiscoy/" target="_new">
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>

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
        {selectedTypes.size !== 0 || selectedTags.size !== 0 ? (
          <button onClick={() => clearAllTags()}>-reset tags-</button>
        ) : null}
      </div>

      <div>
        Featured Posts:
        <div className="featured-posts-container">
          {featuredPosts.map((post) => {
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
      </div>

      <div>
        <p>Dev Blog</p>{" "}
        {filteredPosts.length !== postData.length ? (
          <button onClick={() => clearAllTags()}>-see all posts-</button>
        ) : null}
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
