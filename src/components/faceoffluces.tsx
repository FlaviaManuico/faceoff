"use client";
import React, { useState, useEffect } from 'react';

const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "skyblue"];

interface ColorsSpanish {
  [key: string]: string;
}

const colorsSpanish: ColorsSpanish = {
  "red": "Rojo",
  "green": "Verde",
  "blue": "Azul",
  "yellow": "Amarillo",
  "purple": "Morado",
  "orange": "Naranja",
  "pink": "Rosado",
  "skyblue": "Celeste"
};

const winningColor = colors[Math.floor(Math.random() * colors.length)];
const winningColorEs = colorsSpanish[winningColor as string];

const FaceoffLuces = () => {
  const [showColorText, setShowColorText] = useState(true);
  const [currentColor, setCurrentColor] = useState("");
  const [winner, setWinner] = useState("");
  const [shotMessage, setShotMessage] = useState("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [prevWinningColor, setPrevWinningColor] = useState('');

  useEffect(() => {
    setPrevWinningColor(winningColor);
    setTimeout(() => {
      setShowColorText(false);
      startColorChange();
    }, 2000);
  }, [winningColor]);

  const startColorChange = () => {
    const id = setInterval(() => {
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setCurrentColor(newColor);
    }, 1000);
    setIntervalId(id);
  };

  const handleClick = (player: string) => {
    clearInterval(intervalId as NodeJS.Timeout);
    if (currentColor === winningColor) {
      setWinner(player);
      setShotMessage(`Jugador ${player} ganó`);
      setShotMessage((prevMessage) => `${prevMessage} Jugador ${player === '1' ? '2' : '1'}: shot!`);
    } else {
      setWinner(player === '1' ? '2' : '1');
      setShotMessage(`Jugador ${player === '1' ? '2' : '1'} ganó`);
      setShotMessage((prevMessage) => `${prevMessage} Jugador ${player}: shot!`);
    }
  };

  return (
    <div className="h-screen bg-gray100 flex flex-col items-center justify-center">
      {showColorText ? (
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-4">El color es:</div>
          <div className="text-6xl font-bold" style={{ color: prevWinningColor }}>{prevWinningColor}</div>
        </div>
      ) : winner ? (
        <div className="text-4xl font-bold text-center">
          <div style={{
            backgroundColor: '#2D0AFF',
            color: 'white',
            padding: '30px',
            borderRadius: '20px',
            marginBottom: '20px',
            fontSize: '27px',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            fontFamily: 'Verdana',
            width: '320px',
          }}>
            <p>{shotMessage}</p>
          </div>
          <div style={{ marginBottom: '40px' }}>
            {}
          </div>
          <button
            style={{
              marginTop: '10px',
              padding: '8px 18px',
              fontSize: '16px',
              backgroundColor: 'white',
              color: 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            <a href="/faceoffluces">Otra partida</a>
          </button>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col">
          <button
            className="w-full h-1/2 flex items-center justify-center"
            style={{ backgroundColor: currentColor }}
            onClick={() => handleClick('1')}
          >
          </button>
          <div className="w-full h-1 border-[6px] bg-white"></div>
          <button
            className="w-full h-1/2 flex items-center justify-center"
            style={{ backgroundColor: currentColor }}
            onClick={() => handleClick('2')}
          >
          </button>
        </div>
      )}
    </div>
  );
};

export default FaceoffLuces;
