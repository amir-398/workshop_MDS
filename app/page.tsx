"use client";

import BannerHomePage from "../components/BannerHomePage";
import axios from "axios";
import { useEffect } from "react";
import ScrollToTop from "../components/BackToTop";
import CustomConsole from "@/components/CustomConsole";

export default function Home() {
  const fetchData = async () => {
    const fetchedData = await axios.get("http://localhost:3001/categories");
    console.log(fetchedData.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <BannerHomePage />
      <CustomConsole />
      <ScrollToTop />
    </div>
  );
}
