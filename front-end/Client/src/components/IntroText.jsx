import { Box, Typography } from "@mui/material";

const config = {
  h1: {
    title: "40px",
    desciption: "20px",
  },
  h2: {
    title: "30px",
    desciption: "18px",
  },
  h3: {
    title: "24px",
    desciption: "16px",
  },
};

const IntroText = ({ title, desciption, sx, variant, children }) => {
  return (
    <Box sx={{ textAlign: "center", ...sx }}>
      <Typography
        variant={variant ? variant : "h1"}
        sx={{
          marginBottom: "40px",
          fontWeight: "600",
          fontSize: config[variant ? variant : "h1"].title,
          textWrap: "wrap",
        }}
      >
        {title}
      </Typography>
      {children}
      <Typography
        sx={{
          opacity: "0.7",
          fontSize: config[variant ? variant : "h1"].desciption,
          textWrap: "wrap",
        }}
      >
        {desciption}
      </Typography>
    </Box>
  );
};

export default IntroText;
