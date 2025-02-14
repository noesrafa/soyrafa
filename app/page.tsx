import Image from "next/image";
import AsciiDonut from "./lab/content/Donut";

export default function Home() {
  return (
    <div className="p-3 leading-[1.4] max-w-[var(--max-width)] mx-auto opacity-90 font-medium min-h-[100dvh] flex flex-col justify-between">
      <AsciiDonut />
      <div>
        <h1>
          Rafael Alexander, <i>Full Stack Product Engineer</i>, AI
        </h1>
      </div>
      <div className="flex flex-col items-left gap-4 pb-10">
        <p>
          {" "}
          Un nuevo día comienza con energía.{" "}
          <span className="italic">La luz entra suavemente por la ventana</span>
          ,iluminando la habitación con un brillo cálido. Afuera, el mundo se
          despierta con el murmullo de la lluvia ligera, una sinfonía natural
          que refresca el aire y llena el ambiente de tranquilidad.
        </p>
        <p>
          Me estiro, respiro profundo y sonrío.{" "}
          <span className="italic">Hoy es un buen día.</span> Los pies
          encuentran el suelo con firmeza y el agua fresca en el rostro despeja
          cualquier rastro de sueño.{" "}
          <span className="italic">hasta la primera idea brillante</span> que
          cruza la mente.
        </p>
        <p>
          Cada día es una nueva oportunidad para{" "}
          <span className="italic">crear</span>, aprender y compartir. Con{" "}
          curiosidad y entusiasmo, diseño experiencias intuitivas, exploro
          nuevas posibilidades y me obsesiono con los detalles.
        </p>
      </div>

      <div></div>
    </div>
  );
}
