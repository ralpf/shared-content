import { colorUtil } from './utils.js'

class ColorPickerItem {
  constructor(rootEl, onChange = null, onAdd = null, onDel = null) {
    this.root = rootEl;
    this.label = this.root.querySelector('label');
    const box = this.root.querySelector('div');
    [this.delete, this.color, this.add] = box.querySelectorAll('button, input');
    // handler
    this.onChange = onChange;
    this.onAdd = onAdd;
    this.onDel = onDel;
    this.color.addEventListener('change', () => this.#on_ColorChange());
    this.delete.addEventListener('click', () => this.#on_DeleteClicked());
    this.add.addEventListener('click', () => this.#on_AddClicked());
  }

  updateLabel() {
    const name = this.#formatName(colorUtil.getNearestColorName(this.color.value));
    this.label.textContent = name;
    this.#autoFitText(this.label, this.root.offsetWidth - 10);
  }
  
  setColor(hex) {
    this.color.value = hex;
    this.updateLabel();
    this.color.dispatchEvent(new Event('change', { bubbles: true }));
  }
  
  setColorRandom() {
    this.setColor(colorUtil.getRandom());
  }

  getColor() {
    return this.color.value;
  }
  
  //.......................................PRIVATE
  
  #on_ColorChange(hsv) {  // => preserves 'this'
    this.updateLabel();
    this.onChange(this);      // invoke handler
  }

  #on_AddClicked() {
    this.onAdd(this);         // invoke handler
  }

  #on_DeleteClicked() {
    this.onDel(this);         // invoke handler
  }

  #formatName(name) {
    // split camelCase into words
    const spaced = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    // capitalize each word
    return spaced.replace(/\b\w/g, c => c.toUpperCase());
  }

  #autoFitText(el) {
    el.style.fontSize = '';  // reset to default first
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



//......................................CLASS

export class ColorPickerList {
  list = [];
  firstItem = null;

  constructor(idFirstElement, onChange = null) {
    const firstEl = document.getElementById(idFirstElement);
    if (!firstEl) throw new Error(`No id '${idFirstElement}' found in ducument. Can't create list controller`);
  
    this.onChange = onChange;
    this.firstItem = new ColorPickerItem(firstEl, x => this.#onItemChange(x), x => this.#onItemAdd(x), x => this.#onItemDelete(x));
    this.firstItem.setColorRandom();
    this.list.push(this.firstItem);
  }

  //..................................PRIVATE

  #onItemAdd(item) {
    const clone = item.root.cloneNode(true);
    this.#removeIdAttribute(clone);
    item.root.after(clone);
    const newItem = new ColorPickerItem(clone, x => this.#onItemChange(x), x => this.#onItemAdd(x), x => this.#onItemDelete(x));
    const idx = this.list.indexOf(item);
    this.list.splice(idx + 1, 0, newItem);
    newItem.setColorRandom();
  }

  #onItemDelete(item) {
    const idx = this.list.indexOf(item);
    if (idx < 1) return;  // can't delete first
    item.root.remove();   // remove from DOM
    this.list.splice(idx, 1);
  }

  #onItemChange(item) {
    const arr = this.list.map(x => x.getColor());
    const json =  { colors: arr};
    this.onChange(json);
  }

  #removeIdAttribute(el, alsoForChildren = true) {
    el.removeAttribute('id');
    if (alsoForChildren) el.querySelectorAll('[id]').forEach(x => x.removeAttribute('id'));
  }
}