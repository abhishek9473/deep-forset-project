"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      router.push("/task");
    } else {
      router.push("/login");
    }
  }, [router]);

  // This page will not display anything since it redirects immediately
  return null;
};

export default Home;
