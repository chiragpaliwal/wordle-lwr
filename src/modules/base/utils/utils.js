import { WORDS } from './wordlist';
import { VALID_GUESSES } from './validGuesses';
import { VALID_GUESSES2 } from './validGuesses2';

export const periodInDays = 1;

export const getIndex = () => {
    let start = new Date(2022, 0);
    let index = -1
    let gameDate = new Date();

    do {
      index++
      start.setDate(start.getDate() + periodInDays);
    } while (start <= gameDate)
  
    return index
}

export const getWordOfDay = () => {
    let index = getIndex();
    if (index < 0) {
      throw new Error('Invalid index')
    }
  
    return WORDS[index % WORDS.length];
}

export const isValidGuess = (word) => {
    return ( 
      WORDS.includes(word.toLowerCase()) ||
      VALID_GUESSES.includes(word.toLowerCase()) ||
      VALID_GUESSES2.includes(word.toLowerCase())
    );
}