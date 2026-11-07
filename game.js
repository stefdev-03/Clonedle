import { ANSWERS, VALID_SET } from "./data/words.js";

export const height = 6;
export const width = 5;

export function pickRandomWord(){
    return ANSWERS[Math.floor(Math.random() * ANSWERS.length)].toUpperCase();
}

export function isValidWord(word){
    return VALID_SET.has(word.toLowerCase());
}

export function scoreGuess(guess, answer){
    const result = Array(guess.length).fill("absent");
    const counts = {};

    for (const l of answer ) counts[l]  = (counts[l] || 0) + 1;

    for (let i = 0; i < guess.length; i++){
        if (guess[i] === answer[i]){
            result[i] = "correct";
            counts[guess[i]]--;
        }
    }

    for (let i = 0; i < guess.length; i++){
        if (guess[i] !== answer[i] && counts[guess[i]] > 0){
            result[i] = "present";
            counts[guess[i]]--;
        }
    }
    return result;
}