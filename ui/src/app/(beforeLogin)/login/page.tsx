"use client";

import styles from "../AuthForm.module.css"; 
import React, { useState } from "react";
import { Stack, TextField, Typography, Snackbar, Alert } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginUser } from "@/services/endPoints/authUrl";
import {
  setEmailInCookie,
  setJwtInCookie,
  setNameInCookie,
} from "@/services/cookie-handler";
import { ApiResponse } from "@/types/apiResponse";
import {
  ButtonType,
  ButtonXLarge,
  ButtonXLargeColor,
} from "@/components/common";

// Define the interface for form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const router = useRouter();

  // Function to handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to handle login form submission
  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const res: ApiResponse<any> = await loginUser(data);
      if (res.status) {
        setJwtInCookie(res.entity.access_token);
        setNameInCookie(res.entity.name);
        setEmailInCookie(res.entity.email);
        setMessage("Login successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        router.push("/task");
      } else {
        setMessage("Login failed: " + res.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      console.error("Login error", error);
      setMessage(
        "An error occurred during login: " +
          (error.response?.data?.message || error.message)
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      className={styles.authform}
      component="form"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Stack className={styles.authform__header}>
        <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
          Login
        </Typography>
      </Stack>
      <Stack className={styles.authform__form}>
        <TextField
          size="small"
          label="Email-Id"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Enter a valid email",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          size="small"
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Stack>
      <Stack className={styles.authform__actions}>
        <ButtonXLarge
          label="Login"
          isLoading={loading}
          types={ButtonType.Submit}
          colorVarient={ButtonXLargeColor.Green}
        />
        <Typography className={styles.authform__link}>
          Don't have an account? <Link href="/signup">Create Now</Link>
        </Typography>
      </Stack>
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
    </Stack>
  );
};

export default LoginPage;
