import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
import "./Root.css";
import { useLocation, Outlet } from "react-router-dom";
import CubeHeader from "../components/CubeHeader";
import DevBlog from "../components/DevBlog";
import Featured from "../components/Featured";
import Filters from "../components/Filters";
import Profile from "../components/Profile";
import postData from "../data/posts.json";

// TODO Add post slugs
// TODO Add error page
// TODO Make filters work with params so they are linkable
// TODO Populate postData with real posts
// TODO Add styles (light mode default)
// TODO Add icons to site (LinkedIn, etc.)
// TODO Add dark mode
// TODO Add header anchor links to pofile, featured posts, and dev log, dark mode iconm home icon
// ? Do posts need a darkmode version of the images?
// TODO Add action button
// TODO ADD loading/paginated posts

function App() {
  const [filteredPosts, setFilteredPosts] = useState(postData);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState(new Set());
  const location = useLocation();

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
      <CubeHeader />
      {location.pathname === "/" && (
        <>
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
          <Featured postData={postData} setFilteredPosts={setFilteredPosts} />

          <DevBlog
            postData={postData}
            filteredPosts={filteredPosts}
            setFilteredPosts={setFilteredPosts}
            selectedTypes={selectedTypes}
            selectedTags={selectedTags}
            clearAllTags={clearAllTags}
            updateSelectedTypes={updateSelectedTypes}
            updateSelectedTags={updateSelectedTags}
          />
        </>
      )}
      <Outlet />
    </>
  );
}

export default App;
