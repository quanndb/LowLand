import { Box, Typography } from "@mui/material";
const SectionTitle = ({ children, sx }) => {
  return (
    <Box
      sx={{
        width: "fit-content",
        margin: "70px auto",
        wordBreak: "break-word",
        maxWidth: "150px",
      }}
    >
      <Typography
        sx={{
          opacity: "0.6",
          fontWeight: "600",
          position: "relative",
          textTransform: "uppercase",
          textAlign: "center",
          fontSize: "12px",
          wordBreak: "break-word",
          ...sx,
          "::before": {
            fontStyle: "",
            position: "absolute",
            right: "101%",
            content: `''`,
            width: "40px",
            height: "2px",
            top: 0,
            transform: "translateY(11px)",
            marginTop: "-1px",
            backgroundColor: "black",
          },
          "::after": {
            position: "absolute",
            left: "101%",
            content: `''`,
            width: "40px",
            top: 0,
            height: "2px",
            transform: "translateY(11px)",
            marginTop: "-1px",
            backgroundColor: "black",
          },
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default SectionTitle;
