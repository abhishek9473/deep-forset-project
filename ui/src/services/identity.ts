import Cookies from "js-cookie";

export const getAuth = (): string | undefined => {
  return Cookies.get("token");
}

// Uncomment and convert the getUserName function if needed
// export const getUserName = (): string | undefined => {
//   return Cookies.get("name");
// };
