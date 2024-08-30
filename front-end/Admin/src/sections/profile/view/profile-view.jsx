import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Avatar,
  Breadcrumbs,
  Link,
  Box,
  Card,
  IconButton,
  Stack,
  Grid,
} from "@mui/material";

import DetailsTab from "./detailsTab";
import EditTab from "./editTab";
import ChangePasswordTab from "./changePassword";
import { user } from "src/redux/selectors/UserSelector";
import { useMutation } from "@tanstack/react-query";
import accountAPI from "src/services/API/accountsAPI";
import UserManagerSlice from "src/redux/slices/UserManagerSlice";
import Iconify from "src/components/iconify";
import { useRouter } from "src/routes/hooks";
import { toast } from "react-toastify";
import LoadingComp from "src/components/loading/LoadingComp";

export default function ProfileView() {
  const dispatch = useDispatch();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const userData = useSelector(user);

  const [editData, setEditData] = useState(userData);
  const [file, setFile] = useState(null);

  const handleChangeAvatar = (e) => {
    const input = e.target.files[0];
    setFile(input);
    input.preview = URL.createObjectURL(input);
  };

  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationKey: ["updateProfile", { accountId: userData.accountId }],
    mutationFn: ({ accountId, params }) =>
      accountAPI.updateAccount(accountId, params),
  });

  const handleSubmit = () => {
    const formEditData = new FormData();
    formEditData.append("userInfo", JSON.stringify(editData));
    if (file) {
      formEditData.append("image", file);
    }

    updateProfile(
      { accountId: userData.accountId, params: formEditData },
      {
        onSuccess: (res) => {
          dispatch(UserManagerSlice.actions.updateUser(res));
          toast.success("Update profile successfully");
          setEditData(res);
          setFile(null);
        },
      }
    );
  };

  return (
    <Container>
      <Box sx={{ marginBottom: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            href="/admin/dashboard"
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard");
            }}
          >
            Home
          </Link>
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
      </Box>

      <Card sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            height: "300px",
            borderRadius: "8px",
            backgroundSize: "contain",
            background:
              "linear-gradient(195deg, rgba(73, 163, 241, 0.6), rgba(26, 115, 232, 0.6)) 50% center / cover, url(/static/images/bg_profile.jpeg)",
            backgroundPosition: "50% center",
            overflow: "hidden",
          }}
        />
        <Grid
          container
          sx={{
            justifyContent: "space-between",
            mt: -8,
            backgroundColor: "white",
            borderRadius: "8px",
            px: 5,
            py: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "start" },
              columnGap: 2,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={
                  file
                    ? file.preview
                    : userData.imageURL
                    ? userData.imageURL
                    : ""
                }
                alt={userData.email}
                sx={{
                  width: 80,
                  height: 80,
                }}
              />
              <IconButton
                component={"label"}
                sx={{
                  position: "absolute",
                  bottom: -10,
                  right: -10,
                  backgroundColor: "var(--secondary-color)",
                  color: "white",
                  borderRadius: "50%",
                  width: 35,
                  height: 35,
                  padding: 0,
                  "&:hover": {
                    backgroundColor: "var(--secondary-color)",
                    opacity: 0.8,
                  },
                }}
                color="primary"
              >
                <Iconify
                  icon="iconamoon:edit"
                  sx={{
                    with: 50,
                    height: 50,
                  }}
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleChangeAvatar}
                />
              </IconButton>
            </Box>

            <Box
              sx={{
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Typography variant="h5">{userData.fullName}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {userData.role}
              </Typography>
            </Box>
          </Grid>

          <Grid item sx={{ alignSelf: "end" }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                rowGap: 1,
              }}
            >
              <IconButton
                sx={{
                  borderRadius: "4px",
                  fontSize: "17px",
                  borderBottom: activeTab === "details" ? "2px solid" : "none",
                }}
                color={activeTab === "details" ? "primary" : "inherit"}
                aria-label="details"
                onClick={() => setActiveTab("details")}
              >
                Details
              </IconButton>
              <IconButton
                sx={{
                  borderRadius: "4px",
                  fontSize: "17px",
                  borderBottom: activeTab === "edit" ? "2px solid" : "none",
                }}
                color={activeTab === "edit" ? "primary" : "inherit"}
                aria-label="edit"
                onClick={() => setActiveTab("edit")}
              >
                Edit
              </IconButton>
              <IconButton
                sx={{
                  borderRadius: "4px",
                  fontSize: "17px",
                  borderBottom:
                    activeTab === "changePassword" ? "2px solid" : "none",
                }}
                color={activeTab === "changePassword" ? "primary" : "inherit"}
                aria-label="password"
                onClick={() => setActiveTab("changePassword")}
              >
                Change Password
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      {activeTab === "details" && <DetailsTab user={userData} />}
      {activeTab === "edit" && (
        <EditTab
          editData={editData}
          setEditData={setEditData}
          onSubmit={handleSubmit}
          disable={
            editData.fullName === userData.fullName &&
            editData.phoneNumber === userData.phoneNumber &&
            editData.address === userData.address &&
            editData.gender === userData.gender &&
            !file
          }
        />
      )}
      {activeTab === "changePassword" && (
        <ChangePasswordTab
          editData={editData}
          setEditData={setEditData}
          onSubmit={handleSubmit}
          disable={!editData?.password}
        />
      )}
      <LoadingComp isLoading={isUpdating} />
    </Container>
  );
}
