import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";

import materialAPI from "src/services/API/materialAPI";
import { toast } from "react-toastify";

const AddStockModal = ({ open, onClose, onAddStock }) => {
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    materialAPI
      .getAll()
      .then((res) => {
        setMaterials(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  const [newStockCode, setNewStockCode] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [newImportDate, setNewImportDate] = useState("");
  //   const [newListDetails, setNewListDetails] = useState([]);
  const [newMaterialValue, setNewMaterialValue] = useState("");

  const [newListDetails, setNewListDetails] = useState({
    detailsId: "",
    importStockId: "",
    materialId: "",
    quantity: "",
    price: "",
  });

  const handleAddStock = () => {
    const newProduct = {
      importStockId: 0,
      importStockCode: newStockCode,
      supplierName: newDescription,
      description: newDescription,
      listDetails: newListDetails,
      import_date: newImportDate,
    };

    onAddProduct(newProduct);

    // Clear input fields and close the modal
    setNewStockCode("");
    setNewProductPrice("");
    setNewDescription("");
    setNewImportDate("");
    setNewListDetails([]);
    setSelectedMaterial("");
    onClose();
  };

  const handleAddMaterial = () => {
    if (selectedMaterial && newMaterialValue.trim()) {
      const selectedMaterialObject = materials.find(
        (material) => material.materialName === selectedMaterial
      );

      if (selectedMaterialObject) {
        const newMaterial = {
          materialName: selectedMaterialObject.materialName,
          quantity: newMaterialValue,
          unit: selectedMaterialObject.unit,
        };
        setNewListDetails([...newListDetails, newMaterial]);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmDialogOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent sx={{ width: 600, height: 540 }}>
        <TextField
        // value={}
        ></TextField>
        <Box>
          <Typography variant="h6">Materials:</Typography>
          <ul style={{ padding: 0, listStyleType: "none" }}>
            {materials.map((material, index) => (
              <li
                key={index}
                style={{ display: "flex", gap: 10, marginBottom: "10px" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  disabled
                  value={material.materialName}
                ></TextField>
                <TextField
                  fullWidth
                  label="Quantity"
                  value={material.quantity}
                  variant="outlined"
                  onChange={(e) => {
                    const updatedMaterials = [...newListDetails];
                    updatedMaterials[index].quantity = e.target.value;
                    setNewListDetails(updatedMaterials);
                  }}
                />
                <TextField
                  fullWidth
                  label="Unit"
                  value={material.unit}
                  variant="outlined"
                  disabled
                />
              </li>
            ))}
            <li style={{ display: "flex", gap: 10, marginBottom: "10px" }}>
              <Select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                variant="outlined"
                fullWidth
              >
                {materials.map((material) => (
                  <MenuItem
                    key={material.materialId}
                    value={material.materialName}
                  >
                    {material.materialName}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                fullWidth
                label="Quantity"
                variant="outlined"
                value={newMaterialValue}
                onChange={(e) => setNewMaterialValue(e.target.value)}
              />
              <TextField
                fullWidth
                label="Unit"
                variant="outlined"
                value={
                  materials.find(
                    (material) => material.materialName === selectedMaterial
                  )?.unit || ""
                }
                disabled
              />
              <Button
                onClick={handleAddMaterial}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </li>
          </ul>
        </Box>

        <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} variant="outlined" sx={{ mr: 1 }}>
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={handleAddStock}>
            Add Product
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddStockModal;
