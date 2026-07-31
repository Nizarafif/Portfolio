'use client';

import { useEffect, useState } from "react";

interface NameAnimationProps {
  nameText: string;
}

export default function NameAnimation({ nameText }: NameAnimationProps) {
  const [displayName, setDisplayName] = useState(nameText);
  const [isAnimatingName, setIsAnimatingName] = useState(true);

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let frame = 0;
    const totalFrames = nameText.length + 6;

    const intervalId = setInterval(() => {
      frame += 1;

      if (frame >= totalFrames) {
        setDisplayName(nameText);
        setIsAnimatingName(false);
        clearInterval(intervalId);
        return;
      }

      setDisplayName(() =>
        nameText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < frame - 2) return nameText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
    }, 70);

    return () => clearInterval(intervalId);
  }, [nameText]);

  return (
    <h1
      className={`text-3xl font-bold tracking-tight text-[#0B0F19] sm:text-4xl md:text-[2.6rem] md:leading-tight transition duration-150 drop-shadow-sm ${
        isAnimatingName ? "blur-[1px]" : ""
      }`}
    >
      <span className="bg-gradient-to-r from-[#0B0F19] to-slate-600 bg-clip-text text-transparent">
        {displayName}
      </span>
    </h1>
  );
}
