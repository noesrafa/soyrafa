import React from "react";

const Life = () => {
  const totalWeeks = 85 * 52;

  const birthDate = new Date("2000-09-19");
  const today = new Date();

  const weeksLived = Math.floor(
    (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );

  return (
    <div className="p-3">
      <div className="flex flex-col items-center mb-8">
        <p className="font-bold">{weeksLived}</p>
        <p className="opacity-50">weeks lived of {totalWeeks}</p>
      </div>
      <div className="grid grid-cols-[repeat(26,1fr)] gap-[11px] md:gap-[15px] max-w-[var(--max-width)]">
        {Array.from({ length: totalWeeks }).map((_, index) => (
          <div
            key={index}
            className={`w-full aspect-square rounded-full ${
              index < weeksLived
                ? "bg-[var(--foreground)]"
                : "bg-[var(--foreground)] opacity-10"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Life;
