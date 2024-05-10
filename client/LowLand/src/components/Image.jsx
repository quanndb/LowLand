import { Box } from "@mui/material";

const Image = ({ sx, url }) => {
  return (
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url("${url}")`,
        ...sx,
      }}
    ></Box>
  );
};

export default Image;
