// config/urls.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

if (!BASE_URL) {
  throw new Error("Environment variable NEXT_PUBLIC_API_URL is not set");
}

console.log("Base URL:", BASE_URL);

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${BASE_URL}/signup`,
    LOGIN: `${BASE_URL}/login`,
  },
  TASKS: {
    GET_ALL: `${BASE_URL}/all_tasks`,
    ADD: `${BASE_URL}/add_task`,
    DELETE: (id: number) => `${BASE_URL}/delete_task/${id}`,
    UPDATE: (id: number) => `${BASE_URL}/update_task/${id}`,
  },
};
