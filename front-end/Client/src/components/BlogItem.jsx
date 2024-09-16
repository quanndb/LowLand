import { Box, Card, Typography } from "@mui/material";

import Image from "./Image";

import { useRouter } from "src/routes/hooks";
import { memo } from "react";

const BlogItem = ({
  url,
  imageURL,
  title,
  description,
  date,
  sx,
  innerRef,
}) => {
  const router = useRouter();
  return (
    <Card
      ref={innerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textDecoration: "none",
        color: "var(--primary-color)",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        mb: "20px",
        padding: "15px 10px",
        "&:hover": {
          opacity: "0.8",
          transform: "scale(1.01) translateY(-10px)",
        },
        transition: "all 0.5s ease",
        ...sx,
      }}
      component={"a"}
      href={url}
      onClick={(e) => {
        e.preventDefault();
        router.push(url);
      }}
    >
      <Image
        imageURL={imageURL}
        sx={{
          height: "250px",
          width: "100%",
          marginBottom: "40px",
        }}
        overlayContent={"Read More"}
      />
      <Typography
        sx={{
          marginBottom: "10px",
          fontWeight: "600",
          fontSize: "18px",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: "4",
          WebkitBoxOrient: "vertical",
          "&:hover": {
            color: "var(--secondary-color)",
            transition: "all 0.2s linear ",
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          marginBottom: "20px",
          opacity: "0.6",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: "4",
          WebkitBoxOrient: "vertical",
        }}
      >
        {description}
      </Typography>
      <Typography
        sx={{
          marginBottom: "20px",
          opacity: "0.6",
          textTransform: "uppercase",
        }}
      >
        {new Date(date).toDateString()}
      </Typography>
    </Card>
  );
};

export default memo(BlogItem);
