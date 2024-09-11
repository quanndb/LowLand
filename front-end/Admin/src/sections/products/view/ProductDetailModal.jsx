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
import ProductRecipes from "../product-recipes";

const ProductDetailModal = ({ productId, open, onClose, refetch }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const { data: product, isFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productAPI.getById(productId),
    enabled: open && productId !== "",
  });

  const [productData, setProductData] = useState(product || null);
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

  useEffect(() => {
    if (product) {
      setProductData({
        ...product,
        type: {
          typeName: product.typeName,
        },
      });
      setDetails(product.sizesAndPrices);
      setRecipes(product.recipes);
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
    newProductForm.append("recipes", JSON.stringify(recipes));

    updateProduct(
      { productId: product.productId, params: newProductForm },
      {
        onSuccess: () => {
          setFiles([]);
          setDetails([]);
          setRecipes([]);
          setProductData(null);
          setCurrentTab(0);
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
                  setFiles([]);
                  setDetails([]);
                  setRecipes([]);
                  setProductData(null);
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
