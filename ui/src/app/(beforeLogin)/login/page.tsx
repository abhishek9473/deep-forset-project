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
import styles from "../AuthForm.module.css"; // Import the shared CSS module
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (): void => {
    setLoading(true);
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    router.push("/task");
  };

  return (
    <Stack className={styles.authform}>
      <Stack className={styles.authform__header}>
        <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
          Login
        </Typography>
      </Stack>
      <Stack className={styles.authform__form}>
        <TextField size="small" label="Email-Id" />
        <TextField size="small" label="Password" type="password" />
      </Stack>
      <Stack className={styles.authform__actions}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          {loading ? <CircularProgress color="inherit" size={25} /> : "Login"}
        </Button>
        <Typography className={styles.authform__link}>
          Don't have an account? <Link href="/signup">Create Now</Link>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
