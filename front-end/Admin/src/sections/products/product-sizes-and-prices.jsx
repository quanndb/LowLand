import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import productSizeAPI from "src/services/API/productSizeAPI";
import { CustomAutocomplete } from "src/components/input/CustomAutoComplete";
import { toast } from "react-toastify";
import ConfirmDelete from "../../components/dialog/confirm-delete";
import productAPI from "src/services/API/productAPI";
import { useMutation } from "@tanstack/react-query";
import LoadingComp from "src/components/loading/LoadingComp";

const SizeAndPrice = ({ details, setDetails }) => {
  const [newSizeName, setNewSizeName] = useState("");
  const [newSizePrice, setNewSizePrice] = useState("");
  const [newSizeSalePrice, setNewSizeSalePrice] = useState("");

  const [openConfirmDelete, setOpenConfirmDelete] = useState(null);

  const queryFn = productSizeAPI.getSizes;

  const { mutate: deleteDetails, isPending: isDeleting } = useMutation({
    mutationKey: (data) => ["deleteProductDetails", data],
    mutationFn: (data) => {
      console.log(data);

      return productAPI.deleteDetails(data.productId, data.productDetailsId);
    },
  });

  const handleAdd = () => {
    setDetails((prev) => {
      if (prev.find((sz) => sz.sizeName === newSizeName)) {
        toast.error("Size already exists");
        return prev;
      }

      if (newSizeName === "" || newSizePrice === "") {
        toast.error("Please fill in all fields");
        return prev;
      }
      return [
        ...prev,
        {
          sizeName: newSizeName,
          price: newSizePrice,
          salePrice: newSizeSalePrice,
        },
      ];
    });
    setNewSizeName("");
    setNewSizePrice("");
    setNewSizeSalePrice("");
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(null);
    if (openConfirmDelete && openConfirmDelete.productDetailsId) {
      deleteDetails(openConfirmDelete, {
        onSuccess: () => {
          setDetails((prev) => {
            return prev.filter(
              (item) =>
                item.productDetailsId !== openConfirmDelete.productDetailsId
            );
          });
          toast.success("Delete size successfully");
        },
      });
    } else {
      setDetails((prev) => {
        return prev.filter(
          (item) => item.sizeName !== openConfirmDelete.sizeName
        );
      });
      toast.success("Delete size successfully");
    }
  };

  return (
    <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <Box sx={{ m: 2 }}>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Sizes:
          </Typography>
          {details?.map((sz, index) => (
            <Grid
              container
              key={index}
              gap={2}
              sx={{
                mb: 6,
              }}
            >
              <Grid item xs={12} md={5} sx={{ width: "100%" }}>
                <CustomAutocomplete
                  current={sz.sizeName}
                  label={"Size"}
                  labelKey={"sizeName"}
                  queryFn={queryFn}
                  sx={{ width: "100%" }}
                  onInputChange={(val) =>
                    setDetails((prev) =>
                      prev.map((item) =>
                        item.productDetailsId === sz.productDetailsId
                          ? { ...item, sizeName: val.value }
                          : item
                      )
                    )
                  }
                />
              </Grid>

              <Grid item sm={12} md={5} sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Size Price"
                  value={sz.price || ""}
                  fullWidth
                  type="number"
                  onChange={(e) =>
                    setDetails((prev) => {
                      return prev.map((item) =>
                        item.productDetailsId === sz.productDetailsId
                          ? { ...item, price: Number(e.target.value) }
                          : item
                      );
                    })
                  }
                />
                <TextField
                  label="Sale Price"
                  value={sz.salePrice || ""}
                  type="number"
                  fullWidth
                  onChange={(e) =>
                    setDetails((prev) => {
                      return prev.map((item) =>
                        item.productDetailsId === sz.productDetailsId
                          ? { ...item, salePrice: Number(e.target.value) }
                          : item
                      );
                    })
                  }
                />
              </Grid>
              <Grid item sm={12} md={1} sx={{ width: "100%" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ width: "100%", height: "100%" }}
                  onClick={() => setOpenConfirmDelete(sz)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          ))}
        </Box>

        <Grid container gap={2}>
          <Grid item sm={12} md={5} sx={{ width: "100%" }}>
            <CustomAutocomplete
              current={newSizeName}
              label={"New Size"}
              sx={{ width: "100%" }}
              labelKey={"sizeName"}
              queryFn={queryFn}
              onInputChange={(val) => {
                setNewSizeName(val.value);
              }}
            />
          </Grid>

          <Grid item sm={12} md={5} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="New Size Price"
              value={newSizePrice}
              type="number"
              onChange={(e) => {
                setNewSizePrice(Number(e.target.value));
              }}
              fullWidth
            />
            <TextField
              label="New Size Sale Price"
              value={newSizeSalePrice}
              type="number"
              onChange={(e) => {
                setNewSizeSalePrice(Number(e.target.value));
              }}
              fullWidth
            />
          </Grid>
          <Grid item sm={12} md={1} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              sx={{ width: "100%", height: "100%" }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Confirm delete */}
      <ConfirmDelete
        open={openConfirmDelete ? true : false}
        onClose={() => setOpenConfirmDelete(false)}
        onDelete={handleConfirmDelete}
      />

      {/* Loading component */}
      <LoadingComp isLoading={isDeleting} />
    </Box>
  );
};

export default SizeAndPrice;
