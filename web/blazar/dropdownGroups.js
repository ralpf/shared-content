import { locatorUtil } from "./utils";

export class DropdownGroup {

  constructor(idSelector, idContent) {
    this.selector = locatorUtil.findById(idSelector);  // dropdown
    this.content = locatorUtil.findById(idContent);
    const numOpt = this.selector.options.length;
    const numCnt = this.content.children.length;
    if (numOpt !== numCnt) throw new Error(`count options (${numOpt}) != count content items (${numCnt})`);
    // handlers
    this.selector.addEventListener('change', x => this.#setOptionValue(x));
    // init visuals
    this.#setOptionValue(this.selector.value);
  }

  #setOptionValue(value) {
    const idx = parseInt(value, 10) - 1;
    for (let i = 0; i < this.content.length; i++)
      this.content[i].style.display = i === idx ? 'flex' : 'none';
  }

}