"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Divider,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { ExpendMoreIcons } from "@/components/icons";
import {
  ButtonSmall,
  ButtonType,
  ConfirmDelete,
  CreateTaskForm,
  SmallButtonColor,
  UpdateTaskForm,
} from "@/components/common";
import styles from "./TaskPage.module.css";
import { ApiResponse } from "@/types/apiResponse";
import {
  NewTaskDataInterface,
  createNewTask,
  deleteTaskWithId,
  getAllTasks,
  updateTaskWithId,
} from "@/services/endPoints/TodoUrl";

interface Task {
  id: number;
  name: string;
  description: string;
}

const TaskPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [userAllTasks, setUserAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [taskForUpdate, setTaskForUpdate] = useState<Task | null>(null);
  const [taskIdForDelete, setTaskIdForDelete] = useState<number | null>(null);
  const [addFormDialogOpen, setAddFormDialogOpen] = useState<boolean>(false);
  const [updateFormDialogOpen, setUpdateFormDialogOpen] =
    useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [refresh, setrefresh] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response: ApiResponse<Task[]> = await getAllTasks();
        if (response.status) {
          setUserAllTasks(response.entity || []);
        } else {
          setMessage("Failed to fetch tasks: " + response.message);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      } catch (error: any) {
        setMessage(
          "An error occurred: " +
            (error.response?.data?.message || error.message)
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [refresh]);

  // for task add
  const addTaskHandler = async (data: NewTaskDataInterface) => {
    try {
      const response = await createNewTask(data);
      if (response.status) {
        handleDialogClose();
        setMessage("Task Added");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setrefresh((i) => !i);
      } else {
        setMessage("Failed to add tasks " + response.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      setMessage(
        "An error occurred: " + (error.response?.data?.message || error.message)
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // for task update
  const updateTaskHandler = async (data: {
    taskId: number;
    newTaskData: NewTaskDataInterface;
  }) => {
    try {
      const response = await updateTaskWithId(data.taskId, data.newTaskData);
      if (response.status) {
        handleDialogClose();
        setMessage("Task Updated");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setrefresh((i) => !i);
      } else {
        setMessage("Failed to add task " + response.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      setMessage(
        "An error occurred: " + (error.response?.data?.message || error.message)
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // for task update
  const deleteTaskHandler = async (taskId: number) => {
    try {
      const response = await deleteTaskWithId(taskId);
      if (response.status) {
        handleDialogClose();
        setMessage("Task Deleted");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setrefresh((i) => !i);
      } else {
        setMessage("Failed to delete task " + response.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      setMessage(
        "An error occurred: " + (error.response?.data?.message || error.message)
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleDialogClose = () => {
    setAddFormDialogOpen(false);
    setDeleteDialogOpen(false);
    setUpdateFormDialogOpen(false);
  };

  return (
    <>
      <Stack className={styles["task-page"]}>
        <Stack className={styles["task-page__container"]}>
          <Stack className={styles["task-page__header"]}>
            <Typography className={styles["task-page__title"]}>
              All Tasks
            </Typography>
            <ButtonSmall
              label="Add Task"
              colorVarient={SmallButtonColor.MildGreen}
              types={ButtonType.Button}
              onClick={() => setAddFormDialogOpen(true)}
            />
          </Stack>
          <Divider />
          {loading ? (
            <CircularProgress />
          ) : (
            <Stack
              sx={{
                maxHeight: "350px",
                overflowY: "scroll",
                scrollbarWidth: "none",
              }}
            >
              {userAllTasks?.map((task) => (
                <Accordion
                  key={task.id}
                  expanded={expanded === `panel${task.id}`}
                  onChange={handleChange(`panel${task.id}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpendMoreIcons />}
                    aria-controls={`panel${task.id}bh-content`}
                    id={`panel${task.id}bh-header`}
                  >
                    <Stack className={styles["task-page__accordion-summary"]}>
                      <Typography>{task.name}</Typography>
                      {/* <Typography>{task.status}</Typography> */}
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack className={styles["task-page__accordion-details"]}>
                      <Stack className={styles["task-page__details-content"]}>
                        <Typography
                          className={
                            styles["task-page__details-content__description"]
                          }
                        >
                          {task.description}
                        </Typography>
                      </Stack>
                      <Stack className={styles["task-page__actions"]}>
                        <ButtonSmall
                          onClick={() => {
                            setTaskIdForDelete(task.id);
                            setDeleteDialogOpen(true);
                          }}
                          label="Delete"
                          types={ButtonType.Button}
                        />
                        <ButtonSmall
                          onClick={() => {
                            setUpdateFormDialogOpen(true);
                            setTaskForUpdate(task);
                          }}
                          label="Update"
                          colorVarient={SmallButtonColor.MildGreen}
                          types={ButtonType.Button}
                        />
                      </Stack>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>

      {/* for add task */}
      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={addFormDialogOpen}
        PaperProps={{
          style: {
            backgroundColor: "white", // Change this to your desired background color
          },
        }}
      >
        <DialogContent>
          <CreateTaskForm
            onAddTask={(data) => addTaskHandler(data)}
            onCancel={handleDialogClose}
          />
        </DialogContent>
      </Dialog>

      {/* for update the task */}
      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={updateFormDialogOpen}
        PaperProps={{
          style: {
            backgroundColor: "white", // Change this to your desired background color
          },
        }}
      >
        <DialogContent>
          {taskForUpdate && (
            <UpdateTaskForm
              initialValue={taskForUpdate}
              onAddTask={(data) => updateTaskHandler(data)}
              onCancel={handleDialogClose}
            />
          )}
        </DialogContent>
      </Dialog>
      {/* for delete task confirmation */}
      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={deleteDialogOpen}
        PaperProps={{
          style: {
            backgroundColor: "white", // Change this to your desired background color
          },
        }}
      >
        <DialogContent>
          {taskIdForDelete && (
            <ConfirmDelete
              onCancelClick={handleDialogClose}
              onDeleteClick={() => deleteTaskHandler(taskIdForDelete)}
            />
          )}
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TaskPage;
