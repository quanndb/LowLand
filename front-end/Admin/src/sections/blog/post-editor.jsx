import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BlogEditor from "./editor";
import ImageInput from "./image-input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import blogAPI from "src/services/API/blogAPI";
import LoadingComp from "src/components/loading/LoadingComp";
import ConfirmDelete from "../products/confirm-delete";
import { CustomAutocomplete } from "src/components/input/CustomAutoComplete";
import cagetoryAPI from "src/services/API/cagetoryAPI";

const PostEditor = () => {
  const [blogDetails, setBlogDetails] = useState({
    categoryName: "",
    title: "",
    description: "",
    imageURL: "",
    content: [
      {
        type: "h2",
        data: "Click here to add content",
      },
    ],
  });

  const [images, setImages] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: uploadBlog, isPending: isUploading } = useMutation({
    mutationKey: (blogDetails) => ["createBlog", { blogDetails }],
    mutationFn: (blogDetails) => {
      return blogAPI.createBlog(blogDetails);
    },
  });

  const handleCancel = () => {
    setImages([]);
    setBlogDetails({
      categoryName: "",
      title: "",
      description: "",
      imageURL: "",
      content: [
        {
          type: "h2",
          data: "Click here to add content",
        },
      ],
    });
    setConfirmDelete(false);
  };

  const handleAddBlog = () => {
    const formData = new FormData();

    formData.append(
      "request",
      JSON.stringify({
        ...blogDetails,
        content: blogDetails.content.filter(
          (item) => item.data !== "" && item.data !== null
        ),
      })
    );
    images.forEach((image) => {
      formData.append("images", image);
    });

    uploadBlog(formData, {
      onSuccess: () => {
        setImages([]);
        setBlogDetails({
          categoryName: "",
          title: "",
          description: "",
          imageURL: "",
          content: [{ type: "h2", data: "Click here to add content" }],
        });
        toast.success("Blog created successfully");
      },
    });
  };

  return (
    <Card raised>
      <LoadingComp isLoading={isUploading} />
      <ConfirmDelete
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onDelete={handleCancel}
      />
      <Box sx={{ p: 3 }}>
        <Typography sx={{ mb: 3, fontWeight: "bold" }}>Title:</Typography>
        <TextField
          multiline
          sx={{ width: "100%" }}
          label="Title"
          value={blogDetails.title}
          onChange={(e) =>
            setBlogDetails({ ...blogDetails, title: e.target.value })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleAddComment(e);
            }
          }}
        />
        <Typography sx={{ my: 3, fontWeight: "bold" }}>Description:</Typography>
        <TextField
          multiline
          sx={{ width: "100%" }}
          label="Description"
          value={blogDetails.description}
          onChange={(e) =>
            setBlogDetails({ ...blogDetails, description: e.target.value })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleAddComment(e);
            }
          }}
        />
        <Typography sx={{ my: 3, fontWeight: "bold" }}>
          Cagetory name:
        </Typography>
        <CustomAutocomplete
          label={"Category"}
          labelKey={"categoryName"}
          current={blogDetails.categoryName}
          queryFn={cagetoryAPI.getCagetories}
          onInputChange={(value) =>
            setBlogDetails({ ...blogDetails, categoryName: value.value })
          }
        />
        <Typography sx={{ my: 3, fontWeight: "bold" }}>Banner:</Typography>
        <ImageInput
          images={images}
          setImages={(images, image, callback) => {
            setImages(images);
            if (image) {
              setBlogDetails({ ...blogDetails, imageURL: image.hashed });
            }
            if (callback) callback();
          }}
          sx={{ maxHeight: 200, overflow: "hidden" }}
        />

        <Typography sx={{ my: 3, fontWeight: "bold" }}>Content:</Typography>
        <Card sx={{ p: 3 }} raised>
          <BlogEditor
            setBlogDetails={setBlogDetails}
            setImages={setImages}
            images={images}
            content={blogDetails.content}
          />
        </Card>
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "end", mt: 3 }}
        >
          <Button
            sx={{ width: "200px", mr: 2 }}
            variant="outlined"
            onClick={() => setConfirmDelete(true)}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ width: "200px" }}
            onClick={handleAddBlog}
            disabled={
              isUploading ||
              !blogDetails.categoryName ||
              !blogDetails.title ||
              !blogDetails.description ||
              !blogDetails.imageURL ||
              !blogDetails.content
            }
          >
            Save
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default PostEditor;
