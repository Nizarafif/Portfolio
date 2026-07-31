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
      className={`text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl md:leading-tight transition duration-150 ${
        isAnimatingName ? "blur-[1px]" : ""
      }`}
    >
      <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
        {displayName}
      </span>
    </h1>
  );
}
