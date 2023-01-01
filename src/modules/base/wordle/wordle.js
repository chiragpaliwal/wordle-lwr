import { LightningElement } from 'lwc';
import { isValidGuess } from 'base/utils';

const MAX_WORD_LENGHT = 5;

export default class Wordle extends LightningElement {

    rows = [1, 2, 3, 4, 5, 6];
    activeRowId = 1;
    currentGuess = [];
    MAX_WORD_LENGHT = MAX_WORD_LENGHT;
    SOLUTION;
    isRendered = false;

    constructor() {
        super();
        window.addEventListener('keyup', (event)=>{
            try {
                const key = String.fromCharCode(event.keyCode);
                if (!key.match(/^[A-Za-z]+$/) && event.keyCode != 8 && event.keyCode != 13 || this.activeRowId > 6) {
                    return;
                }
                const activeRow = this.template.querySelector(`base-row[data-key="${this.activeRowId}"]`);

                if (this.currentGuess.length < MAX_WORD_LENGHT && event.keyCode != 8 && event.keyCode != 13) {
                    this.currentGuess.push(key.toLocaleLowerCase());
                    activeRow.setCurrentGuess(this.currentGuess);
                } else if (this.currentGuess.length > 0 && event.keyCode === 8) {
                    this.currentGuess.pop();
                    activeRow.setCurrentGuess(this.currentGuess);
                } else if(this.currentGuess.length === MAX_WORD_LENGHT && event.keyCode === 13){
                    if(!isValidGuess(this.currentGuess.join(''))){
                        activeRow.classList.add("jiggle");
                        setTimeout(() => {
                            activeRow.classList.remove("jiggle");
                        }, 1000);
                        return;
                    }
                    activeRow.handleGuessSubmit();
                    this.activeRowId += 1
                    this.currentGuess = [];
                }
            } catch (error) {
                console.error(error)
            }
        });
    }

    async handleHelp(){
        const modal = this.template.querySelector('base-modal');
        modal.handleOpen();
    }
}