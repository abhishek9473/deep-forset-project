import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <Stack
      sx={{
        height: "60px",
        bgcolor: "teal",
        textAlign: "center",
        flexDirection: "row",

        justifyContent: "space-between",
        alignItems: "center",
        px: "45px",
      }}
    >
      <Box />
      <Typography
        sx={{ fontSize: "1.5rem", fontWeight: "700", color: "white" }}
      >
        To-Do App
      </Typography>
      <Tooltip title="Abhishek">
        <Avatar>A</Avatar>
      </Tooltip>
    </Stack>
  );
};

export default Navbar;
