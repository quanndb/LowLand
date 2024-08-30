import { Grid, Card, Typography, TextField, Box, Button } from "@mui/material";
import { useState } from "react";

const ChangePasswordTab = ({ editData, setEditData, disable, onSubmit }) => {
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
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              name="newPassword"
              value={editData?.password ? editData.password : ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, password: e.target.value }))
              }
              autoComplete="new-password"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={editData?.confirmPassword ? editData.confirmPassword : ""}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              error={editData?.password !== editData?.confirmPassword}
              helperText={
                editData?.password !== editData?.confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
              autoComplete="confirm-password"
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, mx: { xs: "auto", sm: 0 }, display: "block", px: 5 }}
              disabled={
                disable || editData?.password !== editData?.confirmPassword
              }
              onClick={onSubmit}
            >
              Change Password
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChangePasswordTab;
