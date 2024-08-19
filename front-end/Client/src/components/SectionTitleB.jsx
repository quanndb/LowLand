import { Box, Typography } from "@mui/material";

const SectionTitleB = ({ children, sx }) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid var(--secondary-color)",
        marginBottom: "50px",
        ...sx,
      }}
    >
      <Typography
        sx={{ padding: "20px 0px", fontWeight: "600", fontSize: "20px" }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default SectionTitleB;
