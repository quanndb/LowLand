import PropTypes from "prop-types";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

PostSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function PostSort({ value, options, onSort, sx }) {
  return (
    <TextField select value={value} onChange={onSort} sx={sx}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
