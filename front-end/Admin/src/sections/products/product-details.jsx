import "swiper/css/pagination";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import {
  Autocomplete,
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import Iconify from "src/components/iconify";
import Image from "src/components/Image";
import productTypeAPI from "src/services/API/productTypeAPI";
import ConfirmDelete from "./confirm-delete";
import productAPI from "src/services/API/productAPI";
import { toast } from "react-toastify";
import LoadingComp from "src/components/loading/LoadingComp";
import { useDebounce } from "src/hooks/use-debounce";

const ProductTypeAutocomplete = ({ currentType, setProductData }) => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState(currentType?.typeName || "");
  const debouncedQuery = useDebounce(query, 500);
  const [selectedType, setSelectedType] = useState(currentType || null);
  const { data: productTypes, isFetching } = useQuery({
    queryKey: ["productTypes", { query: debouncedQuery }],
    queryFn: () =>
      productTypeAPI.getProductTypes({ query: debouncedQuery, size: 5 }),
    staleTime: 5 * 60 * 1000,
    enabled: focused,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (currentType) {
      setSelectedType(currentType);
      setQuery(currentType.typeName ?? ""); // Fallback to an empty string
    }
  }, [currentType]);

  return (
    <>
      <Autocomplete
        value={selectedType || ""} // Ensure value is not null
        open={open && !isFetching}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={(event, newValue) => {
          if (newValue?.inputValue) {
            setSelectedType({ typeName: newValue.typeName });
            setQuery(newValue.typeName);
            setProductData((prev) => ({
              ...prev,
              type: { typeName: newValue.typeName },
            }));
          } else {
            setSelectedType(newValue || ""); // Ensure value is not null
            setQuery(newValue?.typeName || "");
            setProductData((prev) => ({ ...prev, type: newValue }));
          }
        }}
        isOptionEqualToValue={(option, value) => {
          return (
            option.typeName === value.typeName || option.typeName === value
          );
        }}
        filterOptions={(options, params) => {
          const filtered = options.filter((option) =>
            option.typeName
              .toLowerCase()
              .includes(params.inputValue.toLowerCase())
          );

          if (params.inputValue !== "") {
            filtered.push({
              typeName: params.inputValue,
              inputValue: `Add "${params.inputValue}"`,
            });
          }
          return filtered;
        }}
        clearOnBlur
        options={productTypes || []}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.typeName || "";
        }}
        loading={isFetching}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Product types"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isFetching ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            onChange={(event) => setQuery(event.target.value)}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li
              key={key}
              {...optionProps}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              {option.inputValue ? option.inputValue : option.typeName}
            </li>
          );
        }}
      />
    </>
  );
};

// details
const ProductDetails = ({ productData, setProductData, files, setFiles }) => {
  const [openConfirm, setOpenConfirm] = useState({ open: false, image: null });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const { mutate: deleteImage, isPending: isDeletingImage } = useMutation({
    mutationKey: (data) => [
      "deleteImage",
      { productId: data.productId, productImageId: data.productImageId },
    ],
    mutationFn: (data) =>
      productAPI.deleteProductImage(data.productId, data.productImageId),
  });

  const handleDeleteImage = (image) => {
    setOpenConfirm({ open: true, image });
  };

  const handleConfirmDelete = (image) => {
    if (image) {
      if (image?.productImageId) {
        deleteImage(
          {
            productId: productData.productId,
            productImageId: image.productImageId,
          },
          {
            onSuccess: () => {
              setProductData((prev) => ({
                ...prev,
                images: prev.images.filter(
                  (img) => img.productImageId !== image.productImageId
                ),
              }));
              toast.success("Image deleted successfully");
            },
          }
        );
      } else {
        setFiles((prevFiles) => prevFiles.filter((file) => file !== image));
        toast.success("Image deleted successfully");
      }
    }
    setOpenConfirm({ open: false, image: null });
  };

  return (
    <Box sx={{ overflowY: "auto", overflowX: "hidden", p: 3 }}>
      <Link
        component={"a"}
        target="_blank"
        href={`${import.meta.env.VITE_CLIENT}/products/${
          productData.productId
        }`}
        sx={{ mt: 3, fontWeight: 700, fontSize: "1.5rem" }}
      >
        {productData.productName}
      </Link>

      <Box>
        <Swiper
          style={{ paddingBottom: "20px", marginTop: 20 }}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            450: {
              slidesPerView: 1.25,
            },
            500: {
              slidesPerView: 1.5,
            },
            560: {
              slidesPerView: 2.0,
            },
            650: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            845: {
              slidesPerView: 3.25,
            },
          }}
        >
          {productData.images.map((image) => (
            <SwiperSlide key={image.productImageId}>
              <Image
                unShowOverlay={true}
                imageURL={image.imageUrl}
                sx={{
                  width: 200,
                  height: 200,
                  border: "2px dashed grey",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    backgroundColor: "rgba(186, 31, 29, 0.2)",
                    top: 5,
                    right: 5,
                  }}
                  onClick={() => handleDeleteImage(image)}
                >
                  <Iconify
                    icon="zondicons:close-solid"
                    sx={{
                      color: "#ba1f1d",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                  />
                </IconButton>
              </Image>
            </SwiperSlide>
          ))}
          {files.map((file) => (
            <SwiperSlide key={file.preview}>
              <Image
                unShowOverlay={true}
                imageURL={file.preview}
                sx={{
                  width: 200,
                  height: 200,
                  border: "2px dashed grey",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    backgroundColor: "rgba(186, 31, 29, 0.2)",
                    top: 5,
                    right: 5,
                  }}
                  onClick={() => handleDeleteImage(file)}
                >
                  <Iconify
                    icon="zondicons:close-solid"
                    sx={{
                      color: "#ba1f1d",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                  />
                </IconButton>
              </Image>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <Box
              sx={{
                width: 200,
                height: 200,
                border: "2px dashed grey",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="file"
                id="imageUpload1"
                accept="image/*"
                style={{
                  opacity: 0,
                  width: "200px",
                  height: "100%",
                  position: "absolute",
                  cursor: "pointer",
                }}
                onChange={handleFileChange}
              />
              <Typography variant="body2">Upload Image</Typography>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>

      <Box>
        <TextField
          label="Product Name"
          value={productData.productName || ""}
          onChange={(e) =>
            setProductData({ ...productData, productName: e.target.value })
          }
          fullWidth
          margin="normal"
        />

        <ProductTypeAutocomplete
          currentType={productData.typeName}
          setProductData={setProductData}
        />

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="demo-simple-select-label">Active</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={productData.isActive ? 1 : 0}
            name="isActive"
            label="Active"
            autoComplete="isActive"
            onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                isActive: e.target.value,
              }));
            }}
          >
            <MenuItem value={1}>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <Iconify
                  icon="teenyicons:tick-circle-solid"
                  sx={{ color: "green", mr: 1 }}
                />
                Active
              </Typography>
            </MenuItem>
            <MenuItem value={0} sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <Iconify
                  icon="zondicons:close-solid"
                  sx={{ color: "#ba1f1d", mr: 1 }}
                />
                Inactive
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Description"
          value={productData.description || ""}
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </Box>
      <ConfirmDelete
        open={openConfirm.open}
        onClose={() => setOpenConfirm({ open: false, image: null })}
        onDelete={() => handleConfirmDelete(openConfirm.image)}
      />
      <LoadingComp isLoading={isDeletingImage} />
    </Box>
  );
};

export default ProductDetails;
