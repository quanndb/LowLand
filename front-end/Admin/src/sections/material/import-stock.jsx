import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Iconify from "src/components/iconify/iconify";
import { CustomAutocomplete } from "src/components/input/CustomAutoComplete";
import LoadingComp from "src/components/loading/LoadingComp";
import { useDebounce } from "src/hooks/use-debounce";
import importStockAPI from "src/services/API/importStock";
import materialAPI from "src/services/API/materialAPI";
import { formatPrice } from "src/utils/format-number";

const Deltails = ({ id, open, onClose, refetch }) => {
  const { data: importDetails } = useQuery({
    queryKey: ["importDetails", id],
    queryFn: () => importStockAPI.getDetails(id),
    enabled: !!id,
  });

  const { mutate: updateImport } = useMutation({
    mutationKey: ({ id, data }) => ["updateImport", data],
    mutationFn: ({ id, data }) => importStockAPI.update(id, data),
  });

  const { mutate: createImport } = useMutation({
    mutationKey: (data) => ["createImport", data],
    mutationFn: (data) => importStockAPI.create(data),
  });

  const [data, setData] = useState({
    importCode: "",
    supplierName: "",
    importDate: "",
    description: "",
    materialsList: [],
  });
  useEffect(() => {
    if (importDetails) {
      setData(importDetails);
    }
  }, [importDetails]);

  const handleClose = () => {
    if (open) {
      setData({
        importCode: "",
        supplierName: "",
        importDate: "",
        description: "",
        materialsList: [],
      });
      onClose();
    }
  };

  const handleSave = () => {
    if (id) {
      updateImport(
        { id: id, data: data },
        {
          onSuccess: () => {
            toast.success("Update import successfully");
            handleClose();
            refetch();
          },
        }
      );
    } else {
      createImport(data, {
        onSuccess: () => {
          toast.success("Create import successfully");
          handleClose();
          refetch();
        },
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      {data ? (
        <>
          <DialogTitle>
            Import Details{" "}
            <Typography color={"primary"} sx={{ fontWeight: "600" }}>
              #{data?.importCode}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container sx={{ mt: 2 }} spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  value={data?.supplierName}
                  onChange={(e) =>
                    setData({ ...data, supplierName: e.target.value })
                  }
                  label="Supplier Name"
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  value={
                    new Date(data?.importDate).toDateString() +
                    " " +
                    new Date(data?.importDate).toLocaleTimeString()
                  }
                  disabled
                  label="Import Date"
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={data?.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  label="Description"
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <Card
              sx={{ mt: 2, p: 2, maxHeight: 450, overflow: "auto" }}
              variant="outlined"
            >
              {data?.materialsList?.map((detail) => (
                <Card
                  sx={{ mt: 2, p: 2 }}
                  variant="outlined"
                  key={detail.detailsId}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={3}>
                      <CustomAutocomplete
                        label="Material Name"
                        labelKey="materialName"
                        queryFn={materialAPI.getMaterials}
                        current={detail.materialName}
                        onInputChange={(value) =>
                          setData({
                            ...data,
                            materialsList: data.materialsList.map((item) => {
                              if (item.detailsId === detail.detailsId) {
                                return {
                                  ...item,
                                  materialName: value.value,
                                  unitName: value.option?.unitName || "",
                                  isNew: !Boolean(value.option?.unitName),
                                };
                              }
                              return item;
                            }),
                          })
                        }
                        sx={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Unit Name"
                        value={detail.unitName}
                        sx={{ width: "100%" }}
                        disabled={!Boolean(detail?.isNew)}
                        onChange={(e) => {
                          if (Boolean(detail?.isNew)) {
                            setData({
                              ...data,
                              materialsList: data.materialsList.map((item) => {
                                if (item.detailsId === detail.detailsId) {
                                  return {
                                    ...item,
                                    unitName: e.target.value,
                                  };
                                }
                                return item;
                              }),
                            });
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Quantity"
                        type="number"
                        value={detail.quantity}
                        onChange={(e) =>
                          setData({
                            ...data,
                            materialsList: data.materialsList.map((item) => {
                              if (item.detailsId === detail.detailsId) {
                                return {
                                  ...item,
                                  quantity: e.target.value,
                                };
                              }
                              return item;
                            }),
                          })
                        }
                        sx={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Price"
                        type="number"
                        value={detail.price}
                        onChange={(e) =>
                          setData({
                            ...data,
                            materialsList: data.materialsList.map((item) => {
                              if (item.detailsId === detail.detailsId) {
                                return {
                                  ...item,
                                  price: e.target.value,
                                };
                              }
                              return item;
                            }),
                          })
                        }
                        // vnđ icon
                        InputProps={{
                          endAdornment: "vnđ",
                        }}
                        sx={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      onClick={() =>
                        setData({
                          ...data,
                          materialsList: data.materialsList.filter(
                            (item) => item.detailsId !== detail.detailsId
                          ),
                        })
                      }
                      variant="contained"
                      color="error"
                      sx={{ mt: 2 }}
                      startIcon={<Iconify icon={"ic:round-delete"} />}
                    >
                      Delete
                    </Button>
                    <Typography sx={{ mt: 2, textAlign: "right" }}>
                      Sub total:{" "}
                      <b>{formatPrice(detail.quantity * detail.price)} vnđ</b>
                    </Typography>
                  </Box>
                </Card>
              ))}

              <Button
                onClick={() =>
                  setData({
                    ...data,
                    materialsList: [
                      ...data.materialsList,
                      {
                        detailsId: Date.now(),
                        isNew: true,
                        materialName: "",
                        unitName: "",
                        quantity: 0,
                        price: 0,
                      },
                    ],
                  })
                }
              >
                Add Material
              </Button>
            </Card>
            <Typography
              sx={{
                mt: 2,
                textAlign: "right",
                fontWeight: "600",
                fontSize: "20px",
              }}
              color={"error"}
            >
              Total:{" "}
              <b>
                {formatPrice(
                  data?.materialsList.reduce(
                    (a, b) => a + b.price * b.quantity,
                    0
                  )
                )}{" "}
                vnđ
              </b>
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSave()}
              >
                Save
              </Button>
            </Box>
          </DialogContent>
        </>
      ) : (
        <LoadingComp isLoading={true} />
      )}
    </Dialog>
  );
};

const ImportStock = () => {
  const [search, setSearch] = useState("");
  const query = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);

  const { data: importsPage, refetch } = useQuery({
    queryKey: ["imports", { query, page, size: 5 }],
    queryFn: () => importStockAPI.getImports({ query, page, size: 5 }),
  });

  const handleGetDetail = (id) => {
    setId(id);
    setOpen(true);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Deltails
        id={id}
        open={open}
        onClose={() => setOpen(false)}
        refetch={refetch}
      />
      <Typography variant="h5">Import Stock</Typography>
      <Box
        sx={{
          my: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            my: 3,
            display: "flex",
            alignItems: "center",
            width: { xs: "100%", md: "auto" },
          }}
        >
          <TextField
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search import..."
            label="Search"
            sx={{ width: "100%" }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ height: "100%", py: 2 }}
          >
            Search
          </Button>
        </Box>
        <Button
          variant="contained"
          startIcon={<Iconify icon={"eva:plus-fill"} />}
          sx={{ height: "fit-content", width: { xs: "100%", md: "auto" } }}
          onClick={() => handleGetDetail(null)}
          aria-hidden="false"
        >
          Add import
        </Button>
      </Box>
      <Stack spacing={3}>
        {importsPage ? (
          importsPage.response.map((importItem) => (
            <Card
              sx={{ p: 2, cursor: "pointer" }}
              key={importItem.importStockId}
              variant="outlined"
              onClick={() => handleGetDetail(importItem.importStockId)}
            >
              <Typography>
                <b>Code:</b> {importItem.importCode}
              </Typography>
              <Typography>
                <b>Date:</b>{" "}
                {new Date(importItem.importDate).toLocaleDateString() +
                  " " +
                  new Date(importItem.importDate).toLocaleTimeString()}
              </Typography>
              <Typography>
                <b>Materials:</b> {importItem.materialsList}
              </Typography>
              <Typography>
                <b>Supplier:</b> {importItem.supplierName}
              </Typography>
              <Typography>
                <b>Description:</b> {importItem.description}
              </Typography>
              {importItem?.updatedDate && (
                <>
                  <Typography>
                    <b>Updated date:</b>{" "}
                    {new Date(importItem.updatedDate).toLocaleDateString() +
                      " " +
                      new Date(importItem.updatedDate).toLocaleTimeString()}
                  </Typography>
                  <Typography>
                    <b>Updated by:</b> {importItem.updatedBy}
                  </Typography>
                </>
              )}
              <Typography>
                <b>Total Price: </b>
                {formatPrice(importItem.totalPrice || 0)} vnđ
              </Typography>
            </Card>
          ))
        ) : (
          <Stack spacing={2}>
            <Skeleton sx={{ height: 200 }} variant="rounded" />
            <Skeleton sx={{ height: 200 }} variant="rounded" />
            <Skeleton sx={{ height: 200 }} variant="rounded" />
          </Stack>
        )}
        {importsPage?.response?.length === 0 && (
          <Typography>No import found</Typography>
        )}
      </Stack>

      <Pagination
        color="primary"
        count={importsPage?.totalPages || 1}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ my: 3, display: "flex", justifyContent: "center" }}
      />
    </Card>
  );
};

export default ImportStock;
