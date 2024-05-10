import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Image from "./Image";

const BlogItem = ({ url, imageURL, title, description, date, sx }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textDecoration: "none",
        color: "var(--primary-color)",
        padding: "15px",
        "&:hover": {
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        },
        transition: "all 0.5s ease",
        ...sx,
      }}
      component={"a"}
      href={url ? "/" : url}
      onClick={(e) => {
        e.preventDefault();
        navigate(url);
      }}
    >
      <Image
        url={imageURL}
        sx={{
          height: "300px",
          width: "100%",
          marginBottom: "40px",
        }}
      />
      <Typography
        sx={{
          marginBottom: "10px",
          fontWeight: "600",
          fontSize: "18px",
          "&:hover": {
            color: "var(--secondary-color)",
            transition: "all 0.2s linear ",
          },
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ marginBottom: "20px", opacity: "0.6" }}>
        {description}
      </Typography>
      <Typography
        sx={{
          marginBottom: "20px",
          opacity: "0.6",
          textTransform: "uppercase",
        }}
      >
        {date}
      </Typography>
    </Box>
  );
};

export default BlogItem;
