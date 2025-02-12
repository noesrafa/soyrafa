"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/lab", label: "Lab" },
  { path: "/blog", label: "Blog" },
];

const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = useRef<any>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 200 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power4.out",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="" ref={container}>
      <div className="fixed bottom-0 left-0 w-screen p-2 z-[1]">
        <div className="w-full max-w-[var(--max-width)] mx-auto flex justify-between items-center">
          <div>
            <a href="/" className="hover:underline">Linkedin</a>,
            <a href="/" className="hover:underline">Twitter</a>
          </div>
          <button onClick={toggleMenu} className="pointer hover:underline">
            Menu
          </button>
        </div>
      </div>

      <div className="menu-overlay fixed top-0 left-0 w-[100vw] h-[100dvh] p-2 bg-[var(--background-transparent)] backdrop-blur-lg z-[2] flex clip-path-menu">
        <div className="w-full max-w-[var(--max-width)] mx-auto flex flex-col justify-between">
          <div></div>
          <div className="flex flex-col">
            {menuLinks.map((link, index) => (
              <div key={index} className="clip-path-menu-item">
                <div
                  className="relative menu-link-item-holder"
                  onClick={toggleMenu}
                >
                  <Link
                    className="text-[80px] font-medium leading-[90px] hover:opacity-100 opacity-80 w-full"
                    href={link.path}
                  >
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div>

            </div>
            <button onClick={toggleMenu} className="pointer hover:underline">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
