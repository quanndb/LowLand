import { useState } from "react";
import PropTypes from "prop-types";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";

import Iconify from "src/components/iconify";

export default function UserTableRow({
  selected,
  description,
  importStockCode,
  STT,
  supplierName,
  import_date,
  handleClick,
  handleEdit,
  handleDelete,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const onEditClick = () => {
    handleEdit();
    handleCloseMenu();
  };

  const onDeleteClick = () => {
    handleDelete();
    handleCloseMenu();
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{STT}</TableCell>
        <TableCell>{importStockCode}</TableCell>
        <TableCell>{supplierName}</TableCell>

        <TableCell>{description}</TableCell>
        <TableCell>{import_date}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={onEditClick}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Open
        </MenuItem>

        {/* <MenuItem onClick={onDeleteClick} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem> */}
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  STT: PropTypes.string,
  importStockCode: PropTypes.string,
  import_date: PropTypes.string,
  supplierName: PropTypes.string,
  description: PropTypes.any,
  handleClick: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};
