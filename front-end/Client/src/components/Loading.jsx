import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <CircularProgress color="secondary" size={50} thickness={4.0} />
      </Box>
    </>
  );
};

export default Loading;
