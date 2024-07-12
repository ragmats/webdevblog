export default function Image({ post: { image } }) {
  return (
    <>
      {image ? (
        <img
          className="post-image"
          src={`${import.meta.env.VITE_BASE_URL}img/${image}`}
        />
      ) : null}
    </>
  );
}
