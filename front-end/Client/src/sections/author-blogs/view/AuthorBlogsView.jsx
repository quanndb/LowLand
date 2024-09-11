import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import authorAPI from "src/services/API/authorAPI";

const AuthorBlogsView = () => {
  const { authorId } = useParams();
  const {
    data: [authorInfo, authorBlogs],
  } = useQueries({
    queries: [
      {
        queryKey: ["authorBlogs", { authorId }],
        queryFn: () => authorAPI.getAuthorBlogs(authorId),
      },
      {
        queryKey: ["authorInfo", { authorId }],
        queryFn: () => authorAPI.getAuthorInfo(authorId),
      },
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
      };
    },
  });

  console.log(authorInfo, authorBlogs);

  return <>Hi</>;
};

export default AuthorBlogsView;
