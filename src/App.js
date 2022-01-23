import "./styles.css";
import { useState } from "react";

export default function App() {
  var [correctWord, setCorrectWord] = useState("CHIMP");
  var [guessLineWords, setGuessLineWords] = useState(Array(6).fill(""));

  function HandleKeyPress(event) {
    // Find where this goes
    var updatedLines = guessLineWords.slice(0);

    const currentLineIndex = GetCurrentLineIndex();

    updatedLines[currentLineIndex] =
      updatedLines[currentLineIndex] + event.key.toUpperCase();

    setGuessLineWords(updatedLines);
  }

  function GetCurrentLineIndex() {
    let result = -1;

    guessLineWords.forEach((line, index) => {
      if (line.length < 5 && result === -1) {
        result = index;
      }
    });

    return result;
  }

  return (
    <div className="App" onKeyDown={(e) => HandleKeyPress(e)} tabIndex="0">
      <h1>WORDLE (FROM MATT)</h1>

      <div className="GuessLines">
        {guessLineWords.map((word, index) => (
          <GuessLine word={word} key={index} correctWord={correctWord} />
        ))}
      </div>
    </div>
  );
}

export function GuessLine(props) {
  const { word, correctWord } = props;

  let array = Array(5);
  for (let i = 0; i < 5; i++) {
    if (word.length > i) {
      array[i] = word.substring(i, i + 1);
    } else {
      array[i] = "";
    }
  }

  return (
    <div className="GuessLine">
      {array.map((el, i) => (
        <GuessLetter
          key={i}
          letter={el}
          showStatus={word.length === 5}
          correctWord={correctWord}
          position={i}
        />
      ))}
    </div>
  );
}

export function GuessLetter(props) {
  const { letter, correctWord, position, showStatus } = props;

  let className = "Letter";

  if (showStatus) {
    if (correctWord.substring(position, position + 1) === letter) {
      className += " CorrectPosition";
    } else {
      if (correctWord.indexOf(letter) !== -1) {
        className += " CorrectLetterWrongPosition";
      } else {
        className += " IncorrectLetter";
      }
    }
  } else {
    if (letter === "") {
      className += " EmptyLetter";
    }
  }

  return <div className={className}>{letter}</div>;
}
