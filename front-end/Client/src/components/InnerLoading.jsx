import { Box, CircularProgress } from "@mui/material";

const InnerLoading = ({ isLoading, sx }) => {
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            p: 3,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: -10,
            alignItems: "center",
            ...sx,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default InnerLoading;
