

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 cursor-pointer bg-white p-2 rounded-full shadow-lg animate-bounce"
        >
          <Image
            src="/images/mushroom.png"
            alt="Retour en haut"
            width={50}
            height={50}
          />
        </div>
      )}
    </div>
  );
};

export default BackToTop;
