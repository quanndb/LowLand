import { useEffect, useState } from "react";

import {
  Button,
  Container,
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
import DefaultLayout from "src/layouts/defaultLayout";
import LowLandLogo from "src/components/navigation/logo";
import { toast } from "react-toastify";
import { useRouter } from "src/routes/hooks";

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

  useEffect(() => {
    if (localStorage.accessToken) router.replace("/");
  }, []);

  return (
    <DefaultLayout notShowHeader={true}>
      <Container
        sx={{
          margin: "0px 0px",
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid
          container
          columns={{ xm: 1, md: 3 }}
          spacing={5}
          justifyContent={"space-evenly"}
        >
          <Grid
            item
            md={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Paper
              sx={{
                padding: "15px 100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <LowLandLogo />

              <Typography
                variant="h4"
                textAlign={"center"}
                fontWeight={900}
                sx={{
                  margin: "30px 20px",
                }}
              >
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
      </Container>
    </DefaultLayout>
  );
};

export default LoginView;
