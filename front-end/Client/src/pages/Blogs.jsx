import { Helmet } from "react-helmet-async";

import { BlogsView } from "src/sections/blogs/view";

const BlogsPage = () => {
  return (
    <>
      <Helmet>
        <title>Blogs | LowLand</title>
      </Helmet>

      <BlogsView />
    </>
  );
};

export default BlogsPage;
