export default function Image({ post: { imageLight, imageDark }, theme }) {
  return (
    <>
      {imageLight && imageDark ? (
        <img
          className="post-image"
          src={
            theme === "light"
              ? `${import.meta.env.VITE_BASE_URL}img/${imageLight}`
              : `${import.meta.env.VITE_BASE_URL}img/${imageDark}`
          }
        />
      ) : null}
    </>
  );
}
