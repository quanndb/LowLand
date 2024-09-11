import { Card, Grid, Typography } from "@mui/material";

import Image from "./Image";

import { useRouter } from "src/routes/hooks";

const LineBlog = ({ url, imageURL, title, description, date, sx }) => {
  const router = useRouter();
  return (
    <Card
      sx={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        mb: "20px",
        padding: "15px 10px",
        "&:hover": {
          opacity: "0.8",
          transform: "scale(1.01) translateY(-10px)",
        },
        transition: "all 0.5s ease",
      }}
    >
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
          color: "var(--primary-color)",
          ...sx,
        }}
        component={"a"}
        href={url}
        onClick={(e) => {
          e.preventDefault();
          router.push(url);
        }}
      >
        <Grid
          item
          md={6}
          sx={{
            margin: "10px 0px",
            padding: {
              md: "0px 30px",
            },
            width: "100%",
          }}
        >
          <Image
            imageURL={imageURL}
            sx={{
              height: "200px",
              width: "100%",
            }}
            overlayContent={"Read More"}
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
              textAlign: "left",
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
        </Grid>
      </Grid>
    </Card>
  );
};

export default LineBlog;
