import { useParams, useOutletContext, Navigate } from "react-router-dom";
import Body from "../components/DevBlog/Body";
import Image from "../components/DevBlog/Image";
import SubHeader from "../components/DevBlog/SubHeader";
import Tags from "../components/DevBlog/Tags";
import Title from "../components/DevBlog/Title";

export default function Post() {
  const { slug } = useParams();
  const [
    slugMap,
    postData,
    setFilteredPosts,
    selectedTypes,
    selectedTags,
    clearAllFilters,
    updateSelectedTypes,
    updateSelectedTags,
  ] = useOutletContext();

  const post = slugMap[slug];

  if (!post) return <Navigate to="/notfound" />;
  return (
    <div className="dev-blog-container">
      <div className="post">
        <Title post={post} />
        <SubHeader
          post={post}
          selectedTypes={selectedTypes}
          clearAllFilters={clearAllFilters}
          updateSelectedTypes={updateSelectedTypes}
        />
        <Image post={post} />
        <Body post={post} />
        <Tags
          post={post}
          selectedTags={selectedTags}
          clearAllFilters={clearAllFilters}
          updateSelectedTags={updateSelectedTags}
        />
      </div>
    </div>
  );
}
