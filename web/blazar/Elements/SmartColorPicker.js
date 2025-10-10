import { colorUtil } from './colorUtil.js'

export class ElSmartPicker{
  constructor(id, onChange = null) {
    this.root = document.getElementById(id);
    this.label = this.root.querySelector('label');
    const box = this.root.querySelector('div');
    [this.delete, this.color, this.add] = box.querySelectorAll('button, input');
    // handler
    this.onChange = onChange;
    this.color.addEventListener('change', this.onColorChange)
  }

  // here => is important to keep 'this' resolution
  onColorChange = (x) => {
    const hex = x.target.value;
    this.updateLabel();
    if (this.onChange) this.onChange(hex);
  }

  updateLabel() {
    const hex = this.color.value;
    this.label.textContent = colorUtil.getNearestColorName(hex);
  }
  
  setColor(hex) {
    this.color.value = hex;
    this.updateLabel();
  }

  setColorRandom() {
    this.setColor( colorUtil.getRandom() );
  }
}
