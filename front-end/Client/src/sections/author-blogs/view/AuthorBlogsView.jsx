import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  BreadcrumItem,
  CustomizedBreadcrumbs,
} from "src/components/CustomBreadcum";
import HomeIcon from "@mui/icons-material/Home";
import authorAPI from "src/services/API/authorAPI";
import {
  Avatar,
  Card,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import IntroText from "src/components/IntroText";
import BlogMenu from "src/sections/blogs/BlogMenu";
import Image from "src/components/Image";
import AllArticle from "src/sections/blogs/AllArticle";

const AuthorBlogsView = () => {
  const { authorId } = useParams();
  const { data: authorInfo } = useQuery({
    queryKey: ["authorInfo", { authorId }],
    queryFn: () => authorAPI.getAuthorInfo(authorId),
  });

  return (
    <Container sx={{ mt: "40px", mb: "100px" }}>
      <CustomizedBreadcrumbs sx={{ mb: "40px" }}>
        <BreadcrumItem
          icon={<HomeIcon />}
          label={"Home"}
          href={"/"}
          component={"a"}
        />
        <BreadcrumItem label={"Blog"} href={"/blogs"} component={"a"} />
        <BreadcrumItem
          label={`${authorInfo?.email || "Loading..."}`}
          href={`/authors/${authorInfo?.accountId || "___"}/blogs`}
          component={"a"}
        />
      </CustomizedBreadcrumbs>
      {authorInfo ? (
        <Card sx={{ p: 3, mx: 5 }}>
          <Grid container alignItems={"center"}>
            <Grid
              item
              xs={12}
              md={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar
                src={authorInfo.imageURL}
                alt={authorInfo.fullName}
                sx={{
                  width: 100,
                  height: 100,
                  border: "1px solid black",
                }}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <IntroText
                variant={"h1"}
                title={authorInfo.fullName}
                desciption={authorInfo.description || "No Description"}
                sx={{
                  maxWidth: "800px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  sx={{
                    opacity: "0.6",
                    mb: "10px",
                    fontWeight: "600",
                    color: "var(--secondary-color)",
                    textTransform: "uppercase",
                    textWrap: "wrap",
                  }}
                  variant="h5"
                >
                  {authorInfo.position || "No Position"}
                </Typography>
              </IntroText>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <>
          <Skeleton variant="text" width={"50%"} height={50} />
          <Skeleton variant="text" width={"30%"} height={50} />
          <Skeleton variant="text" width={"100%"} height={200} />
        </>
      )}
      <BlogMenu authorId={authorId} />
      <AllArticle authorId={authorId} />
    </Container>
  );
};

export default AuthorBlogsView;
