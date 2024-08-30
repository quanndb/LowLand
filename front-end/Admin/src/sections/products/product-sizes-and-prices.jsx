import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import productSizeAPI from "src/services/API/productSizeAPI";
import { CustomAutocomplete } from "src/components/input/CustomAutoComplete";
import { toast } from "react-toastify";
import ConfirmDelete from "./confirm-delete";
import productAPI from "src/services/API/productAPI";
import { useMutation } from "@tanstack/react-query";
import LoadingComp from "src/components/loading/LoadingComp";

const SizeAndPrice = ({ productData, details, setDetails }) => {
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

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(null);
    if (openConfirmDelete) {
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
    }
  };

  return (
    <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <Box sx={{ m: 2 }}>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Sizes:
          </Typography>
          {details.map((sz, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginBottom: 2,
              }}
            >
              <CustomAutocomplete
                current={sz.sizeName}
                label={"Size"}
                labelKey={"sizeName"}
                queryFn={queryFn}
                onInputChange={(val) =>
                  setDetails((prev) =>
                    prev.map((item) =>
                      item.productDetailsId === sz.productDetailsId
                        ? { ...item, sizeName: val }
                        : item
                    )
                  )
                }
              />

              <TextField
                label="Size Price"
                value={sz.price || ""}
                fullWidth
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
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenConfirmDelete(sz)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
          <CustomAutocomplete
            current={newSizeName}
            label={"New Size"}
            labelKey={"sizeName"}
            queryFn={queryFn}
            onInputChange={(val) => {
              console.log("Parent component input change:", val); // Debugging statement
              setNewSizeName(val);
            }}
          />

          <TextField
            label="New Size Price"
            value={newSizePrice}
            onChange={(e) => {
              setNewSizePrice(Number(e.target.value));
            }}
            fullWidth
          />
          <TextField
            label="New Size Sale Price"
            value={newSizeSalePrice}
            onChange={(e) => {
              setNewSizeSalePrice(Number(e.target.value));
            }}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setDetails((prev) => {
                if (prev.find((sz) => sz.sizeName === newSizeName)) {
                  toast.error("Size already exists");
                  return prev;
                }
                console.log(newSizeName, newSizePrice, newSizeSalePrice);

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
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
      <ConfirmDelete
        open={openConfirmDelete ? true : false}
        onClose={() => setOpenConfirmDelete(false)}
        onDelete={handleConfirmDelete}
      />
      <LoadingComp isLoading={isDeleting} />
    </Box>
  );
};

export default SizeAndPrice;
