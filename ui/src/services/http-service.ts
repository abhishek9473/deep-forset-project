import axiosInstance from "./axios-instance-service";

// Define a generic type for the response data
type AxiosResponseData<T> = T;

// Post
export const post = <T>(url: string, entity: T): Promise<AxiosResponseData<T>> =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post<T>(url, entity)
      .then((response) => {
        if (response && response.data) {
          resolve(response.data);
        }
      })
      .catch((ex) => {
        reject(ex);
      });
  });

// Fetch
export const get = <T>(url: string): Promise<AxiosResponseData<T>> =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get<T>(url)
      .then((response) => {
        if (response && response.data) {
          resolve(response.data);
        }
      })
      .catch((ex) => {
        reject(ex);
      });
  });

// Delete
export const destroy = <T>(url: string, entity: T): Promise<AxiosResponseData<T>> =>
  new Promise((resolve, reject) => {
    axiosInstance
      .delete<T>(url, {
        data: entity,
      })
      .then((response) => {
        if (response && response.data) {
          resolve(response.data);
        }
      })
      .catch((ex) => {
        reject(ex);
      });
  });

// Update
export const put = <T>(url: string, entity: T): Promise<AxiosResponseData<T>> =>
  new Promise((resolve, reject) => {
    axiosInstance
      .put<T>(url, entity)
      .then((response) => {
        if (response && response.data) {
          resolve(response.data);
        }
      })
      .catch((ex) => {
        reject(ex);
      });
  });
