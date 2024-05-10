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
      <Grid
        item
        md={4}
        sx={{ margin: "10px 0px", padding: "0px 30px", width: "100%" }}
      >
        <Image
          url={imageURL}
          sx={{
            height: "250px",
            width: "100%",
            marginBottom: "30px",
          }}
        />
      </Grid>
      <Grid
        item
        md={5}
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
