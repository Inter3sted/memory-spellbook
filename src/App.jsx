// App.jsx – Cleaned Up with CRT + Pixel Effects (No VHS)
import React, { useEffect, useState, useRef } from "react";
import Card from "./components/Card";
import LevelSelect from "./components/LevelSelect";
import cardImages from "./data";
import titleSprite from "./assets/memory-title-sprite.png";

import matchSoundFile from "./assets/stack_cards.mp3";
import mismatchSoundFile from "./assets/mismatch.mp3";
import victorySoundFile from "./assets/victory_fanfare.mp3";

import background0 from "./assets/background0.png";
import background1 from "./assets/background1.png";
import background2 from "./assets/background2.png";
import background3 from "./assets/background3.png";
import background4 from "./assets/background4.png";
import background5 from "./assets/background5.png";
import background6 from "./assets/background6.png";
import background7 from "./assets/background7.png";
import background8 from "./assets/background8.png";
import background9 from "./assets/background9.png";
import background10 from "./assets/background10.png";
import background11 from "./assets/background11.png";
import background12 from "./assets/background12.png";

const levelBackgrounds = {
  1: background1, 2: background2, 3: background3,
  4: background4, 5: background5, 6: background6,
  7: background7, 8: background8, 9: background9,
  10: background10, 11: background11, 12: background12
};

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [level, setLevel] = useState(1);
  const [unlockedLevel, setUnlockedLevel] = useState(() => Number(localStorage.getItem("unlocked-level")) || 1);
  const [paused, setPaused] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const cheatClickCount = useRef(0);

  const matchSound = useRef(new Audio(matchSoundFile));
  const mismatchSound = useRef(new Audio(mismatchSoundFile));
  const victorySound = useRef(new Audio(victorySoundFile));
  const ambientMusic = useRef(new Audio("/src/assets/ambient.mp3"));

  useEffect(() => {
    const audio = ambientMusic.current;
    audio.loop = true;
    audio.volume = 0.3;
    musicEnabled ? audio.play().catch(() => {}) : audio.pause();
  }, [musicEnabled]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && gameStarted && !gameWon) {
        setPaused(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameStarted, gameWon]);

  const shuffleCards = () => {
    const totalPairs = 3 + level;
    const selected = cardImages.slice(0, totalPairs);
    const shuffled = [...selected, ...selected]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random(), matched: false }));

    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setGameWon(false);
  };

  const handleStartGame = () => {
    setLevel(1);
    setGameStarted(true);
    shuffleCards();
  };

  const handleLevelSelect = (lvl) => {
    setLevel(lvl);
    setGameStarted(true);
    setShowLevelSelect(false);
    shuffleCards();
  };

  const handleReturnToTitle = () => {
    setGameStarted(false);
    setShowLevelSelect(false);
    setPaused(false);
  };

  const handleCheat = () => {
    cheatClickCount.current++;
    const newLevel = cheatClickCount.current % 2 === 1 ? 12 : 1;
    setUnlockedLevel(newLevel);
    localStorage.setItem("unlocked-level", newLevel);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        matchSound.current.currentTime = 0;
        matchSound.current.play();
        setCards(prev => prev.map(card =>
          card.src === choiceOne.src ? { ...card, matched: true } : card
        ));
        resetTurn();
      } else {
        mismatchSound.current.currentTime = 0;
        mismatchSound.current.play();
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every(card => card.matched);
    if (allMatched) {
      setTimeout(() => {
        victorySound.current.play();
        setGameWon(true);
        if (level >= unlockedLevel) {
          const newUnlocked = level + 1;
          setUnlockedLevel(newUnlocked);
          localStorage.setItem("unlocked-level", newUnlocked);
        }
      }, 500);
    }
  }, [cards]);

  const handleChoice = (card) => {
    if (!disabled && card !== choiceOne && card !== choiceTwo && !card.matched) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  const currentBackground = gameStarted ? (levelBackgrounds[level] || background1) : background0;

  return (
    <div
      className="relative scanlines crt-noise flex flex-col items-center min-h-screen py-6 text-white font-pixel bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${currentBackground})` }}
    >
      {paused && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 crt-flicker">
          <h2 className="text-3xl mb-6 font-pixel">⏸ PAUSED</h2>
          <button onClick={() => setMusicEnabled(prev => !prev)} className="btn-pixel mb-4">
            {musicEnabled ? "MUTE MUSIC" : "UNMUTE"}
          </button>
          <button onClick={handleReturnToTitle} className="btn-pixel">RETURN TO TITLE</button>
        </div>
      )}

{!gameStarted && !showLevelSelect && (
  <div className="flex flex-col items-center justify-center z-10 text-center">
    <img
      src={titleSprite}
      alt="Memory Spellbook"
      className="max-w-[400px] mb-6 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]"
    />
    <button onClick={() => setMusicEnabled(prev => !prev)} className="btn-pixel mb-4">
      {musicEnabled ? "🔊" : "🔇"}
    </button>
    <button onClick={handleStartGame} className="btn-pixel mb-4">BEGIN</button>
    <button onClick={() => setShowLevelSelect(true)} className="btn-pixel mb-4">SELECT LEVEL</button>
    <button onClick={handleCheat} className="btn-pixel mt-2">CHEAT (UNLOCK/RESET)</button>
  </div>
)}


      {!gameStarted && showLevelSelect && (
        <LevelSelect
          unlockedLevel={unlockedLevel}
          onSelectLevel={handleLevelSelect}
          onReturnToTitle={handleReturnToTitle}
        />
      )}

      {gameStarted && !paused && (
        <>
          <p className="text-sm mb-2 font-pixel z-10">LEVEL {level}</p>
          <p className="text-sm mb-4 font-pixel z-10">TURNS: {turns}</p>
          <div className="z-10 w-full px-4 max-w-6xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {cards.map(card => (
                <div key={card.id} className="card-container" onClick={() => handleChoice(card)}>
                  <Card
                    card={card}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;