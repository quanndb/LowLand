import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { BlogHeader, BlogImage, BlogLink, Motto } from "./BlogComponent";
import Iconify from "src/components/iconify/iconify";
import { v4 as uuidv4 } from "uuid";
import ConfirmDelete from "../products/confirm-delete";

const MenuEditor = ({ anchorEl, open, handleClose, setContent, index }) => {
  const handleAddElement = (type) => {
    setContent((prevContent) => {
      const newContent = [...prevContent];
      const elementIndex = newContent.findIndex((item) => item.id === index);
      if (elementIndex !== -1) {
        newContent.splice(elementIndex + 1, 0, {
          id: uuidv4(),
          type: type,
          data: type === "img" ? "" : "Click here to add content",
          title: "Click here to add title",
        });
      }
      return newContent;
    });

    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      MenuListProps={{
        sx: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1,
        },
      }}
    >
      <MenuItem onClick={() => handleAddElement("h1")} title="heading 1">
        <ListItemIcon>
          <Iconify icon={"mdi:format-header-1"} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleAddElement("h2")} title="heading 2">
        <ListItemIcon>
          <Iconify icon={"mdi:format-header-2"} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleAddElement("h3")} title="heading 3">
        <ListItemIcon>
          <Iconify icon={"mdi:format-header-3"} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleAddElement("h4")} title="heading 4">
        <ListItemIcon>
          <Iconify icon={"mdi:format-header-4"} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleAddElement("p")} title="paragraph">
        <ListItemIcon>
          <Iconify icon={"system-uicons:paragraph-start"} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleAddElement("motto")} title="quote">
        <ListItemIcon>
          <Iconify icon={"mdi:format-quote-close"} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleAddElement("img")} title="image">
        <ListItemIcon>
          <Iconify icon={"material-symbols:image"} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleAddElement("link")} title="link">
        <ListItemIcon>
          <Iconify icon={"material-symbols:link"} />
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );
};

