import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import words from "./wordList.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import { useTheme } from "./ThemeContext";

export default function App() {
  const { theme, toggleTheme, primaryColor } = useTheme();
  const [wordToGuess, setWordToGuess] = useState(getRandomWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const gameLost = incorrectLetters.length >= 6;
  const gameWon = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      letter = letter.toLowerCase();
      console.debug(letter);
      if (guessedLetters.includes(letter) || gameWon || gameLost) return;
      setGuessedLetters((prev) => [...prev, letter]);
    },
    [gameLost, gameWon, guessedLetters]
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const letter = event.key;
      console.debug(letter);
      if (!letter.match(/^[a-zA-Z]$/)) return;
      event.preventDefault();
      addGuessedLetter(letter);
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [addGuessedLetter, guessedLetters]);

  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      console.debug(key);
      if (key !== "Enter") return;
      event.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getRandomWord());
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themeToggleButtonStyle: CSSProperties = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    border: `1px solid ${primaryColor}`,
    background: "transparent",
    color: primaryColor,
    cursor: "pointer",
    textTransform: "capitalize",
    fontSize: "1rem",
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <button onClick={toggleTheme} style={themeToggleButtonStyle}>
        Toggle to {theme === "light" ? "dark" : "light"}
      </button>
      <div
        style={{
          fontSize: "2rem",
          textAlign: "center",
          minHeight: "50px",
        }}
      >
        {gameWon && `You won! - ${wordToGuess}`}
        {gameLost && `You lost! - ${wordToGuess}`}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        showWord={gameLost}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={gameWon || gameLost}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}
