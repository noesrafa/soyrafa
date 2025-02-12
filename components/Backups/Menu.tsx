"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/contact", label: "Contact" },
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
      gsap.set(".menu-link-item-holder", { y: 75 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
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
    <div className="text-sm" ref={container}>
      <div className="fixed top-0 left-0 w-screen p-8 flex justify-between items-center z-[1]">
        <div>
          <Link href="/">Rafael Alexander</Link>
        </div>
        <button onClick={toggleMenu} className="pointer">
          Menu
        </button>
      </div>

      <div className="menu-overlay fixed top-0 left-0 w-[100vw] h-[100dvh] p-8 bg-[var(--background)] z-[2] flex clip-path-menu">
        <div className="fixed top-0 left-0 w-screen p-8 flex justify-between items-center z-[1]">
          <div>
            <Link href="/">Rafael Alexander</Link>
          </div>
          <div className="pointer" onClick={toggleMenu}>
            Close
          </div>
        </div>

        <div
          className="flex-[2] flex items-end cursor-pointer"
          onClick={toggleMenu}
        >
          <p>&#x2715;</p>
        </div>
        <div className="flex-[4] flex flex-col justify-between pt-8">
          <div>
            {menuLinks.map((link, index) => (
              <div key={index} className="w-max clip-path-menu-item">
                <div
                  className="relative menu-link-item-holder"
                  onClick={toggleMenu}
                >
                  <Link
                    className="text-[80px] font-medium tracking-[-0.02em] leading-[85%]"
                    href={link.path}
                  >
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="flex-1 flex flex-col justify-end">
              <a href="#">X &#8599;</a>
              <a href="#">Instagram &#8599;</a>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">Behance &#8599;</a>
              <a href="#">Dribbble &#8599;</a>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <p>info@codegrid.com</p>
              <p>0923 3984 23</p>
            </div>
          </div>
        </div>
        <div className="flex-[4] flex items-end justify-end">
          <p>View ShowReel</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
