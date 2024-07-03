"use client";

import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../AuthForm.module.css"; // Import the shared CSS module
import { registerUser } from "@/services/endPoints/authUrl";

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

  //  // api call for all task data from database(sql by sequlize)
  //  useEffect(() => {
  //   getAllTasksAdminCall(userId)
  //     .then((responce) => {
  //       if (responce.status) {
  //         setAllTasks(responce.entity);
  //         setPageReady(true);
  //       }
  //     })
  //     .catch((err) => console.log("error in get all tasks", err));
  // }, [refreshtask, userId]);

  const handleSignup: SubmitHandler<SignupFormInputs> = (data) => {
    setLoading(true);
    console.log(data);
    registerUser(data).then((res) => console.log("newuser-req", res));
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
        <Button size="medium" variant="contained" color="primary" type="submit">
          {loading ? <CircularProgress color="inherit" size={25} /> : "Signup"}
        </Button>
        <Typography className={styles.authform__link}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SignupPage;
