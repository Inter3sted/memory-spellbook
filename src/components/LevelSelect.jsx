import React from "react";

function LevelSelect({ unlockedLevel, onSelectLevel, onReturnToTitle }) {
  const levels = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center justify-center text-center z-10">
      <h2 className="text-4xl font-bold text-white mb-6">Level Select</h2>

      <div className="bg-black bg-opacity-40 rounded-lg p-6 shadow-lg">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6">
          {levels.map((lvl) => (
            <button
              key={lvl}
              disabled={lvl > unlockedLevel}
              onClick={() => onSelectLevel(lvl)}
              className={`w-16 h-16 text-xl font-bold rounded-lg border-2 transition-all duration-300 ${
                lvl <= unlockedLevel
                  ? "bg-purple-700 hover:bg-purple-800 text-white border-purple-400 shadow-md"
                  : "bg-gray-800 text-gray-500 border-gray-600 cursor-not-allowed"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {unlockedLevel > 1 && (
          <p className="text-sm text-green-300 mb-4">
            Highest unlocked level: <span className="font-bold">{unlockedLevel}</span>
          </p>
        )}

        <button
          onClick={onReturnToTitle}
          className="mt-4 px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-sm shadow-md transition"
        >
          ⬅ Return to Title
        </button>
      </div>
    </div>
  );
}

export default LevelSelect;
