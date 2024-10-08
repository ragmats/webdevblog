import { useEffect } from "react";
import Title from "./DevBlog/Title";
import SubHeader from "./DevBlog/SubHeader";
import Image from "./DevBlog/Image";
import Body from "./DevBlog/Body";
import Tags from "./DevBlog/Tags";
import SectionHeader from "./SectionHeader";

export default function DevBlog({
  postData,
  filteredPosts,
  setFilteredPosts,
  selectedTypes,
  selectedTags,
  clearAllFilters,
  updateSelectedTypes,
  updateSelectedTags,
  theme,
}) {
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

  return (
    <>
      <div className="jump-link" id="devblog">
        {/* <h2>#dev blog</h2> */}
        <SectionHeader
          remixIconName="RiBook3Line"
          headerText="dev blog"
          theme={theme}
        />
      </div>
      <div className="dev-blog-container">
        {filteredPosts.length === 0 && <p>No posts!</p>}
        {filteredPosts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((post) => {
            return (
              <div className="post" key={post.id}>
                <Title post={post} clearAllFilters={clearAllFilters} />
                <SubHeader
                  post={post}
                  selectedTypes={selectedTypes}
                  clearAllFilters={clearAllFilters}
                  updateSelectedTypes={updateSelectedTypes}
                />
                <Image post={post} theme={theme} />
                <Body post={post} clearAllFilters={clearAllFilters} />
                <Tags
                  post={post}
                  selectedTags={selectedTags}
                  clearAllFilters={clearAllFilters}
                  updateSelectedTags={updateSelectedTags}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
