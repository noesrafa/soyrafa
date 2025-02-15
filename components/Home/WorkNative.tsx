// @ts-nocheck
"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

// Toggle this to draw red lines showing trigger zones (debug).
const SHOW_DEBUG = true;

// Animation settings for each row (left/right cards).
const rowAnimations = [
  {
    leftX: -800,
    leftRotation: -30,
    rightX: 800,
    rightRotation: 30,
    y: 100,
  },
  {
    leftX: -900,
    leftRotation: -20,
    rightX: 900,
    rightRotation: 20,
    y: -150,
  },
  {
    leftX: -400,
    leftRotation: -35,
    rightX: 400,
    rightRotation: 35,
    y: -400,
  },
];

// Controls how quickly the card animations reach their final positions.
const CARD_ANIMATION_FACTOR = 2.5;

// Controls how far into the viewport (percentage) the text/button trigger fires.
const TEXT_TRIGGER_FACTOR = 0.1;

// Helper to generate the transform string for the cards
function computeCardTransform(progress: number, x: number, y: number, rotation: number) {
  return `
    translateX(${progress * x}px)
    translateY(${progress * y}px)
    rotate(${progress * rotation}deg)
  `;
}

export default function Work() {
  const mainRef = useRef<HTMLDivElement>(null);

  // We'll hold refs to each row so we can easily access them on scroll.
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // This function runs on every scroll, but wrapped in requestAnimationFrame.
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 1) Animate cards in each row
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const cardLeft = row.querySelector<HTMLDivElement>(".card-left");
        const cardRight = row.querySelector<HTMLDivElement>(".card-right");

        // getBoundingClientRect for the row
        const rect = row.getBoundingClientRect();
        
        // Calculate "progress" (0 to 1) based on how far into the viewport the row is
        const progress = Math.min(
          1,
          Math.max(
            0,
            // This is the existing logic, offset by windowHeight * factor
            (scrollY - rect.top + windowHeight) / (windowHeight * CARD_ANIMATION_FACTOR)
          )
        );

        // Grab row-specific animation values
        const { leftX, leftRotation, rightX, rightRotation, y } = rowAnimations[index];

        if (cardLeft && cardRight) {
          cardLeft.style.transform = computeCardTransform(progress, leftX, y, leftRotation);
          cardRight.style.transform = computeCardTransform(progress, rightX, y, rightRotation);
        }
      });

      // 2) Animate the text/lines and button
      const mainElement = mainRef.current;
      if (mainElement) {
        const mainRect = mainElement.getBoundingClientRect();
        const triggerPosition = windowHeight * TEXT_TRIGGER_FACTOR;
        const isActive = mainRect.top < triggerPosition;

        // Animate lines
        const lines = mainElement.querySelectorAll<HTMLParagraphElement>(".line p");
        lines.forEach((p) => {
          p.style.transform = isActive ? "translateY(0)" : "translateY(30px)";
        });

        // Animate button
        const button = mainElement.querySelector("button");
        if (button) {
          button.style.transform = isActive ? "translateY(0)" : "translateY(30px)";
          button.style.opacity = isActive ? "1" : "0";
        }
      }
    };

    // We'll wrap the scroll in requestAnimationFrame to limit calls.
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll);
    // Run at least once in case the user is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Generate rows dynamically. Each row will have its own ref.
  const generateRows = () => {
    return rowAnimations.map((_, i) => (
      <div
        className="row relative w-full my-4 flex justify-center gap-4 pointer-events-none"
        ref={(el) => (rowRefs.current[i] = el)}
        key={i}
      >
        <div className="card card-left relative w-[40%] h-[360px] rounded-lg overflow-hidden will-change-transform">
          <div className="w-full h-full bg-red-500" />
        </div>
        <div className="card card-right relative w-[40%] h-[360px] rounded-lg overflow-hidden will-change-transform">
          <div className="w-full h-full bg-red-500" />
        </div>
      </div>
    ));
  };

  // Render debug lines if needed
  const debugTriggers = () => {
    if (!SHOW_DEBUG) return null;

    return (
      <>
        {/* Marker for the TEXT_TRIGGER_FACTOR */}
        <div
          style={{
            position: "fixed",
            top: `${window.innerHeight * TEXT_TRIGGER_FACTOR}px`,
            left: 0,
            width: "100%",
            height: "2px",
            background: "rgba(255, 0, 0, 0.7)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "8px",
              top: "-18px",
              color: "red",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            TEXT TRIGGER
          </span>
        </div>
      </>
    );
  };

  return (
    <section
      ref={mainRef}
      className="main font-light w-screen relative h-[150vh] flex flex-col justify-center items-center overflow-hidden"
    >
      {debugTriggers()}

      {/* Contenido principal (centered text + button) */}
      <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <div className="copy my-4 flex flex-col justify-center items-center">
          {["Design for humans.", "Your own web design.", "Artisanal design patterns."].map(
            (text, i) => (
              <div
                key={i}
                className="line relative my-1 w-max h-[20px] md:h-[28px] clip-path-line"
              >
                <p className="text-base md:text-2xl transition-transform duration-500">
                  {text}
                </p>
              </div>
            )
          )}
        </div>

        <button className="font-light transition-all duration-500 opacity-0 text-xl md:text-4xl p-2 hover:underline">
          [ SEND EMAIL ]
        </button>
      </div>

      {/* Rows of cards */}
      {generateRows()}
    </section>
  );
}