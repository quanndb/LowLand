import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";

import Iconify from "src/components/iconify";

export default function UserTableRow({
  selected,
  email,
  full_name,
  role,
  gender,
  isActive,
  phone_number,
  avatarUrl,
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

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={avatarUrl} />
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{full_name}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{phone_number}</TableCell>
        <TableCell>
          {isActive ? (
            <Iconify
              icon="teenyicons:tick-circle-solid"
              sx={{ color: "green" }}
            />
          ) : (
            // đỏ đậm
            <Iconify icon="zondicons:close-solid" sx={{ color: "#ba1f1d" }} />
          )}
        </TableCell>

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
          Edit
        </MenuItem>

        <MenuItem onClick={onDeleteClick} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.string,
  email: PropTypes.string,
  full_name: PropTypes.string,
  role: PropTypes.string,
  phone_number: PropTypes.string,
  gender: PropTypes.any,
  handleClick: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};
