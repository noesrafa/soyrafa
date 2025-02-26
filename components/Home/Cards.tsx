"use client";
import { useEffect, useRef } from "react";
import { forwardRef } from "react";
import "./styles.css";

import ReactLenis from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Card = forwardRef(
  (
    {
      id,
      frontSrc,
      frontAlt,
      backText,
    }: { id: string; frontSrc: string; frontAlt: string; backText: string },
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div className="card" id={id} ref={ref}>
        <div className="card-wrapper">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Image
                priority
                src={frontSrc}
                width={500}
                height={500}
                alt={frontAlt}
              />
            </div>
            <div className="flip-card-back">
              <p>Front End Developer</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 3;
      const positions = [14, 38, 62, 86];
      const rotations = [-15, -7.5, 7.5, 15];

      // pin cards section
      ScrollTrigger.create({
        trigger: container.current?.querySelector(".cards"),
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
      });

      // spread cards
      cards.forEach((card, index) => {
        gsap.to(card, {
          left: `${positions[index]}%`,
          rotation: `${rotations[index]}`,
          ease: "none",
          scrollTrigger: {
            trigger: container.current?.querySelector(".cards"),
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: 0.5,
            id: `spread-${index}`,
          },
        });
      });

      // flip cards and reset rotation with staggered effect
      cards.forEach((card, index) => {
        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");

        const staggerOffset = index * 0.05;
        const startOffset = 1 / 3 + staggerOffset;
        const endOffset = 2 / 3 + staggerOffset;

        ScrollTrigger.create({
          trigger: container.current?.querySelector(".cards"),
          start: "top top",
          end: () => `+=${totalScrollHeight}`,
          scrub: 1,
          id: `rotate-flip-${index}`,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress >= startOffset && progress <= endOffset) {
              const animationProgress = (progress - startOffset) / (1 / 3);
              const frontRotation = -180 * animationProgress;
              const backRotation = 180 - 180 * animationProgress;
              const cardRotation = rotations[index] * (1 - animationProgress);

              gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
              gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
              gsap.to(card, {
                xPercent: -50,
                yPercent: -50,
                rotate: cardRotation,
                ease: "power1.out",
              });
            }
          },
        });
      });
    },
    { scope: container }
  );

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <ReactLenis root>
        <div className="container" ref={container}>
          <section className="cards">
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                id={`card-${index + 1}`}
                frontSrc="/card-front.png"
                frontAlt="Card Image"
                backText="Your card details appear here"
                ref={(el) => {
                  if (el) {
                    cardRefs.current[index] = el;
                  }
                }}
              />
            ))}
          </section>

          <section className="footer">
            <h1>Footer or Upcoming Section</h1>
          </section>
        </div>
      </ReactLenis>
    </>
  );
}
