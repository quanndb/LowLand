import { useEffect, useState } from "react";
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  Tabs,
  Tab,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import productAPI from "src/services/API/productAPI";
import ProductDetails from "../product-details";
import LoadingComp from "src/components/loading/LoadingComp";
import { toast } from "react-toastify";
import SizeAndPrice from "../product-sizes-and-prices";

const ProductDetailModal = ({ productId, open, onClose, refetch }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const { data: product, isFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productAPI.getById(productId),
    enabled: open && productId !== "",
  });

  const [productData, setProductData] = useState(product || null);
  const [details, setDetails] = useState([]);
  console.log(details);

  useEffect(() => {
    if (product) {
      setProductData({
        ...product,
        type: {
          typeName: product.typeName,
        },
      });
      setDetails(product.sizesAndPrices);
    }
  }, [product]);

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationKey: ({ productId, params }) => ["updateProduct", productId],
    mutationFn: ({ productId, params }) => productAPI.update(productId, params),
  });

  const handleSaveProduct = () => {
    const newProductForm = new FormData();
    files.forEach((file) => {
      newProductForm.append("images", file);
    });
    newProductForm.append("productData", JSON.stringify(productData));
    newProductForm.append("details", JSON.stringify(details));

    updateProduct(
      { productId: product.productId, params: newProductForm },
      {
        onSuccess: () => {
          setFiles([]);
          toast.success("Product updated successfully");
          refetch();
          onClose();
        },
      }
    );
  };

  return (
    <>
      {(!product && open) || isFetching || isUpdating ? (
        <LoadingComp isLoading={true} />
      ) : (
        <Dialog
          open={open}
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DialogTitle>Edit Product</DialogTitle>

            <Tabs
              value={currentTab}
              onChange={(e, val) => setCurrentTab(val)}
              aria-label="Product Details Tabs"
            >
              <Tab label="Details" value={0} />
              <Tab label="Sizes & Prices" value={1} />
              <Tab label="Materials" value={2} />
            </Tabs>

            {currentTab === 0 && details && productData && (
              <ProductDetails
                productData={productData}
                setProductData={setProductData}
                files={files}
                setFiles={setFiles}
              />
            )}

            {/* {currentTab === 1 && (
          <Box sx={{ overflowY: "auto", overflowX: "hidden", mt: 2 }}>
            <Typography fontWeight={700} sx={{ ml: 2, mb: 1 }}>
              Material list:
            </Typography>
            <Box sx={{ m: 2 }}>
              {listRecipe.map((material) => (
                <Box
                  key={material.productRecipeId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: 2,
                  }}
                >
                  <TextField
                    label="Material Name"
                    value={
                      recipes.find((r) => r.materialId === material.materialId)
                        .materialName
                    }
                    onChange={(e) =>
                      handleMaterialChange(index, "name", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Material Value"
                    value={material.quantity}
                    type="number"
                    onChange={(e) =>
                      handleMaterialChange(index, "value", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Material Value"
                    value={
                      recipes.find((r) => r.materialId === material.materialId)
                        .unit
                    }
                    disabled
                    type="text"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteMaterial(index)}
                  >
                    Delete
                  </Button>
                </Box>
              ))}

              <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                <TextField
                  label="New Material Name"
                  value={newMaterialName}
                  onChange={(e) => setNewMaterialName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="New Material Value"
                  value={newMaterialValue}
                  onChange={(e) => setNewMaterialValue(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddMaterial}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        )} */}

            {currentTab === 1 && productData && (
              <SizeAndPrice
                productData={productData}
                details={details}
                setDetails={setDetails}
              />
            )}

            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  onClose();
                  setFiles([]);
                  setCurrentTab(0);
                }}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveProduct}
              >
                Save Changes
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProductDetailModal;
