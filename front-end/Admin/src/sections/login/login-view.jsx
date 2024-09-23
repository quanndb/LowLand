import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useMutation } from "@tanstack/react-query";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import Iconify from "src/components/iconify";
import { useRouter } from "src/routes/hooks";
import { bgGradient } from "src/theme/css";
import Logo from "src/components/logo";
import authAPI from "src/services/API/authAPI";
import UserManagerSlice from "src/redux/slices/UserManagerSlice";
import { accessToken } from "src/redux/selectors/UserSelector";

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const token = useSelector(accessToken);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [attempt, setAttempt] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (userName === "" || passWord === "") {
      toast.error("Please enter your username and password");
      setAttempt(true);
      return;
    }
    login(
      {
        email: userName,
        password: passWord,
      },
      {
        onSuccess: (res) => {
          const accessToken = res.accessToken;
          if (
            jwtDecode(accessToken).scope !== "ADMIN" &&
            jwtDecode(accessToken).scope !== "EMPLOYEE"
          ) {
            toast.error("You are not able to login with this account");
            return;
          }
          dispatch(UserManagerSlice.actions.setUser(res));
          router.replace("/dashboard");
          toast.success("Login success!");
        },
      }
    );
  };

  const { mutate: login, isPending: isLogining } = useMutation({
    mutationKey: ["login", { userName }],
    mutationFn: (params) => authAPI.login(params),
  });

  if (
    token &&
    (jwtDecode(token).scope === "ADMIN" ||
      jwtDecode(token).scope === "EMPLOYEE")
  ) {
    return <Navigate to={"/dashboard"} replace={true} />;
  }

  const renderForm = (
    <>
      <Stack spacing={3} component={"form"} onSubmit={handleClick}>
        <TextField
          name="email"
          label="User Name"
          value={userName}
          error={attempt && userName === ""}
          disabled={isLogining}
          helperText={
            attempt && userName === "" ? "Please enter your username" : ""
          }
          autoComplete="username"
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          error={attempt && passWord === ""}
          disabled={isLogining}
          helperText={
            attempt && passWord === "" ? "Please enter your password" : ""
          }
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleClick}
          loading={isLogining}
          sx={{ mt: 3 }}
        >
          Login
        </LoadingButton>
      </Stack>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Box sx={{ p: 5, position: "fixed" }}>
        <Logo />
      </Box>

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Lowland Admin</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Lowland administrator for our shop
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Signin
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
