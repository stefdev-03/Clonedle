import { ANSWERS, VALID_SET } from "./data/words.js";

var height = 6;
var width = 5;

var row = 0;
var col = 0;

let messageTimeout;
var gameOver = false;
var word = ANSWERS[Math.floor(Math.random() * ANSWERS.length)].toUpperCase();

window.onload = function(){
    initialize();
}

function initialize(){
    for (let r = 0; r < height; r++){
        for (let c = 0; c < width; c++){
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {
        if (gameOver) return;
        
        if ("KeyA" <= e.code && e.code <= "KeyZ"){
            if (col < width){
                let currentTile = document.getElementById(row.toString() + "-" + col.toString());
                if (currentTile.innerText == ""){
                    currentTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace"){
            if (0 < col && col <= width){
                col -= 1;
            }
            let currentTile = document.getElementById(row.toString() + "-" + col.toString());
            currentTile.innerText = "";
        }

        else if (e.code == "Enter"){
            if (col < width) {
                showMessage("Not enough letters");
                return;
            }
            if (!VALID_SET.has(getGuess())){
                showMessage("Not a valid word");
                return;
            }
            update();
            row += 1;
            col = 0;
        }

        if (!gameOver && row == height){
            gameOver = true;
            clearTimeout(messageTimeout);
            document.getElementById("answer").innerText = word;
        }
    })
}

function showMessage(msg){
    let el = document.getElementById("answer");
    el.innerText = msg;

    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
        el.innerText = "";
    }, 2000);
}

function getGuess(){
    let guess = "";
    for (let c = 0; c < width; c++){
        guess += document.getElementById(row.toString() + "-" + c.toString()).innerText;
    }
    return guess.toLowerCase();
}

function update(){
    let correct = 0;

    let letterCount = {};
    for (let i = 0; i < word.length; i++){
        let letter = word[i];
        if (letterCount[letter]){
            letterCount[letter] += 1;
        } else {
            letterCount[letter] = 1;
        }
    }

    for (let c = 0; c < width; c++){
        let currentTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currentTile.innerText;

        if (word[c] == letter){
            currentTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        }
    }

    for (let c = 0; c < width; c++){
        let currentTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currentTile.innerText;

        if (currentTile.classList.contains("correct")) continue;

        if (letterCount[letter] > 0){
            currentTile.classList.add("present");
            letterCount[letter] -= 1;
        } else {
            currentTile.classList.add("absent");
        }
    }
    
    if (correct == width){
        gameOver = true;
    }
}