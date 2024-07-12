import { useEffect, useState } from "react";
import "./Root.css";
import { useLocation, Outlet } from "react-router-dom";
import CubeHeader from "../components/CubeHeader";
import DevBlog from "../components/DevBlog";
import Featured from "../components/Featured";
import Filters from "../components/Filters";
import Profile from "../components/Profile";
import postData from "../data/posts.json";
import { createSlugMap } from "../utils/createSlugMap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// TODO Alt tags
// TODO Populate postData with real posts
// TODO Add final pre-launch style touches (light mode default)
// TODO Launch!
// TODO Make filters work with params so they are linkable
// TODO Make it so single post pages jump down to post start (skip links?)
// TODO Make it so main dev blog posts are abbreviated and have a "more..." link?
// TODO Add icons to site (LinkedIn, etc.)
// TODO Add dark mode
// ? Do posts need a darkmode version of the images?
// TODO Add action button with epanding tags, etc?
// TODO Add loading/paginated posts?

function App() {
  const [filteredPosts, setFilteredPosts] = useState(postData);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [selectedFeaturedId, setSelectedFeaturedId] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (
      selectedTypes.size === 0 &&
      selectedTags.size === 0 &&
      !selectedFeaturedId
    )
      setIsFiltered(false);
    else {
      setIsFiltered(true);
    }
  }, [selectedTypes, selectedTags, selectedFeaturedId]);

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
    if (
      selectedTypes.size > 0 ||
      selectedTags.size > 0 ||
      selectedFeaturedId !== null
    ) {
      setSelectedTypes(new Set());
      setSelectedTags(new Set());
      setSelectedFeaturedId(null);
    }
  }

  function clearFeatured() {
    if (selectedFeaturedId !== null) setSelectedFeaturedId(null);
  }

  return (
    <div className="container">
      <Navbar clearAllFilters={clearAllFilters} isFiltered={isFiltered} />
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
            clearFeatured={clearFeatured}
          />
          <Featured
            postData={postData}
            selectedFeaturedId={selectedFeaturedId}
            setSelectedFeaturedId={setSelectedFeaturedId}
            clearAllFilters={clearAllFilters}
          />
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
          <Footer />
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
    </div>
  );
}

export default App;
