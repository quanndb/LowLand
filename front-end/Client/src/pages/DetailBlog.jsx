import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";

import { DetailBlogView } from "src/sections/detail-blog/view";
import blogAPI from "src/services/API/blogAPI";

const DetailBlogPage = () => {
  const param = useParams();

  const { data: blogData } = useQuery({
    queryKey: ["blog", { blogId: param.blogId }],
    queryFn: () => blogAPI.getDetails(param.blogId),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <>
        <Helmet>
          <title>{blogData ? blogData.title : "Loading..."} | LowLand</title>
        </Helmet>
        <DetailBlogView blog={blogData} />
      </>
    </>
  );
};

export default DetailBlogPage;
