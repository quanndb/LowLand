import { Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Image from "src/components/Image";

import { hashImage } from "src/utils/image-hasher";

const ImageInput = ({ init, images, setImages, mode, sx }) => {
  const [outURL, setOutURL] = useState(null);
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (images.length === 0 && image?.data) {
      URL.revokeObjectURL(image.data);
      inputRef.current?.value ? (inputRef.current.value = null) : null;
      setImage(null);
    }
    return () => {
      if (image?.data) URL.revokeObjectURL(image.data);
    };
  }, [images, image]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      hashImage(file).then((res) => {
        file.hashed = res;
        file.data = URL.createObjectURL(file);
        setImages([...images, file], file);
        setImage(file);
      });
    }
  };

  return (
    <>
      <Box
        width={"100%"}
        sx={{
          border: "1px dashed black",
          position: "relative",
          minHeight: 300,
          ...sx,
        }}
      >
        <Image
          imageURL={outURL ? outURL : image?.data ? image.data : init?.data}
          alt={image?.title ? image.title : init?.title}
          sx={{ width: "100%", height: "100%", minHeight: 600 }}
          unShowOverlay={true}
        />
      </Box>
      {mode !== "view" && !image && (
        <TextField
          label="Enter image URL"
          value={outURL ? outURL : init?.data}
          onChange={(e) => {
            setOutURL(e.target.value);
            setImages([...images], { data: e.target.value });
          }}
          sx={{ width: "100%", mt: 2 }}
        />
      )}
      {mode !== "view" && !outURL && (
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => handleChangeImage(e)}
          style={{ zIndex: 1000 }}
        />
      )}
    </>
  );
};

export default ImageInput;
