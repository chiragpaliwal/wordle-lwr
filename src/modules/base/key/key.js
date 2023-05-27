import { LightningElement, api } from 'lwc';

export default class Key extends LightningElement {

    @api value = '';

    handleClick() {
        this.dispatchEvent(new CustomEvent('screenpress', { detail: this.value, bubbles: true, composed: true }));
    }
}