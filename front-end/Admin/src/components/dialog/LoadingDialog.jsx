import { Box, CircularProgress, Dialog } from "@mui/material";

const LoadingDialog = ({ children, isLoading }) => {
  return (
    <>
      <Dialog open={isLoading || false} maxWidth="xl" sx={{ zIndex: 1000000 }}>
        <Box sx={{ p: 3 }}>
          <CircularProgress />
        </Box>
      </Dialog>
      {children}
    </>
  );
};

export default LoadingDialog;
