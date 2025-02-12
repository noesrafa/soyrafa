export default function Home() {
  return (
    <div className="p-3 leading-[1.3] max-w-[450px] mx-auto opacity-90 text-sm font-medium min-h-[100dvh] flex flex-col justify-between">
      <div />
      <div className="flex flex-col gap-4">
        <p>
          {" "}
          Un nuevo día comienza con energía.{" "}
          <span className="italic">La luz entra suavemente por la ventana</span>
          , iluminando la habitación con un brillo cálido. Afuera, el mundo se
          despierta con el murmullo de la lluvia ligera, una sinfonía natural
          que refresca el aire y llena el ambiente de tranquilidad.
        </p>
        <p>
          Me estiro, respiro profundo y sonrío.{" "}
          <span className="italic">Hoy es un buen día.</span> Los pies
          encuentran el suelo con firmeza y el agua fresca en el rostro despeja
          cualquier rastro de sueño. Hay algo especial en la rutina cuando se
          disfruta cada momento, cuando se aprecia cada detalle, desde{" "}
          <b>el aroma del café </b>recién hecho{" "}
          <span className="italic">hasta la primera idea brillante</span> que
          cruza la mente.
        </p>
        <p>
          Cada día es una nueva oportunidad para{" "}
          <span className="italic">crear</span>, aprender y compartir. Con{" "}
          <b>curiosidad</b> y entusiasmo, diseño experiencias intuitivas,
          exploro nuevas posibilidades y me obsesiono con los detalles.
        </p>
      </div>

      <div>
        <a href="">Linkedin</a>
      </div>
    </div>
  );
}
