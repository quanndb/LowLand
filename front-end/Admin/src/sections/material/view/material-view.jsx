import { useEffect, useState } from "react";
import {
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  TableContainer,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import TableNoData from "../table-no-data";
import MaterialTableRow from "../material-table-row";
import MaterialTableHead from "../material-table-head";
import TableEmptyRows from "../table-empty-rows";
import MaterialTableToolbar from "../material-table-toolbar";
import { emptyRows, getComparator } from "../utils";
import { toast } from "react-toastify";
import materialAPI from "src/services/API/materialAPI";

export default function MaterialView() {
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    materialAPI
      .getAll()
      .then((res) => {
        setMaterials(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [newMaterial, setNewMaterial] = useState({
    materialName: "",
    quantity: "",
    minQuantity: "",
    unit: "",
  });

  const [editMaterial, setEditMaterial] = useState({
    materialName: "",
    quantity: "",
    minQuantity: "",
    unit: "",
  });

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = materials.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenEditModal = (material) => {
    setEditMaterial(material);
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (material) => {
    setEditMaterial(material);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditMaterial({
      materialId: null,
      materialName: "",
      quantity: "",
      minQuantity: "",
      unit: "",
    });
  };

  const handleChangeNewMaterial = (e) => {
    setNewMaterial({ ...newMaterial, [e.target.name]: e.target.value });
  };

  const handleChangeEditMaterial = (e) => {
    setEditMaterial({ ...editMaterial, [e.target.name]: e.target.value });
  };

  const handleSubmitNewMaterial = () => {
    materialAPI
      .update(newMaterial)
      .then((res) => {
        setMaterials([...materials, res]);
        toast.success("Add new material successfully");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setNewMaterial({
          materialName: "",
          quantity: "",
          minQuantity: "",
          unit: "",
        });
        setOpenAddModal(false);
      });
  };

  const handleSubmitEditMaterial = () => {
    materialAPI
      .update(editMaterial)
      .then((res) => {
        setMaterials(
          materials.map((material) =>
            material.materialId === res.materialId ? res : material
          )
        );
        toast.success("Update material successfully");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setEditMaterial({
          materialId: null,
          materialName: "",
          quantity: "",
          minQuantity: "",
          unit: "",
        });
        setOpenEditModal(false);
      });
  };

  const handleSubmitDeleteMaterial = () => {
    materialAPI
      .delete(editMaterial.materialId)
      .then((res) => {
        setMaterials(
          materials.filter(
            (material) => material.materialId !== editMaterial.materialId
          )
        );
        toast.success("Delete material successfully");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setOpenDeleteModal(false);
      });
  };

  const dataSorted = materials.slice().sort(getComparator(order, orderBy));

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        mb={5}
      >
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddModal}
        >
          NEW MATERIAL
        </Button>
      </Stack>

      <Card>
        <MaterialTableToolbar numSelected={selected.length} />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <MaterialTableHead
                order={order}
                orderBy={orderBy}
                rowCount={materials.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "index", label: "STT" },
                  { id: "materialName", label: "Material Name" },
                  { id: "quantity", label: "Quantity" },
                  { id: "minQuantity", label: "Min Quantity" },
                  { id: "unit", label: "Unit" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataSorted
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <MaterialTableRow
                      key={row.id}
                      STT={String((index += 1))}
                      materialName={row.materialName}
                      quantity={row.quantity}
                      unit={row.unit}
                      minQuantity={row.minQuantity}
                      selected={selected.indexOf(row.materialName) !== -1}
                      handleClick={(event) =>
                        handleClick(event, row.materialName)
                      }
                      handleEdit={() => handleOpenEditModal(row)}
                      handleDelete={() => handleOpenDeleteModal(row)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, materials.length)}
                />

                {!dataSorted.length && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={materials.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Add material Modal */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogContent>
          <TextField
            margin="dense"
            name="materialName"
            label="material name"
            type="text"
            fullWidth
            variant="outlined"
            value={newMaterial.materialName}
            onChange={handleChangeNewMaterial}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Quantity"
            type="text"
            fullWidth
            variant="outlined"
            value={newMaterial.quantity}
            onChange={handleChangeNewMaterial}
          />
          <TextField
            margin="dense"
            name="minQuantity"
            label="Min Quantity"
            type="text"
            fullWidth
            variant="outlined"
            value={newMaterial.minQuantity}
            onChange={handleChangeNewMaterial}
          />
          <TextField
            margin="dense"
            name="unit"
            label="Unit"
            type="text"
            fullWidth
            variant="outlined"
            value={newMaterial.unit}
            onChange={handleChangeNewMaterial}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button onClick={handleSubmitNewMaterial} color="primary">
            Add material
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add material Modal End */}

      {/* Edit material Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit material</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="materialName"
            label="material name"
            type="text"
            fullWidth
            variant="outlined"
            value={editMaterial.materialName}
            onChange={handleChangeEditMaterial}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Quantity"
            type="text"
            fullWidth
            variant="outlined"
            value={editMaterial.quantity}
            onChange={handleChangeEditMaterial}
          />
          <TextField
            margin="dense"
            name="minQuantity"
            label="Min Quantity"
            type="text"
            fullWidth
            variant="outlined"
            value={editMaterial.minQuantity}
            onChange={handleChangeEditMaterial}
          />
          <TextField
            margin="dense"
            name="unit"
            label="Unit"
            type="text"
            fullWidth
            variant="outlined"
            value={editMaterial.unit}
            onChange={handleChangeEditMaterial}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleSubmitEditMaterial} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit material Modal End */}

      {/* Delete material Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Delete material</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the material?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={handleSubmitDeleteMaterial} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
