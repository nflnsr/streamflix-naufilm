import { useEffect } from "react";

export const useHeaderVisibilityOnScroll = (elementId: string) => {
  useEffect(() => {
    let prevScrollpos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const header = document.getElementById(elementId) as HTMLElement;
      if (currentScrollPos > 60) {
        if (prevScrollpos > currentScrollPos) {
          header.style.top = "0";
          header.style.pointerEvents = "auto";
        } else {
          header.style.top = "-130px";
          header.style.pointerEvents = "none";
        }
      } else if (currentScrollPos === 0) {
        header.style.top = "0";
        header.style.pointerEvents = "auto";
      }

      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elementId]);
};
