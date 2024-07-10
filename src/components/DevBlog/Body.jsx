export default function Body({ post: { body } }) {
  return (
    <>
      {/* The following danerously set InnerHTML is a trusted source */}
      <div
        className="dev-blog-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </>
  );
}
