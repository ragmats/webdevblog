import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Body({ post: { body, slug }, clearAllFilters }) {
  const location = useLocation();
  const [bodyHeight, setBodyHeight] = useState(null);
  const ref = useRef(null);

  // Track the height of the post body to show the "read more" opition or not
  useEffect(() => {
    setBodyHeight(ref.current.clientHeight);
  }, []);

  return (
    <div className="dev-blog-body-container">
      {/* The following danerously set InnerHTML is a trusted source */}
      <div
        ref={ref}
        className={
          location.pathname === "/"
            ? "dev-blog-body dev-blog-body-collapsed"
            : "dev-blog-body"
        }
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {/* bodyHeight === max-height of class .dev-blog-body-collapsed */}
      {location.pathname === "/" && bodyHeight === 300 ? (
        <div className="read-more">
          <Link onClick={clearAllFilters} to={`/posts/${slug}`}>
            Read more...
          </Link>{" "}
        </div>
      ) : null}
    </div>
  );
}
