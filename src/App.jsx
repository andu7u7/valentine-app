import { useState } from "react";
import confetti from "canvas-confetti";

const LING_LING_IMG =
  "https://i.pinimg.com/474x/6d/83/cf/6d83cf518a8352561c0335a0219ded11.jpg";
const GIF_INIT =
  "https://img.freepik.com/vector-premium/emoji-timido-emoticono-sonriente_1303870-158.jpg";

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const yesButtonSize = noCount * 20 + 16;

  function handleNoClick() {
    setNoCount(noCount + 1);
  }

  function handleYesClick() {
    setYesPressed(true);
    triggerConfetti();
  }

  function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  const phrases = [
    "No",
    "¿Estás segura?",
    "¿De verdad? :(",
    "Piénsalo bien...",
    "No me hagas renegar compare",
    "Ling Ling, te gusta la navidad?",
    "Oh no! es un tumor XDDD",
    "OE ¡Ya ps!",
    "DI QUE SI PUES MI BB HERMOSA PRECIOSA",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-pink-50 p-4 text-center selection:bg-rose-600 selection:text-white overflow-hidden">
      {yesPressed ? (
        <>
          <img
            src={LING_LING_IMG}
            alt="Ling Ling Happy"
            className="max-w-full h-auto max-h-[300px] object-cover rounded-lg shadow-xl mb-4 animate-bounce"
          />
          <div className="text-4xl font-bold my-4 text-rose-600">
            ¡SABÍA QUE DIRÍAS QUE SÍ! 🩵
          </div>
          <p className="text-lg text-gray-700">
            Ya nos vemos el fin de semana del 14 preciosa uwu.
          </p>
        </>
      ) : (
        <>
          <img
            className="h-[200px] rounded-lg shadow-md mb-8 object-cover mx-auto"
            src={GIF_INIT}
            alt="Emoji Tímido"
          />
          <h1 className="text-4xl font-bold text-rose-500 mb-8 px-4">
            ¿Quieres pasar este fin de semana conmigo?
          </h1>
          <p className="text-2xl font-bold text-rose-500 mb-8 px-4">
            (14 de febrero obviamente)
          </p>

          <div className="flex flex-wrap flex-col md:flex-row gap-4 items-center justify-center w-full">
            <button
              className="rounded bg-green-500 font-bold text-white hover:bg-green-600 transition-all duration-300 shadow-lg whitespace-nowrap z-10"
              style={{
                fontSize: yesButtonSize,
                padding: "1rem 2rem",
              }}
              onClick={handleYesClick}
            >
              Sí 🩵
            </button>
            <button
              onClick={handleNoClick}
              className="rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-600 transition-all duration-150 shadow-lg h-fit z-10"
            >
              {noCount === 0 ? "No 💀" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
