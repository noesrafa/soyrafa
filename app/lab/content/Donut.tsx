//@ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from "react";

const AsciiDonut = () => {
  const [output, setOutput] = useState("");
  const angleA = useRef(0);
  const scrollPosition = useRef(0);

  const animationFrameId = useRef(null);

  useEffect(() => {
    // Manejador del evento scroll
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      // Normalizar el scroll entre 0 y 1
      scrollPosition.current = currentScroll / maxScroll;
    };

    // Agregar event listener
    window.addEventListener("scroll", handleScroll);
    angleA.current = -10;

    const animate = () => {
      const R1 = 0.005 + scrollPosition.current * 2;
      const R2 = 2 - scrollPosition.current * 2;
      console.log(R1 * 100000, R2);
      const K2 = 6 + scrollPosition.current * 10;
      const K1 = 200 + scrollPosition.current * 10;

      const gradient = ".+az".split("");
      const width = 150;
      const height = 200;

      // A rota, B se queda en Math.PI/2 para girar 90 grados
      const B = (-(angleA.current += 0.00005) % 3) * Math.PI;
      const A = 0.36 + scrollPosition.current * 2 * Math.PI;

      // Calculamos cos y sin para A y B
      const cosA = Math.cos(A);
      const sinA = Math.sin(A);
      // Ahora calculamos cosB y sinB con el nuevo ángulo
      const cosB = Math.cos(B);
      const sinB = Math.sin(B);

      // Buffers
      const buffer = new Array(width * height).fill(" ");
      const zBuffer = new Array(width * height).fill(0);

      // Recorremos el toroide
      for (let theta = 0; theta < 2 * Math.PI; theta += 0.5) {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        for (let phi = 0; phi < 3 * Math.PI; phi += 0.01) {
          const cosPhi = Math.cos(phi);
          const sinPhi = Math.sin(phi);

          // Posición base del punto en el toroide (sin rotación)
          const circleX = R2 + R1 * cosTheta;
          const circleY = R1 * sinTheta;

          // Rotación 3D
          const x =
            circleX * (cosB * cosPhi + sinA * sinB * sinPhi) -
            circleY * cosA * sinB;
          const y =
            circleX * (sinB * cosPhi - sinA * cosB * sinPhi) +
            circleY * cosA * cosB;
          const z = K2 + cosA * circleX * sinPhi + circleY * sinA;
          const ooz = 1 / z;

          // Proyección 3D a 2D
          const xp = Math.floor(width / 2 + K1 * ooz * x);
          const yp = Math.floor(height / 2 - K1 * ooz * y);

          // Cálculo de iluminación
          const L =
            cosPhi * cosTheta * sinB -
            cosA * cosTheta * sinPhi -
            sinA * sinTheta +
            sinB * (cosA * sinTheta - cosTheta * sinA * sinPhi);

          if (L > 0) {
            const idx = xp + yp * width;
            if (idx >= 0 && idx < zBuffer.length && ooz > zBuffer[idx]) {
              zBuffer[idx] = ooz;
              const luminanceIndex = Math.floor(L * 8);
              buffer[idx] =
                gradient[
                  Math.max(0, Math.min(luminanceIndex, gradient.length - 1))
                ];
            }
          }
        }
      }

      // Construir el output ASCII
      let asciiOutput = "";
      for (let i = 0; i < height; i++) {
        asciiOutput += buffer.slice(i * width, (i + 1) * width).join("") + "\n";
      }

      setOutput(asciiOutput);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Iniciar la animación
    animationFrameId.current = requestAnimationFrame(animate);

    // Limpiar event listeners y animación
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <pre
      className={`pointer-events-none font-mono text-[.11em] md:text-[.15em] text-center m-0 fixed -top-[100px] md:-top-[120px] left-0 w-[100dvw] h-[100dvh] scale-[5] opacity-20 flex items-center justify-center transition duration-300 ${
        scrollPosition.current > 0.2 ? "scale-[10] opacity-10" : ""
      }`}
    >
      {output}
    </pre>
  );
};

export default AsciiDonut;
