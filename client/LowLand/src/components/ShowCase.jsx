import { Container } from "@mui/material";

const ShowCase = ({ url }) => {
  return (
    <Container
      maxWidth={"100%"}
      sx={{
        height: "340px",
        backgroundImage: `${url ? `url("${url}")` : "none"}`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        marginBottom: "100px",
      }}
    />
  );
};

export default ShowCase;
