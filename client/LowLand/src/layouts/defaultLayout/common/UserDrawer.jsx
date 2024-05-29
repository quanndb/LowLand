import { useDispatch, useSelector } from "react-redux";
import SideDrawer from "src/components/navigation/SideDrawer";
import { userDrawer } from "src/redux/selectors/DrawerSelector";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "src/routes/hooks";
import DrawerManagerSlice from "src/redux/slices/DrawerManagerSlice";

const UserDrawerContent = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    handleCloseUserDrawer();
    router.replace("/login");
  };

  const handleCloseUserDrawer = () => {
    dispatch(DrawerManagerSlice.actions.setOpenUserDrawer(false));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "800px",
        mt: "50px",
      }}
    >
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ padding: "5px 100px 5px 20px" }}
            onClick={() => {
              router.push("/user");
              handleCloseUserDrawer();
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ padding: "5px 100px 5px 20px" }}
            color={"error"}
            onClick={handleLogout}
          >
            <ListItemIcon>
              <LogoutIcon color={"error"} />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

const UserDrawer = () => {
  const open = useSelector(userDrawer);

  return (
    <SideDrawer open={open} drawer="user">
      <UserDrawerContent />
    </SideDrawer>
  );
};

export default UserDrawer;
