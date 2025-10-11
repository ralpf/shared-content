import { locatorUtil } from "./utils.js";

export class DropdownGroup {

  constructor(idSelector, idContent) {
    this.selector = locatorUtil.findById(idSelector);  // dropdown
    this.content = locatorUtil.findById(idContent);
    const numOpt = this.selector.options.length;
    const numCnt = this.content.children.length;
    if (numOpt !== numCnt) throw new Error(`count options (${numOpt}) != count content items (${numCnt})`);
    // handlers
    this.selector.addEventListener('change', () => this.#setOptionValue(this.selector.value));
    // init visuals
    this.#setOptionValue(this.selector.value);
    console.log('dropdown created ' + idSelector);
  }

  #setOptionValue(value) {
    const idx = parseInt(value, 10) - 1;
    for (let i = 0; i < this.content.children.length; i++) {
      this.content.children[i].style.display = i === idx ? 'flex' : 'none';
    }
  }

}