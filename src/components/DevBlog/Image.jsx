export default function Image({ post: { image } }) {
  return <>{image ? <img className="post-image" src={image} /> : null}</>;
}
