import { useDispatch } from "react-redux";

import { Drawer, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DrawerManagerSlice from "src/redux/slices/DrawerManagerSlice";

function SideDrawer({ children, open, drawer }) {
  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    switch (drawer) {
      case "cart": {
        dispatch(DrawerManagerSlice.actions.setOpenCartDrawer(false));
      }
      case "blogComment": {
        dispatch(DrawerManagerSlice.actions.setOpenBlogCommentDrawer(false));
      }
      case "user": {
        dispatch(DrawerManagerSlice.actions.setOpenUserDrawer(false));
      }
      default: {
      }
    }
  };

  const DrawerList = (
    <Box sx={{ display: "flex" }} role="presentation" height={"100%"}>
      <CloseIcon
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          cursor: "pointer",
        }}
        color="error"
        onClick={handleCloseDrawer}
      />

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {children}
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={handleCloseDrawer}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}

export default SideDrawer;
