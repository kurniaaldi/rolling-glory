/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Carousell = (props: any) => {
  const { images } = props;
  const [current, setCurrent] = useState<number>(0);

  const prev = () => setCurrent((current - 1 + images.length) % images.length);
  const next = () => {
    setCurrent((current + 1) % images.length);

    console.log(current + 1, images.length);
  };

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden py-6">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((src: string | Blob | undefined, index: number) => (
          <div key={index} className="w-full flex-shrink-0 rounded">
            <img
              src={src}
              className="w-[414px] object-contain mx-auto"
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow"
      >
        ▶
      </button>
    </div>
  );
};

export default Carousell;
