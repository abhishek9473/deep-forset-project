"use client";

import styles from "../AuthForm.module.css"; 
import React, { useState } from "react";
import { Stack, TextField, Typography, Snackbar, Alert } from "@mui/material";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "@/services/endPoints/authUrl";
import {
  setEmailInCookie,
  setJwtInCookie,
  setNameInCookie,
} from "@/services/cookie-handler";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/apiResponse";
import {
  ButtonType,
  ButtonXLarge,
  ButtonXLargeColor,
} from "@/components/common";

// Define the interface for form inputs
interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
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

  // Function to handle signup form submission
  const handleSignup: SubmitHandler<SignupFormInputs> = async (data) => {
    setLoading(true);
    try {
      const res: ApiResponse<any> = await registerUser(data);
      if (res.status) {
        setJwtInCookie(res.entity.access_token);
        setNameInCookie(res.entity.name);
        setEmailInCookie(res.entity.email);
        setMessage("Registration successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        router.push("/task");
      } else {
        setMessage("Registration failed: " + res.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      console.error("Registration error", error);
      setMessage(
        "An error occurred during registration: " +
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
      onSubmit={handleSubmit(handleSignup)}
    >
      <Stack className={styles.authform__header}>
        <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
          Create An Account
        </Typography>
      </Stack>
      <Stack className={styles.authform__form}>
        <TextField
          size="small"
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
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
          label="Signup"
          isLoading={loading}
          types={ButtonType.Submit}
          colorVarient={ButtonXLargeColor.Orange}
        />
        <Typography className={styles.authform__link}>
          Already have an account? <Link href="/login">Login</Link>
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

export default SignupPage;
