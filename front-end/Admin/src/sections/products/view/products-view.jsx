import { useEffect, useState } from "react";
import {
  Box,
  Pagination,
  Typography,
  Grid,
  Container,
  Button,
} from "@mui/material";
import ProductCard from "../product-card";
import ProductDetailModal from "./ProductDetailModal";
import AddProductModal from "./AddProductModal";
import productAPI from "src/services/API/productAPI";
import { toast } from "react-toastify";

export default function ProductsView() {
  const [sp, setSp] = useState([]);

  useEffect(() => {
    productAPI
      .getAll()
      .then((res) => {
        setSp(res);
      })
      .catch((error) => toast.error(error || "Failed to fetch products"));
  }, []);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleProductClick = (product) => {
    productAPI
      .getDetails(product.productId)
      .then((res) => {
        setSelectedProduct(res);
      })
      .catch((error) => {
        toast.error(error || "Failed to fetch product details");
      });
    // setSelectedProduct({
    //   ...product,
    //   materials: product.materials.map((material) => ({
    //     materialName: material.materialName,
    //     quantity: material.quantity,
    //     unit: material.unit,
    //   })),
    //   size: product.size.map((item) => ({
    //     name: item.name,
    //     price: item.price,
    //   })),
    //   images: product.images.map((item) => ({
    //     name: item.name,
    //     imageUrl: item.imageUrl,
    //   })),
    // });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddProduct = (newProduct) => {
    console.log("Adding new product:", newProduct);
  };

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const productsPerPage = 8;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sp.slice(startIndex, endIndex);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddModal}
        >
          Add Product
        </Button>
      </Box>

      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid key={product.productId} item xs={12} sm={6} md={3}>
            <ProductCard
              product={product}
              onClick={() => handleProductClick(product)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(sp.length / productsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>

      <ProductDetailModal
        setSp={setSp}
        product={selectedProduct}
        open={modalOpen}
        onClose={handleCloseModal}
      />

      <AddProductModal
        setSp={setSp}
        open={addModalOpen}
        onClose={handleCloseAddModal}
        onAddProduct={handleAddProduct}
      />
    </Container>
  );
}
