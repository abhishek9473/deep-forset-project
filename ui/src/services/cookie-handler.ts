import Cookies from "js-cookie";

// Set the expiration time in seconds
const expirationTime = 60 * 60 * 24 * 10; // 10 days

export const setJwtInCookie = (token: string): void => {
  Cookies.set("token", token, {
    expires: new Date(Date.now() + expirationTime * 1000),
    path: "/",
    secure: true,
  });
};

// Uncomment and convert the setNameInCookie function if needed
// export const setNameInCookie = (userName: string): void => {
//   Cookies.set("name", userName, {
//     expires: new Date(Date.now() + expirationTime * 1000),
//     path: "/",
//   });
// };
