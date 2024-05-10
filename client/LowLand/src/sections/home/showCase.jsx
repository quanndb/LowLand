import { Container } from "@mui/material";

const ShowCase = () => {
  return (
    <Container
      maxWidth={"100%"}
      sx={{
        height: "340px",
        backgroundImage: "url(static/images/showCase.jpg)",
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
