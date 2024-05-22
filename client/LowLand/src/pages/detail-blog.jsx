import { Helmet } from "react-helmet-async";

import { DetailBlogView } from "src/sections/detail-blog/view";

const DetailBlogPage = () => {
  return (
    <>
      <Helmet>
        <title> | LowLand</title>
      </Helmet>
      <DetailBlogView />
    </>
  );
};

export default DetailBlogPage;
