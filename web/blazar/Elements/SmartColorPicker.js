import { colorUtil } from './colorUtil.js'

export class ElSmartPicker{
  constructor(id) {
    this.root = document.getElementById(id);
    this.label = this.root.querySelector('label');
    const box = this.root.querySelector('div');
    [this.delete, this.color, this.add] = box.querySelectorAll('button, input');
  }

  
  updateLabel() {
    const hex = this.color.value;
    this.label.textContent = colorUtil.getNearestColorName(hex);
    console.log('text updated ' + this.label.textContent);
  }
  
  setColor(hex) {
    this.color.value = hex;
    console.log('color set to ' + hex);
    this.updateLabel();
  }

  setColorRandom() {
    this.setColor( colorUtil.getRandom() );
  }
}
