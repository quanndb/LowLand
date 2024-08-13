import { useState, useEffect } from "react";
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  TextField,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { sizes } from "src/_mock/sizes";
import materialAPI from "src/services/API/materialAPI";
import { toast } from "react-toastify";
import { fileToBase64 } from "src/utils/fileToBase64";
import imageAPI from "src/services/API/imageAPI";
import productAPI from "src/services/API/productAPI";

const ProductDetailModal = ({ product, open, onClose, setSp }) => {
  console.log(product);
  if (!product) return null;

  const { images, listRecipe, details } = product;

  const [editedName, setEditedName] = useState(product.product.productName);
  const [type, setType] = useState(product.product.productTypeId);
  const [editedOriginalPrices, setEditedOriginalPrices] = useState(
    product.product.price
  );
  const [editedDescription, setEditedDescription] = useState(
    product.product.description
  );
  const [editedMaterials, setEditedMaterials] = useState(listRecipe || []);
  const [currentTab, setCurrentTab] = useState(0);
  const [newMaterialName, setNewMaterialName] = useState("");
  const [newMaterialValue, setNewMaterialValue] = useState("");
  const [selectedSize, setSelectedSize] = useState(
    details.length > 0 ? details[0] : null
  );
  const [editedSizes, setEditedSizes] = useState(null);

  const [newSizeName, setNewSizeName] = useState("");
  const [newSizePrice, setNewSizePrice] = useState("");
  const [input, setInput] = useState(0);

  const [imageFile1, setImageFile1] = useState(images[0]);
  const [imageFile2, setImageFile2] = useState(images[1]);
  const [imagePreviewUrl1, setImagePreviewUrl1] = useState(
    images[0]?.imageUrl || ""
  );
  const [imagePreviewUrl2, setImagePreviewUrl2] = useState(
    images[1]?.imageUrl || ""
  );
  const [imageSubmit1, setImageSubmit1] = useState("");
  const [imageSubmit2, setImageSubmit2] = useState("");

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [imageToDeleteIndex, setImageToDeleteIndex] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    materialAPI
      .getAll()
      .then((res) => setRecipes(res))
      .catch((err) => toast.error(err));
  }, []);

  useEffect(() => {
    setEditedName(product.product.productName);
    setType(product.product.productTypeId);
    setEditedDescription(product.product.description);
    setEditedMaterials(listRecipe || []);
    setEditedSizes(product.details);
    setSelectedSize(details.length > 0 ? details[0] : null);
    setImagePreviewUrl1(images[0]?.imageUrl || "");
    setImagePreviewUrl2(images[1]?.imageUrl || "");
    setImageFile1(images[0]);
    setImageFile2(images[1]);
  }, [product]);
  useEffect(() => {
    handleGetImage(imagePreviewUrl1, setImageSubmit1);
    handleGetImage(imagePreviewUrl2, setImageSubmit2);
  }, [imagePreviewUrl1, imagePreviewUrl2]);
  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleOriginalPricesChange = (event) => {
    setEditedOriginalPrices(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...editedMaterials];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [field]: value,
    };
    setEditedMaterials(updatedMaterials);
  };

  const handleDeleteMaterial = (index) => {
    const updatedMaterials = [...editedMaterials];
    updatedMaterials.splice(index, 1);
    setEditedMaterials(updatedMaterials);
  };

  const handleAddMaterial = () => {
    if (newMaterialName.trim() && newMaterialValue.trim()) {
      const newMaterial = {
        name: newMaterialName,
        value: newMaterialValue,
      };
      setEditedMaterials([...editedMaterials, newMaterial]);
      setNewMaterialName("");
      setNewMaterialValue("");
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSizeChange = (event) => {
    const newSizeId = event.target.value;
    const newSize = sizes.find((sz) => sz.id === newSizeId);
    setSelectedSize(newSize || null);
  };

  const handleAddSize = () => {
    if (newSizeName.trim() && newSizePrice.trim()) {
      const newId =
        editedSizes.length > 0 ? editedSizes[editedSizes.length - 1].id + 1 : 1;
      const newSize = {
        id: newId,
        name: newSizeName,
        price: parseFloat(newSizePrice),
      };
      const newSizes = [...editedSizes, newSize];
      setEditedSizes(newSizes);
      setNewSizeName("");
      setNewSizePrice("");
    }
  };

  const handleDeleteSize = (index) => {
    const updatedSizes = [...editedSizes];
    updatedSizes.splice(index, 1);
    setEditedSizes(updatedSizes);
  };

  const handleConfirmDelete = () => {
    console.log(imageToDeleteIndex, input);
    if (imageToDeleteIndex !== null) {
      imageAPI
        .delete(imageToDeleteIndex)
        .then((res) => {
          product.images.filter(
            (image) => image.productImageId !== imageToDeleteIndex
          );
          toast.success("Image deleted successfully");
          if (input === 0) {
            setImagePreviewUrl1("");
            setImageFile1(null);
          } else if (input === 1) {
            setImagePreviewUrl2("");
            setImageFile2(null);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
      setImageToDeleteIndex(null);
      setDeleteConfirmDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmDialogOpen(false);
  };

  const handleSizeNameChange = (index, newName) => {
    const updatedSizes = [...editedSizes];
    updatedSizes[index] = { ...updatedSizes[index], name: newName };
    setEditedSizes(updatedSizes);
  };

  const handleSizePriceChange = (index, newPrice) => {
    const updatedSizes = [...editedSizes];
    updatedSizes[index] = { ...updatedSizes[index], price: newPrice };
    setEditedSizes(updatedSizes);
  };

  const handleImageChange = (event, setImageFile, setImagePreviewUrl) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index, input) => {
    setImageToDeleteIndex(index); // Set the index of the image to delete
    setInput(input);
    setDeleteConfirmDialogOpen(true); // Open the delete confirmation dialog
  };

  const handleSaveChanges = () => {
    let targetProduct = {
      productId: product.product.productId,
      productName: editedName,
      productTypeId: type,
      description: editedDescription,
      listRecipe: editedMaterials,
      listDetail: editedSizes,

      // if have imageFile1 or imageFile2 add image to array, if not dont add
      listImageBase64: [imageSubmit1, imageSubmit2].filter(
        (image) => image !== undefined
      ),
    };
    setIsLoading(true);
    // Save changes logic here
    productAPI
      .update(targetProduct)
      .then((res) => {
        toast.success("Product updated successfully");
        productAPI
          .getAll()
          .then((res) => {
            setSp(res);
            setIsLoading(false);
          })
          .catch((err) => {
            toast.error(err);
          });
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        onClose();
      });
  };
  const handleGetImage = (value, set) => {
    if (value !== "") {
      fileToBase64(value)
        .then((image) => {
          set(image);
          // return image;
        })
        .catch((error) => {
          set(undefined);
        });
    } else {
      set(undefined);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={open} disable sx={{ overflowY: "auto", overflowX: "hidden" }}>
      {isLoading ? (
        <Box sx={{ p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DialogTitle>Edit Product</DialogTitle>

            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              aria-label="Product Details Tabs"
            >
              <Tab label="Details" />
              <Tab label="Materials" />
              <Tab label="Sizes" />
            </Tabs>

            {currentTab === 0 && (
              <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
                <DialogTitle>{product.product.productName}</DialogTitle>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  sx={{ m: 1 }}
                >
                  <Box
                    onClick={() =>
                      imagePreviewUrl1 === "" &&
                      document.getElementById("imageUpload1").click()
                    }
                    sx={{
                      width: "48%",
                      height: 200,
                      border: "2px dashed grey",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      cursor: imagePreviewUrl1 === "" ? "pointer" : "default",
                      backgroundImage: `url(${imagePreviewUrl1 || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!imagePreviewUrl1 && (
                      <Typography variant="h4">+</Typography>
                    )}
                    {imagePreviewUrl1 && (
                      <IconButton
                        onClick={() =>
                          handleRemoveImage(imageFile1.productImageId, 0)
                        }
                        sx={{
                          position: "absolute",
                          top: -12,
                          right: -12,
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#dfdfdf",
                          "&:hover": {
                            backgroundColor: "#dfdfdf",
                            opacity: 0.7,
                          },
                        }}
                      >
                        x
                      </IconButton>
                    )}
                    <input
                      type="file"
                      id="imageUpload1"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageChange(e, setImageFile1, setImagePreviewUrl1)
                      }
                    />
                  </Box>
                  <Box
                    onClick={() =>
                      imagePreviewUrl2 === "" &&
                      document.getElementById("imageUpload2").click()
                    }
                    sx={{
                      width: "48%",
                      height: 200,
                      border: "2px dashed grey",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      cursor: imagePreviewUrl2 === "" ? "pointer" : "default",
                      backgroundImage: `url(${imagePreviewUrl2 || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!imagePreviewUrl2 && (
                      <Typography variant="h4">+</Typography>
                    )}
                    {imagePreviewUrl2 && (
                      <IconButton
                        onClick={() =>
                          handleRemoveImage(imageFile2.productImageId, 1)
                        }
                        sx={{
                          position: "absolute",
                          top: -12,
                          right: -12,
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#dfdfdf",
                          "&:hover": {
                            backgroundColor: "#dfdfdf",
                            opacity: 0.7,
                          },
                        }}
                      >
                        x
                      </IconButton>
                    )}
                    <input
                      type="file"
                      id="imageUpload2"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageChange(e, setImageFile2, setImagePreviewUrl2)
                      }
                    />
                  </Box>
                </Box>

                <TextField
                  label="Product Name"
                  value={editedName}
                  onChange={handleNameChange}
                  fullWidth
                  margin="normal"
                />

                <FormControl
                  sx={{
                    width: "100%",
                    mt: 1,
                  }}
                >
                  <InputLabel
                    sx={{ backgroundColor: "white", borderRadius: "8px" }}
                  >
                    Product type
                  </InputLabel>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    label="Product type"
                  >
                    <MenuItem value={1}>Black coffee</MenuItem>
                    <MenuItem value={2}>Brown coffee</MenuItem>
                    <MenuItem value={3}>Smell coffee</MenuItem>
                    <MenuItem value={4}>Weasel coffee</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Description"
                  value={editedDescription}
                  onChange={handleDescriptionChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
              </Box>
            )}

            {currentTab === 1 && (
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
                          recipes.find(
                            (r) => r.materialId === material.materialId
                          ).materialName
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
                          recipes.find(
                            (r) => r.materialId === material.materialId
                          ).unit
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
            )}

            {currentTab === 2 && (
              <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
                <Box sx={{ m: 2 }}>
                  <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                      Sizes:
                    </Typography>
                    {details.map((sz, index) => (
                      <Box
                        key={sz.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          marginBottom: 2,
                        }}
                      >
                        <TextField
                          label="Size Name"
                          value={sz.sizeName}
                          onChange={(e) =>
                            handleSizeNameChange(index, e.target.value)
                          }
                          fullWidth
                        />
                        <TextField
                          label="Size Price"
                          value={sz.price}
                          onChange={(e) =>
                            handleSizePriceChange(index, e.target.value)
                          }
                          fullWidth
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteSize(index)}
                        >
                          Delete
                        </Button>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
                    <TextField
                      label="New Size Name"
                      value={newSizeName}
                      onChange={(e) => setNewSizeName(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="New Size Price"
                      value={newSizePrice}
                      onChange={(e) => setNewSizePrice(e.target.value)}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddSize}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onClose}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </Box>
          </DialogContent>

          <Dialog open={deleteConfirmDialogOpen} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this image?
              </Typography>
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelDelete}
                  sx={{ mr: 1 }}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmDelete}
                >
                  Yes
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Dialog>
  );
};

export default ProductDetailModal;
