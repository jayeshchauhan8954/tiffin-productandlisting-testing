import { useEffect, useState } from "react";
// material
import { InputAdornment, TextField, useTheme } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

// ----------------------------------------------------------------------

export default function CustomSearch({ value, cb = () => { }, intervalTime = 800, sx, enableDebounce = true, ...other }) {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState(value || null);
  const handleChange = (e) => {
    setInputValue(e.target.value);
    !enableDebounce && cb(e.target.value)
  }

  useEffect(() => {
    if (enableDebounce) {
      let timeOut = null;

      if (inputValue !== null && inputValue !== value) {
        timeOut = setTimeout(() => cb(inputValue), intervalTime);
      }

      return () => clearTimeout(timeOut);
    }
  }, [inputValue, value]);

  return (
    <TextField
      size="small"
      variant="outlined"
      value={inputValue}
      onChange={handleChange}
      placeholder="Search here..."
      sx={{ minWidth: 130, ...sx }}
      InputProps={{
        sx: { background: theme.palette.background.paper },
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon />
          </InputAdornment>
        ),
      }}
      {...other}
    />
  )
}