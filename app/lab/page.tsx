"use client";
import { useEffect, useState } from "react";
import Life from "./content/Life";
import Tetris from "./content/Tetris";

const LabPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<React.ReactNode[]>([]);

  const handlePageChange = (page: number) => {
    if (page < 0) {
      setCurrentPage(pages.length - 1);
    } else if (page >= pages.length) {
      setCurrentPage(0);
    } else {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const newPages = [<Life />, <Tetris />];
    setPages(newPages);
  }, []);

  return (
    <div className="p-3 max-w-[var(--max-width)] mx-auto w-full">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <button className="opacity-50">LAB</button>
          <div>/</div>
          <button>Life</button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="size-10 text-xl opacity-60 hover:opacity-100"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {"<"}
          </button>
          <button
            className="size-10 text-xl opacity-60 hover:opacity-100"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {">"}
          </button>
        </div>
      </div>

      <div className="mt-4">{pages[currentPage]}</div>
    </div>
  );
};

export default LabPage;
