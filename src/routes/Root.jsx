import { useEffect, useState } from "react";
import "./Root.css";
import {
  useLocation,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import CubeHeader from "../components/CubeHeader";
import DevBlog from "../components/DevBlog";
import Featured from "../components/Featured";
import Filters from "../components/Filters";
import Profile from "../components/Profile";
import postData from "../data/posts.json";
import { createSlugMap } from "../utils/createSlugMap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// TODO Can tags on posts fit better? They wrap and orphan easily on mobile.
// TODO Make filters work with params so they are linkable
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
  const [isFiltered, setIsFiltered] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();

  const lightThemeVariables = [
    { name: "--cube-back-shadow", color: "rgb(225, 225, 225)" },
    { name: "--interact-color", color: "lightseagreen" },
    { name: "--interact-color-hover", color: "darkcyan" },
    { name: "--bg-color-body", color: "whitesmoke" },
    { name: "--bg-color-card", color: "white" },
    { name: "--bg-color-filter-selected", color: "gainsboro" },
    { name: "--text-color", color: "black" },
    { name: "--featured-border-color", color: "black" },
    { name: "--featured-border-color-hover", color: "darkgray" },
    { name: "--border-color-card", color: "lightgray" },
  ];

  const darkThemeVariables = [
    { name: "--cube-back-shadow", color: "rgb(40, 40, 40)" },
    { name: "--interact-color", color: "steelblue" },
    { name: "--interact-color-hover", color: "rgb(88, 161, 221)" },
    { name: "--bg-color-body", color: "rgb(25, 25, 25)" },
    { name: "--bg-color-card", color: "rgb(32, 33, 39)" },
    { name: "--bg-color-filter-selected", color: "rgb(53, 53, 53)" },
    { name: "--text-color", color: "rgb(133, 145, 170)" },
    { name: "--featured-border-color", color: "rgb(53, 53, 53)" },
    { name: "--featured-border-color-hover", color: "dimgray" },
    { name: "--border-color-card", color: "rgb(50, 50, 50)" },
  ];

  // Create slug map for more efficient lookup of slugs on individual posts
  const slugMap = createSlugMap(postData);

  // Get possible slug from search params
  const possibleSlug = searchParams.get("redirect");

  useEffect(() => {
    // Save current theme in local storage
    localStorage.setItem("theme", theme);
    // Set colors according to theme
    if (theme === "light") {
      lightThemeVariables.forEach((color) =>
        document.documentElement.style.setProperty(color.name, color.color)
      );
    } else if (theme === "dark") {
      darkThemeVariables.forEach((color) =>
        document.documentElement.style.setProperty(color.name, color.color)
      );
    }
  }, [theme]);

  // Navigate appropriately if there are search params from the 404 redirect
  useEffect(() => {
    if (possibleSlug) {
      if (slugMap[possibleSlug]) {
        console.log(
          `slug "${possibleSlug}" found, redirecting to /posts/${possibleSlug}`
        );
        navigate(`/posts/${possibleSlug}`);
      } else {
        console.log(
          `slug "${possibleSlug}" not found, redirecting to /notfound`
        );
        navigate(`/notfound/`);
      }
    } else if (searchParams.size > 0) navigate(`/notfound/`);
  }, [searchParams]);

  useEffect(() => {
    if (selectedTypes.size === 0 && selectedTags.size === 0)
      setIsFiltered(false);
    else {
      setIsFiltered(true);
    }
  }, [selectedTypes, selectedTags]);

  // Scroll to target if ones exists
  useEffect(() => {
    if (location.state && location.state.scrollTarget) {
      const scrollTarget = location.state.scrollTarget;
      document.getElementById(scrollTarget).scrollIntoView();
      // Clear location state to prevent scroll jumping upon reload
      navigate("", { state: { scrollTarget: null } });
    }
  }, [location.state]);

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
    if (selectedTypes.size > 0 || selectedTags.size > 0) {
      setSelectedTypes(new Set());
      setSelectedTags(new Set());
    }
  }

  return (
    <div id="top" className="container">
      <Navbar
        theme={theme}
        setTheme={setTheme}
        clearAllFilters={clearAllFilters}
        isFiltered={isFiltered}
      />
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
          />
          <Featured
            postData={postData}
            clearAllFilters={clearAllFilters}
            theme={theme}
          />
          <DevBlog
            postData={postData}
            filteredPosts={filteredPosts}
            setFilteredPosts={setFilteredPosts}
            selectedTypes={selectedTypes}
            selectedTags={selectedTags}
            clearAllFilters={clearAllFilters}
            updateSelectedTypes={updateSelectedTypes}
            updateSelectedTags={updateSelectedTags}
            theme={theme}
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
      <Footer />
    </div>
  );
}

export default App;
