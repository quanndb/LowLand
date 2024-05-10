import { Box, Typography } from "@mui/material";
const SectionTitle = ({ children, sx }) => {
  return (
    <Box sx={{ width: "fit-content", margin: "100px auto" }}>
      <Typography
        noWrap={false}
        sx={{
          opacity: "0.6",
          fontWeight: "600",
          position: "relative",
          "::before": {
            position: "absolute",
            right: "102%",
            content: `''`,
            width: "45px",
            height: "3px",
            transform: "translateY(11px)",
            marginTop: "-1px",
            backgroundColor: "black",
          },
          "::after": {
            position: "absolute",
            left: "102%",
            content: `''`,
            width: "45px",
            height: "3px",
            transform: "translateY(11px)",
            marginTop: "-1px",
            backgroundColor: "black",
          },
          textAlign: "center",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default SectionTitle;
