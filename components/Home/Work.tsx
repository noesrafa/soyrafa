"use client";
import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  useEffect(() => {
    const scrollTriggerSettingsText = {
      trigger: ".main",
      start: "top 50%",
      end: "bottom bottom",
      toggleActions: "play reverse play reverse",
    };

    const leftXValues = [-800, -900, -400];
    const rightXValues = [800, 900, 400];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];

    gsap.utils.toArray(".row").forEach((row: any, index: number) => {
      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");

      gsap.to(cardLeft, {
        x: leftXValues[index],
        scrollTrigger: {
          trigger: ".main",
          start: "top bottom",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardLeft.style.transform = `translateX(${
              progress * leftXValues[index]
            }px) translateY(${progress * yValues[index]}px) rotate(${
              progress * leftRotationValues[index]
            }deg)`;
            cardRight.style.transform = `translateX(${
              progress * rightXValues[index]
            }px) translateY(${progress * yValues[index]}px) rotate(${
              progress * rightRotationValues[index]
            }deg)`;
          },
        },
      });
    });

    gsap.to(".logo", {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettingsText,
    });

    gsap.to(".line p", {
      y: 0,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.1,
      scrollTrigger: scrollTriggerSettingsText,
    });

    gsap.to("button", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
      delay: 0.25,
      scrollTrigger: scrollTriggerSettingsText,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
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
            <Image
              src={`/bg-${2 * i - 1}.webp`}
              alt=""
              width={399}
              height={399}
            />
          </div>
          <div className="card card-right relative w-[40%] h-[360px] rounded-lg overflow-hidden will-change-transform">
            <Image
              src={`/bg-${2 * i}.webp`}
              alt=""
              width={399}
              height={399}
            />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <ReactLenis root>
      <section className="main font-light w-screen relative h-[150vh] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <div className="copy my-4 flex flex-col justify-center items-center">
            <div className="line relative my-1 w-max h-[20px] md:h-[28px] clip-path-line">
              <p className="text-base md:text-2xl translate-y-[30px]">
                Design for humans.
              </p>
            </div>
            <div className="line relative my-1 w-max h-[20px] md:h-[28px] clip-path-line">
              <p className="text-base md:text-2xl translate-y-[30px]">
                Your own web design.
              </p>
            </div>
            <div className="line relative my-1 w-max h-[20px] md:h-[28px] clip-path-line">
              <p className="text-base md:text-2xl translate-y-[30px]">
                Artisanal design patterns.
              </p>
            </div>
          </div>

          <button className="font-light relative opacity-0 text-xl md:text-4xl p-2 translate-y-[30px] hover:underline">
            [ SEND EMAIL ]
          </button>
        </div>

        {generateRows()}
      </section>
    </ReactLenis>
  );
}
