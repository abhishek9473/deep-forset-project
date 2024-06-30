import { Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { ButtonSmall } from "../buttons";
import { ButtonType } from "../buttons/AllButtonProps";

const CreateTaskForm: React.FC = () => {
  return (
    <Stack
      sx={{ height: "300px", width: "260px", bgcolor: "yellow", p: "20px" }}
    >
      <Stack
        sx={{
          height: "30px",
          textAlign: "center",
          alignItems: "center",
          bgcolor: "orange",
        }}
      >
        <Typography sx={{ fontSize: "1.3rem", fontWeight: "700" }}>
          New Task
        </Typography>
      </Stack>
      <Stack sx={{ flex: 1, pt:"20px", gap:"20px" }}>
        <TextField size="small" label="Email-Id" />
        <TextField
          multiline
          error={true}
          rows={4}
          size="small"
          label="Password"
          sx={{
            "& textarea": {
              scrollbarWidth: "none" /* For Firefox */,
              "-ms-overflow-style": "none" /* For Internet Explorer and Edge */,
            },
            "& textarea::-webkit-scrollbar": {
              display: "none" /* For Chrome, Safari, and Opera */,
            },
          }}
        />
      </Stack>
      <Stack sx={{ flexDirection: "row", gap: "10px", justifyContent: "end" }}>
        <ButtonSmall label="ok" types={ButtonType.Button} />
        <ButtonSmall label="ok" types={ButtonType.Button} />
      </Stack>
    </Stack>
  );
};

export default CreateTaskForm;
