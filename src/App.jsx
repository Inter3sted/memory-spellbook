// App.jsx – Memory Spellbook with enhanced keyboard support (4-way), escape key fix, cheat key, and title image
import React, { useEffect, useState, useRef } from "react";
import Card from "./components/Card";
import LevelSelect from "./components/LevelSelect";
import cardImages from "./data";

import matchSoundFile from "./assets/stack_cards.mp3";
import mismatchSoundFile from "./assets/mismatch.mp3";
import victorySoundFile from "./assets/victory_fanfare.mp3";
import ambientSound from "./assets/ambient.mp3";
import titleImage from "./assets/memory-title-sprite.png";

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
  1: background1,
  2: background2,
  3: background3,
  4: background4,
  5: background5,
  6: background6,
  7: background7,
  8: background8,
  9: background9,
  10: background10,
  11: background11,
  12: background12,
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
  const [unlockedLevel, setUnlockedLevel] = useState(
    () => Number(localStorage.getItem("unlocked-level")) || 1
  );
  const [paused, setPaused] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const cheatClickCount = useRef(0);
  const matchSound = useRef(new Audio(matchSoundFile));
  const mismatchSound = useRef(new Audio(mismatchSoundFile));
  const victorySound = useRef(new Audio(victorySoundFile));
  const ambientMusic = useRef(new Audio(ambientSound));

  useEffect(() => {
    const audio = ambientMusic.current;
    audio.loop = true;
    audio.volume = 0.3;
    musicEnabled ? audio.play().catch(() => {}) : audio.pause();
  }, [musicEnabled]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (paused) {
          setPaused(false);
        } else if (gameStarted) {
          setPaused(true);
        } else if (showLevelSelect) {
          setShowLevelSelect(false);
        }
      }

      if (e.key === "c" && !gameStarted && !showLevelSelect) {
        cheatClickCount.current++;
        const newLevel = cheatClickCount.current % 2 === 1 ? 12 : 1;
        setUnlockedLevel(newLevel);
        localStorage.setItem("unlocked-level", newLevel);
      }

      if (gameStarted && !paused) {
        const columns = 6;
        if (e.key === "ArrowRight")
          setSelectedIndex((prev) => (prev + 1) % cards.length);
        else if (e.key === "ArrowLeft")
          setSelectedIndex((prev) => (prev - 1 + cards.length) % cards.length);
        else if (e.key === "ArrowDown")
          setSelectedIndex((prev) => (prev + columns) % cards.length);
        else if (e.key === "ArrowUp")
          setSelectedIndex(
            (prev) => (prev - columns + cards.length) % cards.length
          );
        else if (e.key === "Enter") {
          const selectedCard = cards[selectedIndex];
          if (selectedCard) handleChoice(selectedCard);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameStarted, paused, cards, selectedIndex, gameWon, showLevelSelect]);

  const handleChoice = (card) => {
    if (
      !disabled &&
      card !== choiceOne &&
      card !== choiceTwo &&
      !card.matched
    ) {
      if (!choiceOne) {
        setChoiceOne(card);
      } else if (!choiceTwo) {
        setChoiceTwo(card);
        setDisabled(true);
      }
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        matchSound.current.currentTime = 0;
        matchSound.current.play();
        setCards((prev) =>
          prev.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        setTimeout(() => {
          resetTurn();
        }, 1000);
      } else {
        mismatchSound.current.currentTime = 0;
        mismatchSound.current.play();
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  const shuffleCards = (lvl) => {
    const totalPairs = 3 + lvl;
    const available = [...cardImages];
    while (available.length < totalPairs)
      available.push(...cardImages.map((card) => ({ ...card })));
    const selected = available.slice(0, totalPairs);
    const shuffled = [...selected, ...selected]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));

    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setGameWon(false);
    setSelectedIndex(0);
    setDisabled(false);
  };

  const handleStartGame = () => {
    setLevel(1);
    setGameStarted(true);
    setShowLevelSelect(false);
    shuffleCards(1);
  };

  const handleLevelSelect = (lvl) => {
    setLevel(lvl);
    setGameStarted(true);
    setShowLevelSelect(false);
    shuffleCards(lvl);
  };

  const handleReturnToTitle = () => {
    setGameStarted(false);
    setShowLevelSelect(false);
    setPaused(false);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every((card) => card.matched);
    if (allMatched) {
      setTimeout(() => {
        victorySound.current.play();
        setGameWon(true);

        const nextLevel = level + 1;
        if (nextLevel <= 12) {
          setTimeout(() => {
            setLevel(nextLevel);
            shuffleCards(nextLevel);
            setGameWon(false);
          }, 3000);
        }

        if (level >= unlockedLevel) {
          const newUnlocked = level + 1;
          setUnlockedLevel(newUnlocked);
          localStorage.setItem("unlocked-level", newUnlocked);
        }
      }, 500);
    }
  }, [cards]);

  const currentBackground = gameStarted
    ? levelBackgrounds[level] || background1
    : background0;

  return (
    <div
      className="relative scanlines crt-noise flex flex-col items-center min-h-screen py-6 text-white font-pixel bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${currentBackground})` }}
    >
      {!gameStarted && !showLevelSelect && (
        <div className="flex flex-col items-center justify-center z-10 text-center">
          <img
            src={titleImage}
            alt="Memory Spellbook Title"
            className="w-full max-w-md mb-6"
          />
          <button
            onClick={() => setMusicEnabled((prev) => !prev)}
            className="btn-pixel mb-4"
          >
            {musicEnabled ? "🔊" : "🔇"}
          </button>
          <button onClick={handleStartGame} className="btn-pixel mb-4">
            BEGIN
          </button>
          <button
            onClick={() => setShowLevelSelect(true)}
            className="btn-pixel mb-4"
          >
            SELECT LEVEL
          </button>
          <p className="text-xs mt-1">Press "C" to cheat unlock all levels</p>
        </div>
      )}

      {showLevelSelect && (
        <LevelSelect
          unlockedLevel={unlockedLevel}
          onSelectLevel={handleLevelSelect}
          onReturnToTitle={handleReturnToTitle}
        />
      )}

      {paused && gameStarted && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <h2 className="text-3xl mb-6 font-pixel">⏸ PAUSED</h2>
          <button
            onClick={() => setMusicEnabled((prev) => !prev)}
            className="btn-pixel mb-4"
          >
            {musicEnabled ? "MUTE MUSIC" : "UNMUTE"}
          </button>
          <button onClick={handleReturnToTitle} className="btn-pixel">
            RETURN TO TITLE
          </button>
        </div>
      )}

      {gameStarted && !paused && (
        <>
          <p className="text-sm mb-2 font-pixel z-10">LEVEL {level}</p>
          <p className="text-sm mb-4 font-pixel z-10">TURNS: {turns}</p>
          <div className="z-10 w-full px-4 max-w-6xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {cards.map((card, idx) => (
                <div
                  key={card.id}
                  className={`card-container ${
                    idx === selectedIndex ? "scale-105" : ""
                  }`}
                  onClick={() => handleChoice(card)}
                >
                  <Card
                    card={card}
                    flipped={
                      card === choiceOne || card === choiceTwo || card.matched
                    }
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
