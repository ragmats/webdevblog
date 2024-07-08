import { useState } from "react";
import "./Root.css";
import { useLocation, Outlet } from "react-router-dom";
import CubeHeader from "../components/CubeHeader";
import DevBlog from "../components/DevBlog";
import Featured from "../components/Featured";
import Filters from "../components/Filters";
import Profile from "../components/Profile";
import postData from "../data/posts.json";
import { createSlugMap } from "../utils/createSlugMap";

// TODO Add styles to main devlog
// TODO Add styles to main single post page based on devblog
// TODO Add styles to other sections of homepage
// TODO Add navbar (skip links)? Styled like array: [ Profile, Filters, Devblog, Light/Dark, Home ]
// TODO Populate postData with real posts
// TODO Add final pre-launch styles (light mode default)
// TODO Launch
// TODO Make filters work with params so they are linkable
// TODO Make it so single post pages jump down to post start (skip links?)
// TODO Make it so main dev blog posts are abbreviated and have a "more..." link?
// TODO Add icons to site (LinkedIn, etc.)
// TODO Add dark mode
// ? Do posts need a darkmode version of the images?
// TODO Add action button?
// TODO Add loading/paginated posts

function App() {
  const [filteredPosts, setFilteredPosts] = useState(postData);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [selectedFeaturedId, setSelectedFeaturedId] = useState(null);
  const location = useLocation();

  // Create slug map for more efficient lookup of slugs on individual posts
  const slugMap = createSlugMap(postData);

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

  function clearAllFilters() {
    setSelectedTypes(new Set());
    setSelectedTags(new Set());
    setSelectedFeaturedId(null);
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
        clearAllFilters={clearAllFilters}
        filteredPostLen={filteredPosts.length}
      />
      <Featured
        postData={postData}
        setSelectedFeaturedId={setSelectedFeaturedId}
      />
      {location.pathname === "/" && (
        <>
          <DevBlog
            postData={postData}
            filteredPosts={filteredPosts}
            setFilteredPosts={setFilteredPosts}
            selectedTypes={selectedTypes}
            selectedTags={selectedTags}
            selectedFeaturedId={selectedFeaturedId}
            clearAllFilters={clearAllFilters}
            updateSelectedTypes={updateSelectedTypes}
            updateSelectedTags={updateSelectedTags}
          />
        </>
      )}
      <Outlet
        context={[
          slugMap,
          postData,
          setFilteredPosts,
          selectedTypes,
          selectedTags,
          clearAllFilters,
          updateSelectedTypes,
          updateSelectedTags,
        ]}
      />
    </>
  );
}

export default App;
