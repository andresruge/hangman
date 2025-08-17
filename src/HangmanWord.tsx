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
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || showWord
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && showWord ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
