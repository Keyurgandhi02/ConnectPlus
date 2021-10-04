import React, { useEffect, useState } from "react";
import uparrow from "../../src/assets/images/uparrow1.svg";
export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div>
          <button
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "0px",
              right: "0px",
              border: "none",
              marginRight: "20px",
              height: "50px",
              marginBottom: "10px",
              backgroundColor: "#2541b2",
              width: "50px",
              cursor: "pointer",
              zIndex: "1000",
            }}
          >
            <img src={uparrow} alt="" />
          </button>
        </div>
      )}
    </>
  );
}
