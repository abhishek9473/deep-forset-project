// services/task-service.ts
import { API_ENDPOINTS } from "../../../config/urls";
import { destroy, get, post, put } from "../http-service";
import { ApiResponse } from "../../types/apiResponse";

export interface NewTaskDataInterface {
  name: string;
  description: string;
}

// Create a new task
export const createNewTask = (
  newTaskData: NewTaskDataInterface
): Promise<ApiResponse<any>> => {
  return post<ApiResponse<any>>(API_ENDPOINTS.TASKS.ADD, newTaskData);
};

// Get all tasks
export const getAllTasks = (): Promise<ApiResponse<any>> => {
  return get<ApiResponse<any>>(API_ENDPOINTS.TASKS.GET_ALL);
};

// Update a task by ID
export const updateTaskWithId = (
  taskId: number,
  newData: NewTaskDataInterface
): Promise<ApiResponse<any>> => {
  return put<ApiResponse<any>>(API_ENDPOINTS.TASKS.UPDATE(taskId), newData);
};

// Delete a task by ID
export const deleteTaskWithId = (taskId: number): Promise<ApiResponse<any>> => {
  return destroy<ApiResponse<any>>(API_ENDPOINTS.TASKS.DELETE(taskId));
};
