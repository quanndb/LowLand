import {
  Grid,
  Card,
  Typography,
  TextField,
  Box,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const EditTab = ({ editData, setEditData, onSubmit, disable }) => {
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
              label="Email"
              value={editData.email}
              disabled
            />
            <TextField
              fullWidth
              label="Full Name"
              value={editData.fullName}
              sx={{ mt: 2 }}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
            />
            <FormControl fullWidth sx={{ my: 2, textAlign: "left" }}>
              <InputLabel id="demo-simple-select-label2">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                value={editData.gender}
                name="gender"
                label="Gender"
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    gender: Number(e.target.value),
                  }));
                }}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={0}>Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Mobile"
              value={editData.phoneNumber}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              sx={{ mt: 2 }}
            />

            <TextField
              fullWidth
              label="Location"
              value={editData.address}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, address: e.target.value }))
              }
              sx={{ mt: 2 }}
            />

            <TextField
              fullWidth
              label="Position"
              value={editData?.position || ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, position: e.target.value }))
              }
              sx={{ mt: 2 }}
            />

            <TextField
              fullWidth
              label="Description"
              value={editData?.description || ""}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              sx={{ mt: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, mx: { xs: "auto", sm: 0 }, display: "block", px: 5 }}
              disabled={disable}
              onClick={onSubmit}
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
