"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Check for the presence of the token in cookies
    const token = Cookies.get("token");

    if (token) {
      // If token is present, redirect to /task
      router.push("/task");
    } else {
      // If token is not present, redirect to /login
      router.push("/login");
    }
  }, [router]);

  // This page will not display anything since it redirects immediately
  return null;
};

export default Home;
