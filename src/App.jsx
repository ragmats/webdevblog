import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
import "./App.css";
import postData from "./posts.json";

function App() {
  const [posts, setPosts] = useState(postData);

  // Create sorted array of all post types without duplicates
  const postTypesSet = new Set();
  posts ? posts.map((post) => postTypesSet.add(post.type)) : [];
  const allPostTypes = postTypesSet ? Array.from(postTypesSet).sort() : [];

  // Create sorted array of all post tags without duplicates
  const postTagsSet = new Set();
  posts
    ? posts.map((post) => post.tags.map((tag) => postTagsSet.add(tag)))
    : [];
  const allPostTags = postTagsSet ? Array.from(postTagsSet).sort() : [];

  // Split MM/DD/YYYY date into parts for better formatting control
  function formatDate(dateString) {
    const [month, day, year] = dateString.split("/");
    return `${month}.${day}.${year}`;
  }

  return (
    <>
      <div className="title-container">
        <div className="cube-container">
          {/* <div className="cube"> */}
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
          {/* </div> */}
        </div>
      </div>

      <div>Profile Summary</div>

      <div>
        Post Types:
        {allPostTypes
          ? allPostTypes.map((type) => (
              <button key={crypto.randomUUID()}>{type}</button>
            ))
          : "Loading post types..."}
      </div>

      <div>
        Tags:
        {allPostTags
          ? allPostTags.map((tag) => (
              <button key={crypto.randomUUID()}>{tag}</button>
            ))
          : "Loading tags..."}
      </div>

      <div>Featured Posts</div>

      <div>
        Dev Blog
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <p>{post.title}</p>
              <p>{formatDate(post.date)}</p>
              {post.tags.map((tag) => (
                <button key={crypto.randomUUID()}>{tag}</button>
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
