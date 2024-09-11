import { Helmet } from "react-helmet-async";
import AuthorBlogsView from "src/sections/author-blogs/view/AuthorBlogsView";

const AuthorBlogsPage = () => {
  return (
    <>
      <Helmet>
        <title>Author | LowLand</title>
      </Helmet>

      <AuthorBlogsView />
    </>
  );
};

export default AuthorBlogsPage;
