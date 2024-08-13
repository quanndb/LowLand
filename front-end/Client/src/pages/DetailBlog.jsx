import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

import { DetailBlogView } from "src/sections/detail-blog/view";

const DetailBlogPage = () => {
  const { blog } = useLoaderData();

  return (
    <>
      <Helmet>
        <title>{blog[0].title} | LowLand</title>
      </Helmet>
      <DetailBlogView blog={blog[0]} />
    </>
  );
};

export default DetailBlogPage;
