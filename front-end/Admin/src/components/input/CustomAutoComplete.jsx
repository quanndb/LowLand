import React, { useEffect, useState } from "react";
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
  labelKey,
  queryFn,
  onInputChange,
  sx,
}) => {
  const [value, setValue] = useState(current);
  useEffect(() => {
    if (current) {
      setValue(current);
    }
  }, [current]);
  const [focused, setFocused] = useState(false);

  // Debounced value to limit API calls
  const queryDebounced = useDebounce(value, 500);

  // Query for fetching options
  const { data: options = [], isLoading: loading } = useQuery({
    queryKey: ["getOptions", { query: queryDebounced }],
    queryFn: () => queryFn({ query: queryDebounced, size: 5 }),
    enabled: focused, // Only run query if there's a value or the field is focused
  });

  const handleInputChange = (value) => {
    setValue(value);
    onInputChange({
      value: value,
      option: options.find((o) => o[labelKey] === value),
    }); // Call the callback with the new value
  };

  const handleBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 100);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        value={value || ""}
        name={label}
        label={label}
        autoComplete={"off"}
        sx={{ minWidth: 150, ...sx }}
        onFocus={() => setFocused(true)} // Show buttons when input is focused
        onBlur={handleBlur} // Hide buttons when input is blurred
        onChange={(e) => handleInputChange(e.target.value)} // Update options as user types
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
            top: "100%",
            left: 0,
            width: "100%",
            borderRadius: "4px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            backgroundColor: "white",
            zIndex: 1000,
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
                handleInputChange(option[labelKey] || value);
                setFocused(false);
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
