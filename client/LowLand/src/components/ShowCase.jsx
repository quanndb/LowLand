import { Container } from "@mui/material";

const ShowCase = ({ imageURL }) => {
  return (
    <Container
      maxWidth={"100%"}
      sx={{
        height: "340px",
        backgroundImage: `${imageURL ? `url("${imageURL}")` : "none"}`,
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
