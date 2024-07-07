import { useParams, useOutletContext, Navigate } from "react-router-dom";

export default function Post() {
  const { slug } = useParams();
  const [slugMap] = useOutletContext();

  const { id, featured, title, date, type, tags, image, body } = slugMap[slug];

  if (!id) return <Navigate to="/notfound" />;
  return (
    <>
      <p>id: {id}</p>
      <p>featured: {featured}</p>
      <p>title: {title}</p>
      <p>date: {date}</p>
      <p>type: {type}</p>
      <p>tags: {tags}</p>
      <p>image: {image}</p>
      <p>body: {body}</p>
    </>
  );
}
