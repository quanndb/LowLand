import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Box,
  Container,
  TableBody,
  TableContainer,
  TablePagination,
  Tab,
  Tabs,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import UserTableToolbar from "../user-table-toolbar";
import accountAPI from "src/services/API/accountsAPI";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "src/hooks/use-debounce";
import LoadingComp from "src/components/loading/LoadingComp";
import InnerLoading from "src/components/loading/InnerLoading";

export default function UserPage() {
  const options = [
    {
      role: "ADMIN",
      value: 0,
    },
    {
      role: "EMPLOYEE",
      value: 1,
    },
    {
      role: "CUSTOMER",
      value: 2,
    },
  ];

  const [tabValue, setTabValue] = useState(options[0]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("email");
  const [filterName, setFilterName] = useState("");
  const query = useDebounce(filterName, 500);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [password, setPassword] = useState({
    value: null,
    showPassword: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: null,
    showPassword: false,
  });

  const defaultUser = {
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    gender: 1,
    address: "",
    role: tabValue.role,
  };

  const [userInfo, setUserInfo] = useState(defaultUser);

  const [editUserInfo, setEditUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(defaultUser);
  }, [tabValue]);

  const { data: accounts, refetch } = useQuery({
    queryKey: [
      "accounts",
      {
        role: tabValue.role,
        page: page + 1,
        size: rowsPerPage,
        query: query,
        sortedBy: orderBy,
        sortDirection: order.toLocaleUpperCase(),
      },
    ],
    queryFn: () =>
      accountAPI.getAccounts({
        role: tabValue.role,
        page: page + 1,
        size: rowsPerPage,
        query: query,
        sortedBy: orderBy,
        sortDirection: order.toLocaleUpperCase(),
      }),
  });

  const { mutate: createAccount, isPending: isCreating } = useMutation({
    mutationKey: ["createAccount", userInfo],
    mutationFn: (params) => accountAPI.createAccount(params),
  });

  const { mutate: deleteAccounts, isPending: isDeleting } = useMutation({
    mutationKey: (ids) => ["deleteAccounts", { accountIds: ids }],
    mutationFn: (ids) => {
      return Promise.all(ids.map((id) => accountAPI.deleteAccount(id)));
    },
  });

  const { mutate: deleteAccount, isPending: isDeletingAccount } = useMutation({
    mutationKey: (id) => ["deleteAccount", id],
    mutationFn: (id) => accountAPI.deleteAccount(id),
  });

  const { mutate: updateAccount, isPending: isUpdating } = useMutation({
    mutationKey: ["updateAccount", editUserInfo?.accountId],
    mutationFn: ({ accountId, params }) =>
      accountAPI.updateAccount(accountId, params),
  });

  const handleSubmitNewUser = () => {
    createAccount(userInfo, {
      onSuccess: () => {
        toast.success("Create account successfully");
        setOpenAddModal(false);
        setUserInfo(defaultUser);
        refetch();
      },
    });
  };

  const handleDeleteAll = () => {
    deleteAccounts(selected, {
      onSuccess: () => {
        toast.success("Delete accounts successfully");
        setSelected([]);
        refetch();
      },
    });
  };

  const handleDeleteUser = (user) => {
    deleteAccount(user.accountId, {
      onSuccess: () => {
        toast.success("Delete account successfully");
        refetch();
      },
    });
  };

  const handleOpenEditModal = (user) => {
    setEditUserInfo(user);
    setOpenEditModal(true);
  };

  const handleSubmitEditUser = () => {
    const formData = new FormData();
    const userInfo = {
      fullName: editUserInfo.fullName,
      phoneNumber: editUserInfo.phoneNumber,
      gender: editUserInfo.gender,
      address: editUserInfo.address,
      isActive: editUserInfo.isActive,
      password: password.value,
    };

    formData.append("userInfo", JSON.stringify(userInfo));

    updateAccount(
      { accountId: editUserInfo.accountId, params: formData },
      {
        onSuccess: () => {
          toast.success("Update account successfully");
          setOpenEditModal(false);
          setPassword({ value: null, showPassword: false });
          setConfirmPassword({ value: null, showPassword: false });
          refetch();
        },
      }
    );
  };

  // const [openAddModal, setOpenAddModal] = useState(false);
  // const [openEditModal, setOpenEditModal] = useState(false);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // const [newUser, setNewUser] = useState({
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   phoneNumber: "",
  //   gender: 1,
  //   address: "",
  //   role: tabValue === 0 ? "ADMIN" : tabValue === 1 ? "EMPLOYEE" : "USER",
  // });

  // const [editUser, setEditUser] = useState({
  //   id: null,
  //   fullName: "",
  //   email: "",
  //   phoneNumber: "",
  //   gender: 1,
  //   address: "",
  // });

  // const handleSort = (event, id) => {
  //   const isAsc = orderBy === id && order === "asc";
  //   if (id !== "") {
  //     setOrder(isAsc ? "desc" : "asc");
  //     setOrderBy(id);
  //   }
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = filteredAccounts.map((n) => n.email);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setPage(0);
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  // const handleTabChange = (event, newValue) => {
  //   setTabValue(newValue);
  //   setNewUser({
  //     fullName: "",
  //     email: "",
  //     password: "",
  //     phoneNumber: "",
  //     gender: 1,
  //     address: "",
  //     role: newValue === 0 ? "ADMIN" : newValue === 1 ? "EMPLOYEE" : "USER",
  //   });
  //   setPage(0);
  // };

  // const handleOpenAddModal = () => {
  //   setOpenAddModal(true);
  // };

  // const handleCloseAddModal = () => {
  //   setOpenAddModal(false);
  // };

  // const handleOpenEditModal = (user) => {
  //   setEditUser(user);
  //   setOpenEditModal(true);
  // };

  // const handleOpenDeleteModal = (user) => {
  //   setEditUser(user);
  //   setOpenDeleteModal(true);
  // };

  // const handleCloseDeleteModal = () => {
  //   // setDeleteUser(null);
  //   setOpenDeleteModal(false);
  // };

  // const handleCloseEditModal = () => {
  //   setOpenEditModal(false);
  //   setEditUser({
  //     id: null,
  //     fullName: "",
  //     email: "",
  //     phoneNumber: "",
  //     gender: "",
  //     address: "",
  //     role: "",
  //   });
  // };

  // const handleChangeNewUser = (e) => {
  //   setNewUser({ ...newUser, [e.target.name]: e.target.value });
  // };

  // const handleChangeEditUser = (e) => {
  //   setEditUser({ ...editUser, [e.target.name]: e.target.value });
  // };

  // const handleSubmitNewUser = () => {
  //   accountAPI
  //     .createAccount(newUser)
  //     .then((res) => {
  //       toast.success("Create user successfully");
  //       setAccounts([...accounts, res]);
  //     })
  //     .catch((err) => {
  //       toast.error(err);
  //     })
  //     .finally(() => {
  //       setNewUser({
  //         fullName: "",
  //         email: "",
  //         password: "",
  //         phoneNumber: "",
  //         gender: 1,
  //         address: "",
  //         role: tabValue === 0 ? "ADMIN" : tabValue === 1 ? "EMPLOYEE" : "USER",
  //       });
  //     });
  //   setOpenAddModal(false);
  // };

  // const handleSubmitEditUser = () => {
  //   accountAPI
  //     .updateAccount(editUser)
  //     .then((res) => {
  //       toast.success("Update user successfully");
  //       console.log(res, editUser);
  //       setAccounts(
  //         accounts.map((account) => {
  //           return account.accountId === res.accountId ? res : account;
  //         })
  //       );
  //     })
  //     .catch((err) => {
  //       toast.error(err);
  //     });
  //   setOpenEditModal(false);
  // };

  // const handleSubmitDeleteUser = () => {
  //   accountAPI
  //     .deleteAccount(editUser.accountId)
  //     .then((res) => {
  //       toast.success("Delete user successfully");
  //       setAccounts(
  //         accounts.filter((account) => account.accountId !== editUser.accountId)
  //       );
  //     })
  //     .catch((err) => {
  //       toast.error(err);
  //     });
  //   setOpenDeleteModal(false);
  // };

  // const filteredAccounts = getFilteredAccountsByRole(role);

  // const dataFiltered = applyFilter({
  //   inputData: filteredAccounts,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Users
      </Typography>
      <Card
        mb={5}
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          mb: 3,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
          <Tabs
            value={tabValue.value}
            onChange={(e, v) => setTabValue(options[v])}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab label="ADMIN" />
            <Tab label="EMPLOYEE" />
            <Tab label="CUSTOMER" />
          </Tabs>
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenAddModal(true)}
          sx={{ mt: { xs: 2, sm: 0 }, width: { xs: "100%", sm: "auto" } }}
        >
          NEW {tabValue.role}
        </Button>
      </Card>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onDeleting={() => handleDeleteAll()}
          onFilterName={(e) => setFilterName(e.target.value)}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={accounts ? accounts?.response.length : 0}
                numSelected={selected.length}
                onRequestSort={(e, p) => {
                  if (p !== "avatarUrl") setOrderBy(p);
                  setOrder((o) => (o === "asc" ? "desc" : "asc"));
                }}
                onSelectAllClick={() =>
                  // just only page
                  setSelected((prev) =>
                    prev.length
                      ? []
                      : accounts.response.map((row) => row.accountId)
                  )
                }
                headLabel={[
                  { id: "avatarUrl", label: "Avatar" },
                  { id: "email", label: "Email" },
                  { id: "full_name", label: "Full Name" },
                  { id: "role", label: "Role" },
                  { id: "gender", label: "Gender" },
                  { id: "phone_number", label: "Phone Number" },
                  { id: "is_active", label: "Status" },
                  { id: "" },
                ]}
              />
              <TableBody
                sx={{
                  width: "100%",
                }}
              >
                {accounts ? (
                  accounts.response.map((row) => (
                    <UserTableRow
                      key={row.accountId}
                      email={row.email}
                      full_name={row.fullName}
                      role={row.role}
                      gender={{ 1: "Male", 0: "Female" }[row.gender]}
                      phone_number={row.phoneNumber}
                      avatarUrl={row.imageURL}
                      selected={selected.indexOf(row.accountId) !== -1}
                      isActive={row.isActive}
                      handleClick={() =>
                        setSelected((prev) => {
                          const selectedIndex = prev.indexOf(row.accountId);
                          if (selectedIndex === -1) {
                            return [...prev, row.accountId];
                          }
                          return prev.filter(
                            (index) => index !== row.accountId
                          );
                        })
                      }
                      handleEdit={() => handleOpenEditModal(row)}
                      handleDelete={() => handleDeleteUser(row)}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <InnerLoading
                        isLoading={true}
                        sx={{ position: "none", m: "auto" }}
                      />
                    </TableCell>
                  </TableRow>
                )}

                {accounts && accounts.response.length === 0 && (
                  <TableNoData query={filterName} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={accounts ? accounts.totalRecords : 1}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={(e, v) => setPage(v)}
          onRowsPerPageChange={(e) => setRowsPerPage(e.target.value)}
        />
      </Card>

      {/* Add User Modal */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <DialogTitle>New {tabValue?.role}</DialogTitle>
        <form>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="fullName"
              label="Full Name"
              type="text"
              fullWidth
              autoComplete="fullName"
              variant="outlined"
              value={userInfo.fullName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, fullName: e.target.value })
              }
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              fullWidth
              variant="outlined"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              autoComplete="password"
              fullWidth
              variant="outlined"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            />
            <TextField
              margin="dense"
              name="phoneNumber"
              autoComplete="phoneNumber"
              label="Phone Number"
              type="text"
              fullWidth
              variant="outlined"
              value={userInfo.phoneNumber}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phoneNumber: e.target.value })
              }
            />
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label2">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                value={userInfo.gender}
                name="gender"
                label="Gender"
                autoComplete="gender"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, gender: e.target.value })
                }
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={0}>Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="address"
              autoComplete="address"
              label="Address"
              type="text"
              fullWidth
              variant="outlined"
              value={userInfo.address}
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
            />
          </DialogContent>
        </form>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
          <Button onClick={handleSubmitNewUser} color="primary">
            Add {tabValue?.role}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add User Modal End */}

      {/* Edit User Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit {tabValue?.role}</DialogTitle>
        <form>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="fullName"
              label="Full Name"
              autoComplete="fullName"
              type="text"
              fullWidth
              variant="outlined"
              value={editUserInfo?.fullName}
              onChange={(e) =>
                setEditUserInfo((pre) => ({ ...pre, fullName: e.target.value }))
              }
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={editUserInfo?.email}
              disabled
            />
            <TextField
              margin="dense"
              name="phoneNumber"
              label="Phone Number"
              type="text"
              autoComplete="phoneNumber"
              fullWidth
              variant="outlined"
              value={editUserInfo?.phoneNumber}
              onChange={(e) => {
                setEditUserInfo((pre) => ({
                  ...pre,
                  phoneNumber: e.target.value,
                }));
              }}
            />
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={editUserInfo?.gender}
                name="gender"
                label="Gender"
                autoComplete="gender"
                onChange={(e) => {
                  setEditUserInfo((pre) => ({
                    ...pre,
                    gender: e.target.value,
                  }));
                }}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={0}>Female</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              autoComplete="address"
              fullWidth
              variant="outlined"
              value={editUserInfo?.address}
              onChange={(e) => {
                setEditUserInfo((pre) => ({
                  ...pre,
                  address: e.target.value,
                }));
              }}
            />
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label">Active</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={editUserInfo?.isActive ? 1 : 0}
                name="isActive"
                label="Active"
                autoComplete="isActive"
                onChange={(e) => {
                  setEditUserInfo((pre) => ({
                    ...pre,
                    isActive: e.target.value,
                  }));
                }}
              >
                <MenuItem value={1}>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    <Iconify
                      icon="teenyicons:tick-circle-solid"
                      sx={{ color: "green", mr: 1 }}
                    />
                    Active
                  </Typography>
                </MenuItem>
                <MenuItem
                  value={0}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    <Iconify
                      icon="zondicons:close-solid"
                      sx={{ color: "#ba1f1d", mr: 1 }}
                    />
                    Inactive
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="password"
              label="Password"
              autoComplete="password"
              type={password.showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={password?.value ? password?.value : ""}
              onChange={(e) => {
                setPassword((pre) => ({ ...pre, value: e.target.value }));
              }}
            />
            <TextField
              margin="dense"
              name="confirmPassword"
              label="Confirm Password"
              autoComplete="confirmPassword"
              type={confirmPassword.showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              error={
                password?.value && password?.value !== confirmPassword?.value
              }
              helperText={
                password?.value && password?.value !== confirmPassword?.value
                  ? "Passwords do not match"
                  : ""
              }
              value={confirmPassword?.value ? confirmPassword?.value : ""}
              onChange={(e) => {
                setConfirmPassword((pre) => ({
                  ...pre,
                  value: e.target.value,
                }));
              }}
            />
          </DialogContent>
        </form>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button onClick={handleSubmitEditUser} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit User Modal End */}

      <LoadingComp
        isLoading={isCreating || isDeleting || isDeletingAccount || isUpdating}
      />
    </Container>
  );
}
