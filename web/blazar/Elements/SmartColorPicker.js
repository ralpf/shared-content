import { colorUtil } from './colorUtil.js'

export class ElSmartPicker{
  constructor(id) {
    this.root = document.getElementById(id);
    this.label = this.root.querySelector('label');
    const box = this.root.querySelector('div');
    [this.delete, this.color, this.add] = box.querySelectorAll('button, input');
  }

  
  updateLabel() {
    this.label.textContent = colorUtil.getNearestColorName(hex);
  }
  
  setColor(hex) {
    this.input.value = hex;
    this.updateLabel();
  }

  setColorRandom() {
    this.setColor( colorUtil.getRandom() );
    console.log('color random set ~~~~~~~~~v');
  }
}


export function fff() { console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFF'); }