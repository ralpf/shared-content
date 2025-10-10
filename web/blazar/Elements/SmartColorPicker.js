import { colorUtil } from './colorUtil.js'

export class ElSmartPicker {
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
    const name = this.#formatName(colorUtil.getNearestColorName(this.color.value));
    this.label.textContent = name;
    this.#autoFitText(this.label, this.root.offsetWidth - 10);
  }

  setColor(hex) {
    this.color.value = hex;
    this.updateLabel();
  }

  setColorRandom() {
    this.setColor(colorUtil.getRandom());
  }

  //.......................................PRIVATE

  #formatName(name) {
    // split camelCase into words
    const spaced = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    // capitalize each word
    return spaced.replace(/\b\w/g, c => c.toUpperCase());
  }

  #autoFitText(el) {
    const len = el.textContent.length;
    const def = parseFloat(getComputedStyle(el).fontSize);
    let scale = 1;

    if (len > 24) scale = 0.5;
    else if (len > 20) scale = 0.6;
    else if (len > 16) scale = 0.7;
    else if (len > 12) scale = 0.8;
    else if (len > 8) scale = 0.9;

    const newSize = Math.min(def, def * scale * 1.3);
    el.style.fontSize = newSize + 'px';
  }
}
