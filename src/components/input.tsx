import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function StateTextFields() {
  const [name, setName] = React.useState("");

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-controlled"
        label="New Todo"
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}
      />
      <Button variant="contained" endIcon={<AddIcon />}>
        Add New
      </Button>
    </Box>
  );
}
