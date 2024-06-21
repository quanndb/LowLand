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
import { useRouter } from "src/routes/hooks";
import SideLayout from "src/layouts/sideLayout";
import accountAPI from "src/services/API/accountAPI";
import { toast } from "react-toastify";

const SignUpPageView = () => {
  const router = useRouter();

  const [attempt, setAttempt] = useState(false);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [showPass, setShowPass] = useState(false);

  const handleSignUp = () => {
    if (!username || !password || !confirmPass || !fullName || !phone) {
      setAttempt(true);
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPass) {
      toast.error("Password not match");
      return;
    }
    accountAPI
      .register({
        email: username,
        password: password,
        fullName: fullName,
        phoneNumber: phone,
      })
      .then((res) => {
        router.push("/login");
        toast.success("Sign up successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <SideLayout title={"Login"}>
      <Paper sx={{ my: "100px" }}>
        <Grid
          container
          columns={{ xm: 1, md: 3 }}
          spacing={4}
          justifyContent={"space-evenly"}
          sx={{ p: "30px" }}
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
                backgroundImage:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/static/images/shop2.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <LowLandLogo />

              <Typography
                variant="h4"
                textAlign={"center"}
                fontWeight={900}
                color={"#fff"}
                sx={{
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)",
                  WebkitTextStroke: "1px #eee",
                }}
              >
                Sign Up to join our Chill'in
              </Typography>
            </Paper>
          </Grid>
          <Grid item sm={1} md={1}>
            <TextField
              label="Email"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ width: "100%", marginBottom: "20px" }}
              error={username === "" && attempt}
              helperText={username === "" && attempt && "Email cannot be empty"}
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
              error={password === "" && attempt}
              helperText={
                password === "" && attempt && "Password cannot be empty"
              }
            />
            <TextField
              label="ConfirmPass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
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
              error={confirmPass === "" && attempt}
              helperText={
                confirmPass === "" && attempt && "Password cannot be empty"
              }
            />
            <TextField
              label="FullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{ width: "100%", marginBottom: "20px" }}
              error={fullName === "" && attempt}
              helperText={
                fullName === "" && attempt && "FullName cannot be empty"
              }
            />
            <TextField
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ width: "100%", marginBottom: "20px" }}
              error={phone === "" && attempt}
              helperText={
                phone === "" && attempt && "Phone Number cannot be empty"
              }
            />

            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>

            <Typography sx={{ mt: "20px" }}>
              Clicking on "Sign Up" means you agree to our{" "}
              <a href="#">terms and conditions</a>
            </Typography>
            <Typography textAlign={"center"} sx={{ mt: "20px" }}>
              Already have an account?{" "}
              <Button
                sx={{ textDecoration: "underline" }}
                color="secondary"
                onClick={() => router.replace("/login")}
              >
                Login
              </Button>
              now!
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </SideLayout>
  );
};

export default SignUpPageView;
