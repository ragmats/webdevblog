import fs from "fs"; // filestytem module

// Read postData JSON file
const posts = JSON.parse(fs.readFileSync("./src/data/posts.json", "utf8"));

function addSlugs(posts) {
  return posts.map((post) => {
    return { ...post, slug: post.slug || createSlug(post.title) };
  });
}

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g, "-") // Replace spaces with dashes
    .replace(/[^\w-]+/g, ""); // Remove any character not a letter, number, underscore, or dash
}

// Write updated posts back to the JSON file with no replacer and 2 spaces of indentation
fs.writeFileSync(
  "./src/data/posts.json",
  JSON.stringify(addSlugs(posts), null, 2)
);

console.log("Slugs checked and added");
