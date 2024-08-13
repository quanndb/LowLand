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
import SizeTableRow from "../size-table-row";
import SizeTableHead from "../size-table-head";
import TableEmptyRows from "../table-empty-rows";
import SizeTableToolbar from "../size-table-toolbar";
import { emptyRows, getComparator } from "../utils";
import sizeAPI from "src/services/API/sizeAPI";
import { toast } from "react-toastify";

export default function SizeView() {
  const [sizes, setSizes] = useState([]);
  useEffect(() => {
    sizeAPI
      .getAll()
      .then((res) => {
        setSizes(res);
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

  const [newsize, setNewsize] = useState({
    sizeName: "",
    description: "",
    price: "", // Thêm price vào state
  });

  const [editsize, setEditsize] = useState({
    productSizeId: null,
    sizeName: "",
    description: "",
    price: "", // Thêm price vào state
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
      const newSelecteds = sizes.map((n) => n.name);
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

  const handleOpenEditModal = (size) => {
    setEditsize(size);
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (size) => {
    setEditsize(size);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditsize({
      id: null,
      sizeName: "",
      description: "",
      price: "", // Reset price
    });
  };

  const handleChangeNewSize = (e) => {
    setNewsize({ ...newsize, [e.target.name]: e.target.value });
  };

  const handleChangeEditSize = (e) => {
    setEditsize({ ...editsize, [e.target.name]: e.target.value });
  };

  const handleSubmitNewSize = () => {
    sizeAPI
      .update(newsize)
      .then((res) => {
        setSizes([...sizes, res]);
        toast.success("Add new size successfully");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setNewsize({
          sizeName: "",
          description: "",
          price:""
        });
        setOpenAddModal(false);
      });
  };

  const handleSubmitEditSize = () => {
    sizeAPI
      .update(editsize)
      .then((res) => {
        setSizes(
          sizes.map((size) =>
            size.productSizeId === res.productSizeId ? res : size
          )
        );
        toast.success("Update size successfully");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setEditsize({
          productSizeId: null,
          sizeName: "",
          description: "",
          price:""
        });
        setOpenEditModal(false);
      });
  };

  const handleSubmitDeleteSize = () => {
    sizeAPI
      .delete(editsize.productSizeId)
      .then((res) => {
        setSizes(
          sizes.filter((size) => size.productSizeId !== editsize.productSizeId)
        );
        toast.success("Delete size successfully");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setOpenDeleteModal(false);
      });
  };

  const dataSorted = sizes.slice().sort(getComparator(order, orderBy));

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5}>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddModal}
        >
          NEW SIZE
        </Button>
      </Stack>

      <Card>
        <SizeTableToolbar numSelected={selected.length} />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <SizeTableHead
                order={order}
                orderBy={orderBy}
                rowCount={sizes.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "index", label: "STT" },
                  { id: "name", label: "Size" },
                  { id: "price", label: "Price" }, 
                  { id: "description", label: "Description" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataSorted
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <SizeTableRow
                      key={row.id}
                      STT={String((index += 1))}
                      sizeName={row.sizeName}
                      price = {row.price}
                      description={row.description}
                      selected={selected.indexOf(row.sizeName) !== -1}
                      handleClick={(event) => handleClick(event, row.sizeName)}
                      handleEdit={() => handleOpenEditModal(row)}
                      handleDelete={() => handleOpenDeleteModal(row)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, sizes.length)}
                />

                {!dataSorted.length && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={sizes.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Add size Modal */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogContent>
          <TextField
            margin="dense"
            name="sizeName"
            label="Size name"
            type="text"
            fullWidth
            variant="outlined"
            value={newsize.sizeName}
            onChange={handleChangeNewSize}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="text"
            fullWidth
            variant="outlined"
            value={newsize.price}
            onChange={handleChangeNewSize}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newsize.description}
            onChange={handleChangeNewSize}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button onClick={handleSubmitNewSize} color="primary">
            Add SIZE
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add size Modal End */}

      {/* Edit size Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit SIZE</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="sizeName"
            label="Size name"
            type="text"
            fullWidth
            variant="outlined"
            value={editsize.sizeName}
            onChange={handleChangeEditSize}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="text"
            fullWidth
            variant="outlined"
            value={editsize.price}
            onChange={handleChangeEditSize}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={editsize.description}
            onChange={handleChangeEditSize}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleSubmitEditSize} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit size Modal End */}

      {/* Delete size Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Delete SIZE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the size?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={handleSubmitDeleteSize} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
