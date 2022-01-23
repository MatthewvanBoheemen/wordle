import "./styles.css";
import { useState } from "react";

export default function App() {
  var [correctWord, setCorrectWord] = useState("chimp");
  var [guessLineWords, setGuessLineWords] = useState(Array(6).fill(""));

  function HandleKeyPress(key) {
    // Find where this goes
    var updatedLines = guessLineWords.slice(0);

    const currentLineIndex = GetCurrentLineIndex();

    console.log(currentLineIndex);

    updatedLines[currentLineIndex] = updatedLines[currentLineIndex] + key;

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
    <div className="App" onKeyPress={(e) => HandleKeyPress(e.key)} tabIndex="0">
      <h1>Matt's Wordle</h1>

      <div className="GuessLines">
        {guessLineWords.map((word, index) => (
          <GuessLine word={word} key={index} />
        ))}
      </div>
    </div>
  );
}

export function GuessLine(props) {
  const { word } = props;

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
        <div className="Letter" key={i}>
          {el}
        </div>
      ))}
    </div>
  );
}
