// Create an object with slugs as keys for efficient lookup
export function createSlugMap(posts) {
  const slugMap = {};
  posts.forEach((post) => (slugMap[post.slug] = post));
  return slugMap;
}
