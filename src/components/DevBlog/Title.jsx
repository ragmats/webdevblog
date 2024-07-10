import { Link } from "react-router-dom";

export default function Title({ post: { title, slug }, clearAllFilters }) {
  return (
    <h3>
      <Link onClick={clearAllFilters} to={`/posts/${slug}`}>
        {title}
      </Link>
    </h3>
  );
}
