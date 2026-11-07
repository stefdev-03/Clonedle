import { height, width} from "./game.js";

function getTile(r, c){
    return document.getElementById(r + "-" + c);
}

export function createBoard(){
    const board = document.getElementById("board");
    for (let r = 0; r < height; r++){
        for (let c = 0; c < width; c++){
            const tile = document.createElement("span");
            tile.id = r + "-" + c;
            tile.classList.add("tile");
            board.appendChild(tile);
        }
    }
}

export function setLetter(r, c, letter){
    getTile(r, c).innerText = letter;
}

export function getRowWord(r){
    let word = "";
    for (let c = 0; c < width; c++){
        word += getTile(r, c).innerText;
    }
    return word;
}

export function colorRow(r, result){
    for (let c = 0; c < width; c++){
        getTile(r, c).classList.add(result[c]);
    }
}

export function clearBoard(){
    for (let r = 0; r < height; r++){
        for (let c = 0; c < width; c++){
            const tile = getTile(r, c);
            tile.innerText = "";
            tile.classList.remove("correct", "present", "absent");
        }
    }
}