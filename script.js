import { height, width, pickRandomWord, isValidWord, scoreGuess} from "./game.js";
import { toggleTheme} from "./themes.js";
import { showMessage, clearMessage, showAnswer } from "./message.js";
import { createBoard, setLetter, getRowWord, colorRow, clearBoard} from "./board.js";

let row = 0;
let col = 0;
let gameOver = false;
let word = pickRandomWord();

window.onload = function(){
    createBoard();
    document.addEventListener("keyup", handleKey);
    document.getElementById("reset").addEventListener("click", (e) => {
        resetGame();
        e.currentTarget.blur();
    });
    toggleTheme();
};

function handleKey(e){
    if (gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ"){
        if (col < width){
            setLetter(row, col, e.code[3]);
            col++;
        }
    }
    else if (e.code == "Backspace"){
        if (col > 0){
            col--;
            setLetter(row, col, "");
        }
    }
    else if (e.code == "Enter"){
        submitGuess();
    }
}

function submitGuess(){
    if (col < width){
        return showMessage("Not enough letters");
    }

    const guess = getRowWord(row);
    if (!isValidWord(guess)){
        return showMessage("Not a valid word")
    }

    const result = scoreGuess(guess, word);
    colorRow(row, result);

    if (result.every(r => r === "correct")){
        gameOver = true;
        return;
    }

    row++
    col = 0;
    if (row == height){
        gameOver = true;
        showAnswer(word);
    }
}

function resetGame(){
    clearBoard();
    row = 0;
    col = 0;
    gameOver = false;
    word = pickRandomWord();
    clearMessage();
}