import { Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonSmall } from "../buttons";
import { ButtonType, SmallButtonColor } from "../buttons/AllButtonProps";
import styles from "./TaskForm.module.css"; // Import the CSS module

interface UpdateTaskFormProps {
  onAddTask: (formData: { name: string; description: string }) => void;
  onCancel: () => void;
}

interface TaskFormInputs {
  name: string;
  description: string;
}

const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({
  onAddTask,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormInputs>();

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    onAddTask(data);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.taskForm}
    >
      <Stack className={styles.taskForm__header}>
        <Typography className={styles.taskForm__title}>Update Task</Typography>
      </Stack>
      <Stack className={styles.taskForm__body}>
        <TextField
          size="small"
          label="Task name"
          {...register("name", { required: "Task name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          multiline
          rows={4}
          size="small"
          label="Task Description"
          {...register("description", {
            required: "Task description is required",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          className={styles.taskForm__description}
        />
      </Stack>
      <Stack className={styles.taskForm__actions}>
        <ButtonSmall
          label="Cancel"
          colorVarient={SmallButtonColor.Gray}
          types={ButtonType.Button}
          onClick={onCancel}
        />
        <ButtonSmall
          label="Update"
          colorVarient={SmallButtonColor.MildGreen}
          types={ButtonType.Submit}
        />
      </Stack>
    </Stack>
  );
};

export default UpdateTaskForm;
