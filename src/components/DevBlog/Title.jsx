import { Link, useLocation } from "react-router-dom";

export default function Title({ post: { title, slug }, clearAllFilters }) {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? (
        <h3>
          <Link onClick={clearAllFilters} to={`/posts/${slug}`}>
            {title}
          </Link>
        </h3>
      ) : (
        <h3>{title}</h3>
      )}
    </>
  );
}
