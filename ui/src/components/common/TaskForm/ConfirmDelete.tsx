import { Stack, Typography } from "@mui/material";
import React from "react";
import { ButtonSmall } from "../buttons";
import { ButtonType, SmallButtonColor } from "../buttons/AllButtonProps";

interface DeleteConfirmProps {
  onCancelClick: () => void;
  onDeleteClick: () => void;
}

const ConfirmDelete: React.FC<DeleteConfirmProps> = ({
  onCancelClick,
  onDeleteClick,
}) => {
  return (
    <Stack
      sx={{
        width: "350px",
        height: "125px",
      }}
    >
      <Stack
        sx={{
          bgcolor: "yellow",
          border: "1px solid lightgray",
          borderRadius: "5px",
          height: "30px",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontWeight: "700", textAlign: "center" }}>
          Warning
        </Typography>
      </Stack>

      <Stack sx={{ flex: 1, pt: "10px" }}>
        <Typography sx={{ textAlign: "center" }}>
          This action will permanently delete this task.
        </Typography>
        <Typography
          sx={{ textAlign: "center", fontSize: "12px", color: "gray" }}
        >
          Do you want to continue?
        </Typography>
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} gap={"20px"}>
        <ButtonSmall
          label="Cancel"
          types={ButtonType.Button}
          colorVarient={SmallButtonColor.Gray}
          onClick={onCancelClick}
        />
        <ButtonSmall
          label="Delete"
          types={ButtonType.Button}
          onClick={onDeleteClick}
        />
      </Stack>
    </Stack>
  );
};

export default ConfirmDelete;
