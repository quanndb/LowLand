import { Box, Button, Container, Typography } from "@mui/material";
import ImageInput from "./image-input";

export const BlogHeader = ({ children, variant, sx, ...props }) => {
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
      sx={variant ? { ...styleVariant[variant], ...sx } : { mb: "15px", ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const BlogImage = ({ init, images, setImages, sx, mode, onClick }) => {
  return (
    <Box onClick={onClick}>
      <ImageInput
        init={init}
        images={images}
        setImages={setImages}
        sx={sx}
        mode={mode}
      />
    </Box>
  );
};

export const BlogLink = ({ children, href, sx, ...props }) => {
  return (
    <Box {...props}>
      {children ? (
        <Button
          href={href}
          target="_blank"
          variant="contained"
          sx={{ m: "10px 5px", textTransform: "none", ...sx }}
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
            ...sx,
          }}
        >
          {href}
        </Button>
      )}
    </Box>
  );
};

export const Motto = ({ sx, children, author, ...props }) => {
  return (
    <Container
      sx={{
        ...sx,
        my: "50px",
      }}
      {...props}
    >
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
