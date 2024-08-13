import { Button, Typography } from "@mui/material";

export const BlogHeader = ({ children, variant }) => {
  const styleVariant = {
    h1: {
      m: "25px 0px 20px 0px",
      fontSize: "32px",
      fontWeight: "bold",
    },
    h2: {
      m: "20px 0px 15px 0px",
      fontSize: "28px",
      fontWeight: "bold",
    },
    h3: {
      m: "10px 0px 15px 0px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    h4: {
      m: "10px 0px 15px 0px",
      fontSize: "20px",
      fontWeight: "bold",
    },
  };
  return (
    <Typography
      variant={variant}
      sx={variant ? styleVariant[variant] : { mb: "15px" }}
    >
      {children}
    </Typography>
  );
};

export const BlogImage = ({ imageURL, alt }) => {
  return (
    <img
      src={imageURL}
      alt={alt}
      style={{ width: "100%", marginTop: "25px", marginBottom: "25px" }}
    />
  );
};

export const BlogLink = ({ children, href }) => {
  return (
    <>
      {children ? (
        <Button
          href={href}
          target="_blank"
          variant="contained"
          sx={{ m: "10px 5px", textTransform: "none" }}
        >
          {children}
        </Button>
      ) : (
        <Button
          href={href}
          target="_blank"
          color="secondary"
          sx={{
            m: "10px 5px",
            textDecoration: "underline",
            textTransform: "none",
          }}
        >
          {href}
        </Button>
      )}
    </>
  );
};