const MemoizedBlogItem = memo(
  ({
    item,
    hoveredIndex,
    setHoveredIndex,
    setAnchorEl,
    removeItem,
    setItem,
    images,
    setImages,
  }) => {
    const [mode, setMode] = useState("view");
    const inputRef = useRef(null);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

    useEffect(() => {
      if (mode === "edit" && inputRef.current) {
        inputRef.current.focus();
      }
    }, [mode]);

    const handleDeleteElement = () => {
      removeItem(item.id);
      setOpenConfirmDelete(true);
    };

    return (
      <Box
        onMouseEnter={() => setHoveredIndex(item.id)}
        onMouseLeave={() => setHoveredIndex(null)}
        sx={{ position: "relative" }}
      >
        <ConfirmDelete
          open={openConfirmDelete}
          onClose={() => setOpenConfirmDelete(false)}
          onDelete={handleDeleteElement}
        />
        {(() => {
          switch (item.type) {
            case "h1":
              return (
                <>
                  {mode === "view" ? (
                    <BlogHeader variant={"h1"} onClick={() => setMode("edit")}>
                      {item.data}
                    </BlogHeader>
                  ) : (
                    <TextField
                      inputRef={inputRef}
                      multiline
                      label="Heading 1"
                      value={item.data}
                      onChange={(e) =>
                        setItem(item.id, { ...item, data: e.target.value })
                      }
                      onBlur={() => setMode("view")}
                      sx={{ width: "100%" }}
                    />
                  )}
                </>
              );
            case "h2":
              return (
                <>
                  {mode === "view" ? (
                    <BlogHeader variant={"h2"} onClick={() => setMode("edit")}>
                      {item.data}
                    </BlogHeader>
                  ) : (
                    <TextField
                      inputRef={inputRef}
                      multiline
                      label="Heading 2"
                      value={item.data}
                      onChange={(e) =>
                        setItem(item.id, { ...item, data: e.target.value })
                      }
                      onBlur={() => setMode("view")}
                      sx={{ width: "100%" }}
                    />
                  )}
                </>
              );
            case "h3":
              return (
                <>
                  {mode === "view" ? (
                    <BlogHeader variant={"h3"} onClick={() => setMode("edit")}>
                      {item.data}
                    </BlogHeader>
                  ) : (
                    <TextField
                      inputRef={inputRef}
                      multiline
                      label="Heading 3"
                      value={item.data}
                      onChange={(e) =>
                        setItem(item.id, { ...item, data: e.target.value })
                      }
                      onBlur={() => setMode("view")}
                      sx={{ width: "100%" }}
                    />
                  )}
                </>
              );
            case "h4":
              return (
                <>
                  {mode === "view" ? (
                    <BlogHeader variant={"h4"} onClick={() => setMode("edit")}>
                      {item.data}
                    </BlogHeader>
                  ) : (
                    <TextField
                      inputRef={inputRef}
                      multiline
                      label="Heading 4"
                      value={item.data}
                      onChange={(e) =>
                        setItem(item.id, { ...item, data: e.target.value })
                      }
                      onBlur={() => setMode("view")}
                      sx={{ width: "100%" }}
                    />
                  )}
                </>
              );
            case "p":
              return (
                <>
                  {mode === "view" ? (
                    <BlogHeader
                      variant={"Paragraph"}
                      onClick={() => setMode("edit")}
                    >
                      {item.data}
                    </BlogHeader>
                  ) : (
                    <TextField
                      inputRef={inputRef}
                      multiline
                      label="Paragraph"
                      value={item.data}
                      onChange={(e) =>
                        setItem(item.id, { ...item, data: e.target.value })
                      }
                      onBlur={() => setMode("view")}
                      sx={{ width: "100%" }}
                    />
                  )}
                </>
              );
            case "motto":
              return (
                <>
                  {mode === "view" ? (
                    <Motto onClick={() => setMode("edit")}>{item.data}</Motto>
                  ) : (
                    <TextField
                      inputRef={inputRef}
                      multiline
                      label="Motto"
                      value={item.data}
                      onChange={(e) =>
                        setItem(item.id, { ...item, data: e.target.value })
                      }
                      onBlur={() => setMode("view")}
                      sx={{ width: "100%" }}
                    />
                  )}
                </>
              );
            case "link":
              return (
                <>
                  {mode === "view" ? (
                    <BlogLink
                      href={item.data}
                      sx={{ display: "block", width: "fit-content" }}
                      onClick={() => setMode("edit")}
                    >
                      {item?.title || ""}
                    </BlogLink>
                  ) : (
                    <>
                      <TextField
                        inputRef={inputRef}
                        multiline
                        label="link"
                        value={item.data}
                        onChange={(e) =>
                          setItem(item.id, { ...item, data: e.target.value })
                        }
                        sx={{ width: "100%", mb: 2 }}
                      />
                      <TextField
                        multiline
                        label="title"
                        value={item?.title || ""}
                        onChange={(e) =>
                          setItem(item.id, { ...item, title: e.target.value })
                        }
                        sx={{ width: "100%" }}
                      />
                      <Button
                        sx={{ mt: 2 }}
                        color={"success"}
                        variant="contained"
                        onClick={() => setMode("view")}
                      >
                        Upload
                      </Button>
                    </>
                  )}
                </>
              );
            case "img":
              return (
                <>
                  <BlogImage
                    images={images}
                    setImages={(images, image, callback) => {
                      setImages(images);
                      if (image)
                        setItem(item.id, { ...item, data: image.hashed });
                      if (callback) callback();
                    }}
                    onClick={() => setMode("edit")}
                    mode={mode}
                  />
                  {mode === "view" && (
                    <Typography
                      sx={{
                        mt: 2,
                        textAlign: "center",
                        fontStyle: "italic",
                        fontWeight: 600,
                      }}
                    >
                      {item.title}
                    </Typography>
                  )}
                  {mode === "edit" && (
                    <>
                      <TextField
                        inputRef={inputRef}
                        sx={{ width: "100%", mt: 2 }}
                        multiline
                        label="title"
                        value={item?.title || ""}
                        onChange={(e) =>
                          setItem(item.id, { ...item, title: e.target.value })
                        }
                      />
                      <Button
                        sx={{ mt: 2 }}
                        color="success"
                        variant="contained"
                        onClick={() => setMode("view")}
                      >
                        Upload
                      </Button>
                    </>
                  )}
                </>
              );
            default:
              return null;
          }
        })()}

        {/* Close Icon Button */}
        <IconButton
          onClick={() => setOpenConfirmDelete(true)}
          sx={{
            position: "absolute",
            top: 10,
            right: 0,
            zIndex: 1,
            opacity: hoveredIndex === item.id ? 1 : 0,
          }}
        >
          <Iconify icon={"zondicons:close-solid"} sx={{ color: "#ba1f1d" }} />
        </IconButton>

        {/* Add Icon Button */}
        <Box
          sx={{
            my: 3,
            borderBottom: "3px dashed var(--secondary-color)",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            transition: "opacity 0.3s",
            opacity: hoveredIndex === item.id ? 1 : 0,
          }}
        >
          <IconButton
            sx={{ position: "absolute", transform: "translateY(-10%)" }}
            onClick={(e) => setAnchorEl({ id: item.id, el: e.currentTarget })}
          >
            <Iconify
              icon="gg:add"
              sx={{
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
        </Box>
      </Box>
    );
  }
);

const BlogContentDisplay = memo(
  ({ initContent, setBlogDetails, images, setImages }) => {
    const [content, setContent] = useState(
      initContent.map((item) => ({ ...item, id: uuidv4() }))
    );

    useEffect(() => {
      setBlogDetails((blogDetails) => {
        return { ...blogDetails, content: content };
      });
    }, [content]);

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [anchorEl, setAnchorEl] = useState({ id: null, el: null });

    const removeItem = (id) => {
      setContent((prevContent) => prevContent.filter((item) => item.id !== id));
    };

    const setItem = (id, data) => {
      setContent((prevContent) =>
        prevContent.map((item) => (item.id === id ? data : item))
      );
    };

    const renderBlogContent = (content) => {
      return content.map((item) => (
        <MemoizedBlogItem
          key={item.id}
          item={item}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          setAnchorEl={setAnchorEl}
          removeItem={removeItem}
          setItem={setItem}
          images={images}
          setImages={setImages}
        />
      ));
    };

    return (
      <>
        {renderBlogContent(content)}
        <MenuEditor
          anchorEl={anchorEl.el}
          open={Boolean(anchorEl.el)}
          handleClose={() => setAnchorEl({ id: null, el: null })}
          setContent={setContent}
          index={anchorEl.id}
        />
      </>
    );
  }
);

const BlogEditor = ({ content, setBlogDetails, images, setImages }) => {
  return (
    <Box>
      <BlogContentDisplay
        initContent={content}
        setBlogDetails={setBlogDetails}
        images={images}
        setImages={setImages}
      />
    </Box>
  );
};

export default BlogEditor;
