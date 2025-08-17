import { useTheme } from "./ThemeContext";

type HangmanWordProps = {
  showWord?: boolean;
  guessedLetters: string[];
  wordToGuess: string;
};

export default function HangmanWord({
  showWord = false,
  guessedLetters,
  wordToGuess,
}: HangmanWordProps) {
  const { primaryColor } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "4rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span
          style={{ borderBottom: `.1em solid ${primaryColor}` }}
          key={index}
        >
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || showWord
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && showWord
                  ? "red"
                  : primaryColor,
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
