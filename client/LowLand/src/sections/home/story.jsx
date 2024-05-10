import { Button, Container, Divider, Typography } from "@mui/material";

const HomeStory = () => {
  return (
    <Container
      maxWidth={"sm"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: "100px",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "500",
          fontSize: "30px",
          marginBottom: "20px",
        }}
      >
        Exquisite Coffee, Beautiful Space, Endless Experience.
      </Typography>
      <Typography
        sx={{
          marginBottom: "50px",
          textAlign: "center",
          opacity: "0.6",
        }}
      >
        Join us on a journey of exploration and delight, where the boundaries of
        taste are pushed with every expertly brewed blend, and where the simple
        pleasure of a cup of coffee becomes a moment of true connection and joy
        shared with every sip.
      </Typography>

      <Button sx={{ fontWeight: "600", color: "var(--secondary-color)" }}>
        Read the full story
      </Button>
    </Container>
  );
};

export default HomeStory;
