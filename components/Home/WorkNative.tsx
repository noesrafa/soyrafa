"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Work() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Animar cards
      document.querySelectorAll(".row").forEach((row, index) => {
        const cardLeft = row.querySelector(".card-left") as HTMLElement;
        const cardRight = row.querySelector(".card-right") as HTMLElement;
        const rect = row.getBoundingClientRect();
        const progress = Math.min(
          1,
          Math.max(
            0,
            (scrollY - rect.top + windowHeight) / (windowHeight * 1.5)
          )
        );

        const leftXValues = [-800, -900, -400];
        const rightXValues = [800, 900, 400];
        const leftRotationValues = [-30, -20, -35];
        const rightRotationValues = [30, 20, 35];
        const yValues = [100, -150, -400];

        if (cardLeft && cardRight) {
          cardLeft.style.transform = `
            translateX(${progress * leftXValues[index]}px)
            translateY(${progress * yValues[index]}px)
            rotate(${progress * leftRotationValues[index]}deg)
          `;

          cardRight.style.transform = `
            translateX(${progress * rightXValues[index]}px)
            translateY(${progress * yValues[index]}px)
            rotate(${progress * rightRotationValues[index]}deg)
          `;
        }
      });

      // Animar texto y botón
      const triggerPosition = windowHeight * 0.25;
      const mainElement = mainRef.current;
      if (mainElement) {
        const mainRect = mainElement.getBoundingClientRect();
        const isActive = mainRect.top < triggerPosition;

        document.querySelectorAll(".line p").forEach((p) => {
          (p as HTMLElement).style.transform = isActive
            ? "translateY(0)"
            : "translateY(30px)";
        });

        const button = document.querySelector("button");
        if (button) {
          button.style.transform = isActive
            ? "translateY(0)"
            : "translateY(30px)";
          button.style.opacity = isActive ? "1" : "0";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div
          className="row relative w-full my-4 flex justify-center gap-4 pointer-events-none"
          key={i}
        >
          <div className="card card-left relative w-[40%] h-[360px] rounded-lg overflow-hidden will-change-transform">
            <div className="w-full h-full bg-red-500"></div>
          </div>
          <div className="card card-right relative w-[40%] h-[360px] rounded-lg overflow-hidden will-change-transform">
            <div className="w-full h-full bg-red-500"></div>
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <section
      ref={mainRef}
      className="main font-light w-screen relative h-[150vh] flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <div className="copy my-4 flex flex-col justify-center items-center">
          {[
            "Design for humans.",
            "Your own web design.",
            "Artisanal design patterns.",
          ].map((text, i) => (
            <div
              key={i}
              className="line relative my-1 w-max h-[20px] md:h-[28px] clip-path-line"
            >
              <p className="text-base md:text-2xl transition-transform duration-500">
                {text}
              </p>
            </div>
          ))}
        </div>

        <button className="font-light transition-all duration-500 opacity-0 text-xl md:text-4xl p-2 hover:underline">
          [ SEND EMAIL ]
        </button>
      </div>

      {generateRows()}
    </section>
  );
}
