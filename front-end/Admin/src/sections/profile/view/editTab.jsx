import { Grid, Card, Typography, TextField, Box ,Button} from "@mui/material";

const EditTab = ({ user }) => {
  const { fullName, phoneNumber, email, address } = user;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
          >
            Edit Profile Information
          </Typography>
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              defaultValue={fullName}
              // onChange handler here if needed
            />
            <TextField
              fullWidth
              label="Mobile"
              defaultValue={phoneNumber}
              // onChange handler here if needed
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              defaultValue={email}
              // onChange handler here if needed
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Location"
              defaultValue={address}
              // onChange handler here if needed
              sx={{ mt: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Edit
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EditTab;
