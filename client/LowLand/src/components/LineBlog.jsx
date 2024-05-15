import { Box, Grid, Typography } from "@mui/material";
import Image from "./Image";
import { useNavigate } from "react-router-dom";

const LineBlog = ({ url, imageURL, title, description, date, sx }) => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        color: "var(--primary-color)",
        padding: "15px 10px",
        mb: "20px",
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
      <Grid
        item
        md={6}
        sx={{ margin: "10px 0px", padding: "0px 30px", width: "100%" }}
      >
        <Image
          imageURL={imageURL}
          sx={{
            height: "200px",
            width: "100%",
          }}
        />
      </Grid>
      <Grid
        item
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
      </Grid>
    </Grid>
  );
};

export default LineBlog;
