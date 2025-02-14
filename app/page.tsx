import Image from "next/image";
import AsciiDonut from "./lab/content/Donut";
import Work from "@/components/Home/Work";

export default function Home() {
  return (
    <div className="leading-[1.4]  opacity-90 font-medium min-h-[100dvh]">
      <div className="max-w-[var(--max-width)] mx-auto flex flex-col justify-between h-[100dvh] p-3">
        <AsciiDonut />
        <div>
          <h1>
            <i>Rafael Alexander,</i> Full Stack Product Engineer, <i>AI</i>
          </h1>
        </div>
        <div className="flex flex-col items-left gap-4 pb-10">
          <p>
            At the intersection of engineering and innovation, I architect
            solutions that bridge human needs with technological possibilities.
          </p>
          <p>
            <i>Driven by intellectual curiosity</i>, I specialize in developing
            AI-powered systems that adapt and evolve. I approach each challenge
            with analytical precision and creative insight,{" "}
            <i>
              ensuring that every solution is not just functional, but
              transformative.
            </i>
          </p>
          <p>
            My expertise is the full technology stack, with a particular focus
            on <i>artificial intelligence integration</i>. I thrive on
            architecting scalable systems, optimizing performance, and
            implementing sophisticated algorithms that turn complex problems
            into elegant solutions.
          </p>
        </div>

        <div></div>
      </div>
      <Work />
    </div>
  );
}
