import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from "@mui/material";
import LoadingComp from "src/components/loading/LoadingComp";
import ProductDetails from "../product-details";
import SizeAndPrice from "../product-sizes-and-prices";
import ProductRecipes from "../product-recipes";
import { useEffect, useState } from "react";
import productAPI from "src/services/API/productAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const AddProductModal = ({ open, onClose, refetch }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const [productData, setProductData] = useState({});
  const [details, setDetails] = useState([]);
  const [recipes, setRecipes] = useState([]);
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

  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationKey: ["addingProduct"],
    mutationFn: (params) => productAPI.add(params),
  });

  const handleSaveProduct = () => {
    const newProductForm = new FormData();
    files.forEach((file) => {
      newProductForm.append("images", file);
    });
    newProductForm.append("productData", JSON.stringify(productData));
    newProductForm.append("details", JSON.stringify(details));
    newProductForm.append("recipes", JSON.stringify(recipes));

    addProduct(newProductForm, {
      onSuccess: () => {
        setFiles([]);
        setDetails([]);
        setRecipes([]);
        setProductData({});
        setCurrentTab(0);
        toast.success("Add product successfully");
        refetch();
        onClose();
      },
    });
  };

  return (
    <>
      <Dialog
        open={open}
        sx={{
          overflow: "scroll",
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

          {currentTab === 1 && productData && (
            <SizeAndPrice details={details} setDetails={setDetails} />
          )}

          {currentTab === 2 && (
            <ProductRecipes recipes={recipes} setRecipes={setRecipes} />
          )}

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                onClose();
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

      {/* Loading */}
      <LoadingComp isLoading={isAdding} />
    </>
  );
};

export default AddProductModal;
