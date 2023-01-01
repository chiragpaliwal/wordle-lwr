import { LightningElement, api } from 'lwc';

export default class Tile extends LightningElement {

    @api letter;
    @api position = 0;
    @api isCompleted;
    @api state;

}