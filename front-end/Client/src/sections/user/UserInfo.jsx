import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { user as UserSelector } from "src/redux/selectors/UserSelector";
import accountAPI from "src/services/API/accountAPI";
import { useMutation } from "@tanstack/react-query";
import UserManagerSlice from "src/redux/slices/UserManagerSlice";
import { toast } from "react-toastify";
import InnerLoading from "src/components/InnerLoading";
import SectionTitleB from "src/components/SectionTitleB";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const UserInfo = () => {
  const user = useSelector(UserSelector);
  const dispatch = useDispatch();

  const [tab, setTab] = useState(0);
  const [file, setFile] = useState(null);
  const [fullName, setFullName] = useState(user.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || null);
  const [address, setAddress] = useState(user.address || null);
  const [gender, setGender] = useState(user.gender);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleChangeAvatar = (e) => {
    const input = e.target.files[0];
    setFile(input);
    input.preview = URL.createObjectURL(input);
  };

  const { mutate: updateUser, isPending } = useMutation({
    mutationKey: ["user", user.accountId],
    mutationFn: (formData) => accountAPI.update(user.accountId, formData),
  });

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    const formData = new FormData();
    formData.append(
      "userInfo",
      JSON.stringify({ fullName, phoneNumber, address, gender, password })
    );
    if (file) {
      formData.append("image", file);
    }

    updateUser(formData, {
      onSuccess: (data) => {
        dispatch(UserManagerSlice.actions.updateUser(data));
        toast.success("Update successfully");
        setFile(null);
        setPassword("");
        setConfirmPassword("");
      },
    });
  };

  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <Box sx={{ position: "relative", width: "100%", mb: 5 }}>
      <SectionTitleB sx={{ textAlign: "left" }}>User information</SectionTitleB>
      <InnerLoading
        isLoading={isPending}
        sx={{ backgroundColor: "white", zIndex: 2 }}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            position: "relative",
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          <Avatar
            alt="avatar"
            title={user?.imageName || "user avatar"}
            src={file ? file.preview : user.imageURL ? user.imageURL : ""}
            sx={{ width: 180, height: 180, margin: "auto", mb: 3 }}
          />
          <IconButton
            component={"label"}
            sx={{
              position: "absolute",
              borderRadius: "50%",
              bottom: "10px",
              right: "15px",
              backgroundColor: "var(--secondary-color)",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
                opacity: ".8",
              },
            }}
          >
            <CreateIcon sx={{ color: "white" }} />
            <input
              type="file"
              onChange={handleChangeAvatar}
              style={{ display: "none" }}
            />
          </IconButton>
        </Box>
        <TabContext value={tab}>
          <TabList onChange={(e, v) => setTab(v)} aria-label="user tabs">
            <Tab label={"User info"} value={0}>
              User info
            </Tab>
            <Tab label={"Change password"} value={1}>
              Change password
            </Tab>
          </TabList>
          <TabPanel
            value={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              display: tab === 0 ? "flex" : "none",
            }}
          >
            <TextField
              sx={{ m: 2, width: "100%" }}
              value={user.email}
              label="Email"
              disabled
            ></TextField>
            <TextField
              sx={{ m: 2, width: "100%" }}
              value={fullName}
              label="Full Name"
              onChange={(e) => setFullName(e.target.value)}
            ></TextField>
            <FormControl fullWidth sx={{ my: 2, textAlign: "left" }}>
              <InputLabel id="demo-simple-select-label2">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                value={gender}
                name="gender"
                label="Gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={0}>Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ m: 2, width: "100%" }}
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></TextField>
            <TextField
              sx={{ m: 2, width: "100%" }}
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></TextField>
          </TabPanel>
          <TabPanel
            value={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              display: tab === 1 ? "flex" : "none",
            }}
          >
            <TextField
              sx={{ m: 2, width: "100%" }}
              label="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <TextField
              sx={{ m: 2, width: "100%" }}
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              error={password && password !== confirmPassword}
              helperText={
                password && password !== confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
            />
          </TabPanel>
        </TabContext>
        <Button
          variant="contained"
          onClick={handleUpdate}
          disabled={
            fullName === user.fullName &&
            phoneNumber === user.phoneNumber &&
            address === user.address &&
            gender === user.gender &&
            !file &&
            !password
          }
        >
          Update profile
        </Button>
      </Box>
    </Box>
  );
};

export default UserInfo;
