import { Box, CircularProgress, Dialog } from "@mui/material";

const LoadingComp = ({ children, isLoading }) => {
  return (
    <>
      <Dialog open={isLoading} maxWidth="xl">
        <Box sx={{ p: 3 }}>
          <CircularProgress />
        </Box>
      </Dialog>
      {!isLoading && <>{children}</>}
    </>
  );
};

export default LoadingComp;
