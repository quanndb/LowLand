import { redirect } from "react-router-dom";
import { BLOGS } from "src/mock/itemBlog";

export async function fetchBlogById({ params }) {
  // const response = await fetch(`/api/users/${params.userId}`);
  // if (!response.ok) {
  //   throw new Error('Failed to fetch user');
  // }
  // const user = await response.json();
  const blog = BLOGS.filter((item) => item.id == params.blogID);
  if (blog.length === 0) {
    throw redirect("/404");
  } else {
    return { blog };
  }
}
