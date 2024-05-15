import { Box, Typography } from "@mui/material";
const SectionTitle = ({ children, sx }) => {
  return (
    <Box sx={{ maxWidth: "250px", width: "fit-content", margin: "70px auto" }}>
      <Typography
        noWrap={false}
        sx={{
          opacity: "0.6",
          fontWeight: "600",
          position: "relative",
          textTransform: "uppercase",
          textAlign: "center",
          ...sx,
          "::before": {
            fontStyle: "",
            position: "absolute",
            right: "102%",
            content: `''`,
            width: "45px",
            height: "3px",
            top: 0,
            transform: "translateY(11px)",
            marginTop: "-1px",
            backgroundColor: "black",
          },
          "::after": {
            position: "absolute",
            left: "102%",
            content: `''`,
            width: "45px",
            top: 0,
            height: "3px",
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
