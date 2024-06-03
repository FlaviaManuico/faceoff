// import React from "react";

// export default function faceoffjuego(){
//   return (
//     <div className="flex bg-gray100 justify-center items-center h-[100vh] flex-col">
//       <h1>Faceoff Juego</h1>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from 'react';


const ReadyAnimation = () => {
  const [text, setText] = useState('Ready?');
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (showAnimation) {
      interval = setInterval(() => {
        switch (text) {
          case 'Ready?':
            setText('Set');
            break;
          case 'Set':
            setText('Drink!');
            break;
          case 'Drink!':
            setText('Ready?');
            break;
          default:
            break;
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    const timeout = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    
    const redirectTimeout = setTimeout(() => {
      setShowAnimation(false);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      clearTimeout(redirectTimeout);
    };
  }, [text, showAnimation]);

  return showAnimation ? (
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 border-8 border-purple-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex justify-center items-center text-4xl font-bold text-purple-500">
        <span>{text}</span>
      </div>
      <div className="absolute inset-0 border-8 border-purple-500 rounded-full -rotate-45 overflow-hidden">
        <div className="w-3/4 h-full bg-transparent rounded-full"></div>
      </div>
    </div>
  ) : null;
};

const FaceoffJuego = () => {
  return (
    <div className="flex bg-gray100 justify-center items-center h-screen">
      <ReadyAnimation />
    </div>
  );
};

export default FaceoffJuego;
