import { Grid, Card, Typography, TextField, Box, Button } from "@mui/material";
import { useState } from "react";

const ChangePasswordTab = ({ user }) => {
  const { password } = user;

  const [formValues, setFormValues] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formValues.oldPassword !== password) {
      alert("Old password is incorrect");
      return;
    }

    if (formValues.newPassword !== formValues.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    console.log("Password change request:", formValues);

    setFormValues({
      username: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="medium" gutterBottom>
            Change Password
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Please fill out the following fields to change your password.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Old Password"
              type="password"
              name="oldPassword"
              value={formValues.oldPassword}
              onChange={handleChange}
              autoComplete="current-password"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Change Password
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChangePasswordTab;
