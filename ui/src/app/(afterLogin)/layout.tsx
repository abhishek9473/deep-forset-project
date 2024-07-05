"use client";

import Navbar from "@/components/Navbar";
import { Stack } from "@mui/material";
import type { Metadata } from "next";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Todo-task</title>
        <meta name="description" content="Todo-App" />
      </Head>
      <Navbar />
      <Stack>{children}</Stack>
    </>
  );
}
