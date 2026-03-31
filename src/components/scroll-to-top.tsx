import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll down effect — starts from top of viewport
    window.scrollTo({ top: 0, behavior: "instant" });
    
    // Brief delay then animate content appearing from below
    document.documentElement.style.opacity = "0";
    document.documentElement.style.transform = "translateY(-20px)";
    document.documentElement.style.transition = "opacity 0.35s ease-out, transform 0.35s ease-out";
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.style.opacity = "1";
        document.documentElement.style.transform = "translateY(0)";
      });
    });

    // Cleanup transition after animation
    const timer = setTimeout(() => {
      document.documentElement.style.transition = "";
      document.documentElement.style.transform = "";
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
