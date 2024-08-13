import { useDispatch, useSelector } from "react-redux";

import { Box, CircularProgress, Dialog } from "@mui/material";

import { loading } from "src/redux/selectors/LoadingSelector";

const LoadingComp = ({ children }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(loading);

  return (
    <>
      <Dialog open={isLoading} maxWidth="xl">
        {isLoading && (
          <Box sx={{ p: 3 }}>
            <CircularProgress />
          </Box>
        )}
      </Dialog>
      {children}
    </>
  );
};

export default LoadingComp;
