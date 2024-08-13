
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

import {
    Typography,
    Box,
    Grid,
    Card,
    Switch,
    IconButton,
  } from "@mui/material";
const DetailsTab = ({ user }) => {
  const { followsMe, answersPost, mentionsMe, newLaunches, productUpdate, newsletter } = user;

  return (
    <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Card sx={{ p: 3, boxShadow: "none" }}>
        <Typography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          Platform Settings
        </Typography>
        <Box pt={1} pb={2} px={2} lineHeight={1.25}>
          <Typography
            variant="caption"
            fontWeight="bold"
            color="text"
            textTransform="uppercase"
          >
            Account
          </Typography>
          <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <Box mt={0.5}>
              <Switch
                checked={followsMe}
                onChange={() => setFollowsMe(!followsMe)}
              />
            </Box>
            <Box width="80%" ml={0.5}>
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
              >
                Email me when someone follows me
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <Box mt={0.5}>
              <Switch
                checked={answersPost}
                onChange={() => setAnswersPost(!answersPost)}
              />
            </Box>
            <Box width="80%" ml={0.5}>
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
              >
                Email me when someone answers on my post
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <Box mt={0.5}>
              <Switch
                checked={mentionsMe}
                onChange={() => setMentionsMe(!mentionsMe)}
              />
            </Box>
            <Box width="80%" ml={0.5}>
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
              >
                Email me when someone mentions me
              </Typography>
            </Box>
          </Box>
          <Box mt={3}>
            <Typography
              variant="caption"
              fontWeight="bold"
              color="text"
              textTransform="uppercase"
            >
              Application
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <Box mt={0.5}>
              <Switch
                checked={newLaunches}
                onChange={() => setNewLaunches(!newLaunches)}
              />
            </Box>
            <Box width="80%" ml={0.5}>
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
              >
                New launches and projects
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <Box mt={0.5}>
              <Switch
                checked={productUpdate}
                onChange={() => setProductUpdate(!productUpdate)}
              />
            </Box>
            <Box width="80%" ml={0.5}>
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
              >
                Monthly product updates
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <Box mt={0.5}>
              <Switch
                checked={newsletter}
                onChange={() => setNewsletter(!newsletter)}
              />
            </Box>
            <Box width="80%" ml={0.5}>
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
              >
                Subscribe to newsletter
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
    <Grid item xs={12} md={6}>
      <Card sx={{ p: 3 }}>
        <Typography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          Profile Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {user.bio}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">
            <strong>Full Name:</strong> {user.fullName}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Phone Number:</strong> {user.phoneNumber}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Location:</strong> {user.address}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Social:</strong>
            </Typography>
            <Box>
              <IconButton color="primary" aria-label="facebook">
                <Facebook />
              </IconButton>
              <IconButton color="primary" aria-label="twitter">
                <Twitter />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <Instagram />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  </Grid>
  );
};

export default DetailsTab;
