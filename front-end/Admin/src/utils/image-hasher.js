export async function hashImage(file) {
  // Convert the file to an ArrayBuffer (binary data)
  const arrayBuffer = await file.arrayBuffer();

  // Hash the binary data using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);

  // Convert the hash from ArrayBuffer to hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // Convert bytes to hex string

  return hashHex;
}
