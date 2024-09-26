import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import BlogMenuSkeleton from "src/components/BlogMenuSkeleton";
import ButtonLink from "src/components/ButtonLink";

import LineBlog from "src/components/LineBlog";
import SectionTitleB from "src/components/SectionTitleB";
import blogAPI from "src/services/API/blogAPI";
import cagetoryAPI from "src/services/API/cagetoryAPI";

const Category = ({ children, imgURL, onClick, sx, active }) => {
  return (
    <Button
      color="secondary"
      variant={active ? "contained" : "text"}
      sx={{
        width: "100%",
        borderLeft: "1px solid var(--secondary-color)",
        display: "flex",
        alignItems: "center",
        py: "10px",
        justifyContent: "left",
        my: "10px",
        ...sx,
      }}
      onClick={onClick}
    >
      {imgURL ? (
        <Box
          sx={{
            width: "60px",
            height: "60px",
            backgroundImage: `url("${imgURL}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            ml: "10px",
          }}
        />
      ) : (
        <></>
      )}
      <Typography
        sx={{
          ml: "20px",
          opacity: "0.7",
          color: active ? "white" : "var(--primary-color)",
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};

const BlogCategories = ({ categoryName, setCategoryName, setPage }) => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      cagetoryAPI.getCagetories({
        size: 10,
      }),
  });

  return (
    <Box>
      <SectionTitleB>Categories</SectionTitleB>
      <Category
        key={"All"}
        onClick={() => {
          setCategoryName("All");
        }}
        active={categoryName === "All"}
      >
        All
      </Category>
      {categories ? (
        categories.map((category) => (
          <Category
            key={JSON.stringify(category._id)}
            onClick={() => {
              setCategoryName(category.name);
              setPage(1);
            }}
            active={categoryName === category.name}
          >
            {category.name}
          </Category>
        ))
      ) : (
        <></>
      )}
    </Box>
  );
};

const Authors = () => {
  return (
    <Box>
      <SectionTitleB>Authors</SectionTitleB>
      <Category imgURL={"/static/images/logo.jpg"}>Vu Minh Quan</Category>
      <Category imgURL={"/static/images/logo.jpg"}>Nguyen Anh Quan</Category>
      <Category imgURL={"/static/images/logo.jpg"}>Le Minh Khoi</Category>
      <Category imgURL={"/static/images/logo.jpg"}>Ha Van Sang</Category>
    </Box>
  );
};

const DetailStore = () => {
  return (
    <Box sx={{ mb: "15px" }}>
      <Typography sx={{ fontWeight: "600", mb: "10px" }}>LowLand.</Typography>
      <Typography sx={{ mb: "10px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        varius enim in eros elementum tristique.
      </Typography>
      <ButtonLink
        color={"secondary"}
        ariaLabel={"read the full story"}
        sx={{
          textDecoration: "underline",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        href={"/blogs/b5bc4125-535b-4c37-b441-a15e05c405a7"}
      >
        Read the full story
      </ButtonLink>
    </Box>
  );
};

export const BlogMenu = ({ authorId }) => {
  const [page, setPage] = useState(1);
  const [categoryName, setCategoryName] = useState("All");

  const { data: blogsPage } = useQuery({
    queryKey: [
      "blogs",
      {
        page: page,
        size: 4,
        authorId,
        isActive: true,
        sortedBy: "views",
        categoryName: categoryName !== "All" ? categoryName : null,
      },
    ],
    queryFn: () =>
      blogAPI.getBlogs({
        page: page,
        size: 4,
        isActive: true,
        sortedBy: "views",
        categoryName: categoryName !== "All" ? categoryName : null,
        accountId: authorId,
      }),
  });

  return (
    <Container
      sx={{ marginBottom: "80px", justifyContent: "center", display: "flex" }}
    >
      <Grid
        container
        spacing={6}
        justifyContent={"center"}
        sx={{ width: "100%" }}
      >
        <Grid item md={8} xs={12}>
          <SectionTitleB>Related Blogs</SectionTitleB>
          {blogsPage ? (
            blogsPage.response.map((blog) => (
              <LineBlog
                key={blog.blogId}
                url={`/blogs/${blog?.blogId}`}
                imageURL={blog.imageURL}
                title={blog.title}
                description={blog.description}
                date={blog.date}
              />
            ))
          ) : (
            <BlogMenuSkeleton />
          )}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              page={page}
              count={blogsPage?.totalPages || 1}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </Grid>
        <Grid item md={4}>
          <SectionTitleB>About Us</SectionTitleB>
          <DetailStore />
          <BlogCategories
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            setPage={setPage}
          />
          <Authors />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogMenu;
