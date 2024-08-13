export async function fileToBase64(fileOrLink) {
  if (typeof fileOrLink === "string") {
    // Handle URL
    try {
      const response = await fetch(fileOrLink);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      return await blobToBase64(blob);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      return null;
    }
  } else if (fileOrLink instanceof File) {
    // Handle File object
    try {
      return await fileToBase64Local(fileOrLink);
    } catch (error) {
      console.error(
        "There has been a problem with your file operation:",
        error
      );
      return null;
    }
  } else {
    throw new Error("Input must be a URL string or a File object");
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function fileToBase64Local(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const handleGetImage = (value) => {
  if (value !== "") {
    fileToBase64(value).then((image) => {
      return image;
    });
  }
  return undefined;
};
