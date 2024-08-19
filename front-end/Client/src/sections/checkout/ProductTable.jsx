import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Image from "src/components/Image";
import { formatPrice } from "src/utils/format-number";

const ProductTable = ({ products }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "645px" }}>
      <Table
        sx={{ minWidth: 700, position: "relative" }}
        aria-label="spanning table"
      >
        <TableHead
          sx={{ backgroundColor: "#f1f1f1", position: "sticky", top: 0 }}
        >
          <TableRow>
            <TableCell align="center" colSpan={4}>
              Products
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Details
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                <Image
                  imageURL={product.imageURL}
                  sx={{ height: 100, width: 100 }}
                  unShowOverlay={true}
                />
              </TableCell>
              <TableCell align="left">{product.productName}</TableCell>
              <TableCell align="left">{product.size}</TableCell>
              <TableCell align="left">{formatPrice(product.price)}</TableCell>
              <TableCell align="left">{product.quantity}</TableCell>
              <TableCell align="left">
                {formatPrice(product.price * product.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
