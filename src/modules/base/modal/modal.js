import { LightningElement, api } from 'lwc';

export default class Modal extends LightningElement {

    @api handleOpen(){
        this.template.querySelector('details').setAttribute('open', 'true');
    }

    @api handleClose(){
        this.template.querySelector('details').removeAttribute('open');
    }
}