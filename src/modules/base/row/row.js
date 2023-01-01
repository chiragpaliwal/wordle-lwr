import { api, track, LightningElement } from 'lwc';
import { getWordOfDay } from 'base/utils';

export default class Row extends LightningElement {
    
    @api length;
    @api currentGuess = [];
    @api isSubmitted = false;
    @track submittedTiles = [];

    @api setCurrentGuess(currentGuess){
        this.currentGuess = currentGuess;
    }

    get tiles(){
        let arr = Array(parseInt(this.length));
        this.currentGuess.map((element, index)=> {
            arr[index] = element;
        });
        for (let index = this.currentGuess.length; index < parseInt(this.length); index++) {
            arr[index] = undefined;
        }
        return arr;
    }

    @api handleGuessSubmit(){
        this.isSubmitted = true;
        const solution = getWordOfDay().split('');
        const statuses = Array.from(Array((parseInt(this.length))));
        const solutionCharsTaken = solution.map((_) => false);

        this.currentGuess.forEach( (letter, index)=>{
            if (letter === solution[index]) {
                let submittedTile = {
                    letter,
                    position: index,
                    state: 'correct',
                    isCompleted: 'true'
                }
                statuses[index] = submittedTile;
                return;
            }
        });

        this.currentGuess.forEach( (letter, index)=>{
            if (statuses[index]) return;

            if (!solution.includes(letter)) {
                let submittedTile = {
                    letter,
                    position: index,
                    state: 'absent',
                    isCompleted: 'true'
                }
                statuses[index] = submittedTile;
                return;
            }

            const indexOfPresentChar = solution.findIndex(
                (x, i) => x === letter && !solutionCharsTaken[i]
            )

            if (indexOfPresentChar > -1) {
                let submittedTile = {
                    letter,
                    position: index,
                    state: 'present',
                    isCompleted: 'true'
                }
                statuses[index] = submittedTile;
                solutionCharsTaken[indexOfPresentChar] = true;
                return;
              } else {
                let submittedTile = {
                    letter,
                    position: index,
                    state: 'absent',
                    isCompleted: 'true'
                }
                statuses[index] = submittedTile;
                return;
            }
        });

        this.submittedTiles = [...statuses];
    }

}