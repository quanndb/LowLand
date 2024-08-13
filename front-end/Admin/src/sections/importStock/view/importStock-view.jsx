import { useEffect, useState } from "react";
import {
  Box,
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
import Scrollbar from "src/components/scrollbar";
import TableNoData from "../table-no-data";
import SizeTableRow from "../stock-table-row";
import SizeTableHead from "../stock-table-head";
import TableEmptyRows from "../table-empty-rows";
import SizeTableToolbar from "../stock-table-toolbar";
import { emptyRows, getComparator } from "../utils";
import importStockAPI from "src/services/API/importStock";
import AddStockModal from "../addStock";

export default function ImportStockView() {
  const [importStockList, setimportStockList] = useState([]);
  useEffect(() => {
    importStockAPI
      .getAll()
      .then((res) => {
        setimportStockList(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("importStockCode");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = importStockList.map((n) => n.importStockCode);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, importStockCode) => {
    const selectedIndex = selected.indexOf(importStockCode);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, importStockCode);
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

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditsize({
      id: null,
      sizeName: "",
      description: "",
      price: "", // Reset price
    });
  };

  const dataSorted = importStockList
    .slice()
    .sort(getComparator(order, orderBy));

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        mb={5}
      >
        <Button
          variant="contained"
          color="inherit"
          // startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddModal}
        >
          NEW STOCK
        </Button>
      </Stack>
      <SizeTableToolbar numSelected={selected.length} />

      <Scrollbar>
        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 400 }}>
            <SizeTableHead
              order={order}
              orderBy={orderBy}
              rowCount={importStockList.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "index", label: "STT" },
                { id: "importStockCode", label: "Code" },
                { id: "supplierName", label: "Supplier Name" },
                { id: "description", label: "Description" },
                { id: "import_date", label: "Imported Date" },
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
                    importStockCode={row.importStockCode}
                    supplierName={row.supplierName}
                    description={row.description}
                    import_date={row.import_date}
                    selected={selected.indexOf(row.importStockCode) !== -1}
                    handleClick={(event) =>
                      handleClick(event, row.importStockCode)
                    }
                    handleEdit={() => handleOpenEditModal(row)}
                    // handleDelete={() => handleOpenDeleteModal(row)}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, importStockList.length)}
              />

              {!dataSorted.length && <TableNoData />}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        page={page}
        component="div"
        count={importStockList.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddStockModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        // onAddStock
      />

      {/* Edit size Modal */}
      {/* <Dialog open={openEditModal} onClose={handleCloseEditModal}>
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
      </Dialog> */}
      {/* Edit size Modal End */}
    </>
  );
}
