import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import DrawerManagerSlice from "src/redux/slices/DrawerManagerSlice";
import UserManagerSlice from "src/redux/slices/UserManagerSlice";
import { userDrawer } from "src/redux/selectors/DrawerSelector";

import SideDrawer from "src/components/navigation/SideDrawer";
import useGetResize from "src/hooks/use-get-resize";
import { useRouter } from "src/routes/hooks";
import authAPI from "src/services/API/authAPI";

const UserDrawerContent = () => {
  const [windowWidth, setWindowWidth] = useGetResize();

  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogout = () => {
    authAPI
      .logout()
      .then(() => {
        dispatch(UserManagerSlice.actions.removeUser());
        handleCloseUserDrawer();
        router.replace("/login");
      })
      .catch((error) => {
        toast.error(error);
      });
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
        minWidth: windowWidth < 350 ? windowWidth : "350px",
        mt: "50px",
      }}
    >
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ pl: "20px", pr: "80px" }}
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
            sx={{ pl: "20px", pr: "80px" }}
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
