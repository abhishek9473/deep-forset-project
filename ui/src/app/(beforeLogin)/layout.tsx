"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function BeforeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      router.push("/task");
    }
  }, [router]);
  return (
    <Stack
      sx={{
        bgcolor: "#8ee8d1",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <Stack
        sx={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            height: "300px",
            width: "400px",
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Todo-App
          </Typography>
          <Typography variant="body1" gutterBottom>
            Frontend: NextJs (14), TypeScript, MUI
          </Typography>
          <Typography variant="body1">
            Backend: Python, FastAPI, PostgreSQL
          </Typography>
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: { xs: "100%", md: "500px" },
          bgcolor: "teal",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}
