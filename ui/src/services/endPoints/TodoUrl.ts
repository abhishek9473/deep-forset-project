import { API_ENDPOINTS } from "../../../config/urls";
import { destroy, get, post, put } from "../http-service";

interface TaskData {
  name: string;
  description: string;
}

// Create a new task
export const createNewTask = (newTaskData: TaskData) => {
  return post(API_ENDPOINTS.TASKS.ADD, newTaskData);
};

// Get all tasks
export const getAllTasks = () => {
  return get(API_ENDPOINTS.TASKS.GET_ALL);
};

// Update a task by ID
export const updateTaskWithId = (id: number, newData: TaskData) => {
  return put(API_ENDPOINTS.TASKS.UPDATE(id), newData);
};

// Delete a task by ID
export const deleteTaskWithId = (id: number) => {
  return destroy(API_ENDPOINTS.TASKS.DELETE(id), {});
};
