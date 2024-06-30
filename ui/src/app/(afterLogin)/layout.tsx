import Navbar from "@/components/Navbar";
import { Stack } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo-task",
  description: "Todo-App",
};

export default function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Stack >{children}</Stack>
    </>
  );
}
