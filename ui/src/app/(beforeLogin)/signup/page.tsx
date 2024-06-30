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

const SignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSignup = (): void => {
    setLoading(true);
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Stack className={styles.authform}>
      <Stack className={styles.authform__header}>
        <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
          Create An Account
        </Typography>
      </Stack>
      <Stack className={styles.authform__form}>
        <TextField size="small" label="Name" />
        <TextField size="small" label="Email-Id" />
        <TextField size="small" label="Password" type="password" />
      </Stack>
      <Stack className={styles.authform__actions}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={handleSignup}
        >
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
