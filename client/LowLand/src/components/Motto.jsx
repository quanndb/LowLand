import { Box, Container, Typography } from "@mui/material";

const Motto = ({ sx, children, author }) => {
  return (
    <Container sx={{ ...sx, my: "30px" }}>
      <Box
        sx={{
          borderLeft: "2px solid #a25f4b39",
          borderBottom: "2px solid #a25f4b39",
          mb: "35px",
        }}
      >
        <Typography
          sx={{
            padding: "30px",
            fontSize: "20px",
            textAlign: "center",
            color: "var(--secondary-color)",
          }}
        >
          {children}
        </Typography>
      </Box>
      {author ? (
        <Typography
          sx={{ textAlign: "center", opacity: "0.4", fontWeight: "600" }}
        >
          {author}
        </Typography>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Motto;
