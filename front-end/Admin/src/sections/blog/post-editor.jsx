import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BlogEditor from "./editor";
import ImageInput from "./image-input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import blogAPI from "src/services/API/blogAPI";
import LoadingComp from "src/components/loading/LoadingComp";
import ConfirmDelete from "../../components/dialog/confirm-delete";
import { CustomAutocomplete } from "src/components/input/CustomAutoComplete";
import cagetoryAPI from "src/services/API/cagetoryAPI";
import { useResponsive } from "src/hooks/use-responsive";
import ConfirmOut from "src/components/dialog/confirm-out";
import Iconify from "src/components/iconify";

const PostEditor = ({ cancel, blogId }) => {
  const { data: updateBlog, refetch } = useQuery({
    queryKey: ["updateBlog", { blogId }],
    queryFn: () => blogAPI.getDetails(blogId),
    enabled: !!blogId,
  });

  return (
    <>
      {blogId ? (
        updateBlog ? (
          <EditorBody
            cancel={cancel}
            initBlogDetails={updateBlog}
            refetch={refetch}
          />
        ) : (
          <LoadingComp isLoading={true} />
        )
      ) : (
        <EditorBody
          cancel={cancel}
          initBlogDetails={{
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
          }}
        />
      )}
    </>
  );
};

const EditorBody = ({ cancel, initBlogDetails, refetch }) => {
  const [blogDetails, setBlogDetails] = useState(initBlogDetails);

  const [images, setImages] = useState([]);

  const [content, setContent] = useState(
    blogDetails.content.map((item) => ({ ...item, id: uuidv4() }))
  );
  const [confirmOut, setConfirmOut] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: uploadBlog, isPending: isUploading } = useMutation({
    mutationKey: (blogDetails) => ["createBlog", { blogDetails }],
    mutationFn: (blogDetails) => {
      return blogAPI.createBlog(blogDetails);
    },
  });

  const { mutate: updateBlog, isPending: isUpdating } = useMutation({
    mutationKey: ({ blogId, blogDetails }) => [
      "updateBlog",
      { blogId, blogDetails },
    ],
    mutationFn: ({ blogId, blogDetails }) => {
      return blogAPI.updateBlog(blogId, blogDetails);
    },
  });

  const { mutate: deleteBlog, isPending: isDeleting } = useMutation({
    mutationKey: (blogId) => ["deleteBlog", { blogId }],
    mutationFn: (blogId) => {
      return blogAPI.deleteBlog(blogId);
    },
  });

  const isMobile = useResponsive("down", 900);

  const handleCancel = () => {
    setConfirmOut(false);
    cancel();
  };

  const handleDelete = () => {
    deleteBlog(blogDetails.blogId, {
      onSuccess: () => {
        handleCancel();
        toast.success("Blog deleted successfully");
      },
    });
    setConfirmDelete(false);
  };

  const handleUpload = () => {
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

    if (initBlogDetails?.blogId) {
      updateBlog(
        { blogId: blogDetails.blogId, blogDetails: formData },
        {
          onSuccess: () => {
            handleCancel();
            toast.success("Blog updated successfully");
            refetch();
          },
        }
      );
    } else {
      uploadBlog(formData, {
        onSuccess: () => {
          handleCancel();
          toast.success("Blog created successfully");
        },
      });
    }
  };

  const handleGoToBlog = (e) => {
    e.preventDefault();
    window.open(
      import.meta.env.VITE_CLIENT + "/blogs/" + blogDetails.blogId,
      "_blank"
    );
  };

  return (
    <Dialog
      open={true}
      onClose={handleCancel}
      fullWidth
      fullScreen={isMobile}
      maxWidth="xl"
      disableEscapeKeyDown
      sx={{ width: "100%" }}
    >
      <DialogTitle>Edit Blog</DialogTitle>
      <DialogContent>
        <LoadingComp isLoading={isUploading || isDeleting || isUpdating} />
        <ConfirmOut
          open={confirmOut}
          onClose={() => setConfirmOut(false)}
          onOut={handleCancel}
        />
        <ConfirmDelete
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onDelete={handleDelete}
        />

        <Box>
          {initBlogDetails?.blogId && (
            <Button
              component="a"
              href={`${import.meta.env.VITE_CLIENT}/blogs/${
                initBlogDetails.blogId
              }}`}
              onClick={handleGoToBlog}
              sx={{ my: 3, fontWeight: "bold", textDecoration: "underline" }}
            >
              Blog link
            </Button>
          )}
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
          <Typography sx={{ my: 3, fontWeight: "bold" }}>
            Description:
          </Typography>
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
          <Box width={{ xs: "100%", md: "50%" }}>
            <CustomAutocomplete
              label={"Category"}
              labelKey={"name"}
              current={blogDetails.categoryName}
              queryFn={cagetoryAPI.getCagetories}
              onInputChange={(value) =>
                setBlogDetails({ ...blogDetails, categoryName: value.value })
              }
              sx={{ width: "100%" }}
            />
          </Box>
          <Typography sx={{ my: 3, fontWeight: "bold" }}>Banner:</Typography>
          <ImageInput
            init={{ data: blogDetails.imageURL, title: "banner" }}
            images={images}
            setImages={(images, image, callback) => {
              setImages(images);
              if (image) {
                setBlogDetails({
                  ...blogDetails,
                  imageURL: image?.hashed ? image?.hashed : image?.data,
                });
              }
              if (callback) callback();
            }}
            sx={{ maxHeight: 200, overflow: "hidden" }}
          />

          <Typography sx={{ my: 3, fontWeight: "bold" }}>Content:</Typography>
          <BlogEditor
            setBlogDetails={setBlogDetails}
            setImages={setImages}
            images={images}
            content={content}
            setContent={setContent}
          />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "end",
          flexWrap: "wrap-reverse",
          boxShadow: "0px -3px 10px rgba(0, 0, 0, 0.1)",
          gap: 1,
          py: 3,
        }}
      >
        <Box>
          {initBlogDetails?.blogId && (
            <Button
              variant="contained"
              color="error"
              sx={{ width: "200px" }}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </Button>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1,
            ml: "0px !important",
          }}
        >
          <Button
            sx={{ width: "200px" }}
            variant="outlined"
            onClick={() => setConfirmOut(true)}
            aria-label="Cancel"
            aria-hidden="false"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            sx={{ width: "200px" }}
            onClick={handleUpload}
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
      </DialogActions>
    </Dialog>
  );
};

export default PostEditor;
