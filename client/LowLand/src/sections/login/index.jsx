import { useState } from "react";

import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import authAPI from "src/services/API/authAPI";
import LowLandLogo from "src/components/navigation/logo";
import { toast } from "react-toastify";
import { useRouter } from "src/routes/hooks";
import SideLayout from "src/layouts/sideLayout";

const LoginView = () => {
  const router = useRouter();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    authAPI
      .login({
        email: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        toast.success("Logged in successfully");
        router.replace("/");
      })
      .catch((error) => toast.error(error))
      .finally(() => console.log("Done!"));
  };

  return (
    <SideLayout title={"Login"}>
      <Grid
        container
        columns={{ xm: 1, md: 3 }}
        spacing={4}
        justifyContent={"space-evenly"}
      >
        <Grid
          item
          md={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              py: "20px",
            }}
          >
            <LowLandLogo />

            <Typography variant="h4" textAlign={"center"} fontWeight={900}>
              Login to join our Chill'in
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={1} md={1}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPass ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </SideLayout>
  );
};

export default LoginView;
