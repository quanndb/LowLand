import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Button,
} from "@mui/material";
import Iconify from "../iconify";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "src/hooks/use-debounce";

export const CustomAutocomplete = ({
  current,
  label,
  queryFn,
  labelKey,
  onInputChange,
}) => {
  const [value, setValue] = useState(current);
  const [focused, setFocused] = useState(false);

  // Debounced value to limit API calls
  const queryDebounced = useDebounce(value, 500);

  // Query for fetching options
  const { data: options = [], isLoading: loading } = useQuery({
    queryKey: ["getOptions", { query: queryDebounced }],
    queryFn: () => queryFn({ query: queryDebounced, size: 5 }),
    enabled: !!queryDebounced || focused, // Only run query if there's a value or the field is focused
  });

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setFocused(false), 100); // Delay to allow click events
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
    if (onInputChange) {
      onInputChange(event.target.value); // Call the callback with the new value
    }
  };

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <TextField
        value={value || ""}
        name={label}
        label={label}
        autoComplete={"off"}
        sx={{ minWidth: 150 }}
        onFocus={handleFocus} // Show buttons when input is focused
        onBlur={handleBlur} // Hide buttons after a delay when focus is lost
        onChange={handleInputChange} // Update options as user types
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {focused ? (
                <Iconify icon="fe:drop-up" sx={{ cursor: "pointer" }} />
              ) : (
                <Iconify icon="fe:drop-down" sx={{ cursor: "pointer" }} />
              )}
            </InputAdornment>
          ),
        }}
      />
      {focused && (
        <Box
          sx={{
            position: "absolute",
            top: "100%", // Position below the TextField
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000, // Ensure it floats above other elements
            mt: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {loading && <CircularProgress size={24} sx={{ m: 1 }} />}
          {options.map((option, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => {
                setValue(option[labelKey] || value);
                setFocused(false); // Hide buttons after selection
              }}
            >
              {option[labelKey]}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};
