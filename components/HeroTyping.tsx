'use client';

import { useEffect, useState } from "react";

export default function HeroTyping() {
  const roles = [
    "Backend Developer",
    "Flutter Developer",
    "Full Stack Developer",
    "Software Engineer"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const activeRole = roles[currentRoleIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        setDisplayText(activeRole.substring(0, displayText.length + 1));
        setTypingSpeed(100);

        if (displayText === activeRole) {
          // Pause before deleting
          setIsDeleting(true);
          setTypingSpeed(2000); // Hold for 2 seconds
        }
      } else {
        // Deleting
        setDisplayText(activeRole.substring(0, displayText.length - 1));
        setTypingSpeed(50);

        if (displayText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(300); // Small pause before typing next
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <span className="inline-block min-w-[280px] bg-gradient-to-r from-teal-650 to-teal-400 bg-clip-text text-transparent font-extrabold">
      {displayText}
      <span className="text-teal-500 animate-pulse ml-0.5">|</span>
    </span>
  );
}
