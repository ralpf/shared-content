console.log('>>> script.js STARTED');

//........................................................................IMPORT

import { ColorPickerList } from './listColorPickers.js';
import { DropdownGroup } from './dropdownGroups.js';

//.......................................................................HELPERS

function do_fetch(request) {
  fetch(request).then((response) => {
    if (response.ok) console.log(`Request OK ${request}`);
    else console.error(`FAIL Request ${request}`);
  }).catch((error) => console.error(`Exception on ${request}`, error));
}

function childIndex(el) {
  const kids = el.parentNode.children;
  for (let i = 0; i < kids.length; i++)
    if (kids[i] === el) return i;
  return -1;
}

//..........................................................................INIT

document.addEventListener("DOMContentLoaded", function() {  // <~~~~ ON DOM LOAD
  console.log('Document Loaded');
  init();
  console.log('Scripts inited');
  bindInputHandlers();
  console.log('Binded handlers for input elements');
  initInputVisuals();
  console.log('Applied defaults');
});

function init() {
  Main.Lamp.init();
  Main.Deck.init();
}

function bindInputHandlers() {
  Array.from(document.getElementById('ID-mode-root').children)
    .forEach((el, i) => el.addEventListener('click', function() { Main.setActive(i); Mode.setActive(i); }));
  Main.Lamp.bindInputHandlers();
}

function initInputVisuals() {
  Main.setActive(0);
  Mode.setActive(0);
  Main.Lamp.initInputVisuals();
}

//..........................................................................MODE

const Mode = {
  setActive(idx) {
    const signals = document.getElementById('ID-mode-root-signals').children;
    for (let i = 0; i < signals.length; i++)
      setSignal(signals[i], i === idx);
    // inner func
    function setSignal(parent, isOn) {
      parent.children[0].style.display = isOn ? 'flex' : 'none';
      parent.children[1].style.display = isOn ? 'none' : 'flex';
    }
  }
}

//..........................................................................MAIN

const Main = {
  // toggle the main panel elements
  setActive(idx) {
    const contents = document.getElementById('ID-main').children;
    for (let i = 0; i < contents.length; i++)
      contents[i].style.display = i === idx ? 'flex' : 'none';
  }
}

//.................................................................MAIN-SETTINGS

Main.Settings = {
  
};

//.....................................................................MAIN-LAMP

Main.Lamp = {
  listColorPickers: null,

  init() {
    this.modeSelector = new DropdownGroup('ID-lamp-mode-select', 'ID-lamp-mode-content');
    this.listColorPickers = new ColorPickerList('iqmg6j', txt => console.log(txt));
  },

  bindInputHandlers() {
    // flicker toggle
    document.getElementById('ID-lamp-flicker').addEventListener('change', 
      function() { document.getElementById('ID-lamp-flicker-content').style.display = this.checked ? 'flex' : 'none'; });
  },

  initInputVisuals() {
    const flicker = document.getElementById('ID-lamp-flicker');       flicker.checked = true;  flicker.dispatchEvent(new Event('change'));
  },

};

//.....................................................................MAIN-DECK

Main.Deck = {

  init() {
    this.modeSelector = new DropdownGroup('ID-deck-mode-select', 'ID-deck-mode-content');
  },

  bindInputHandlers() {
  },

  setDeckMode(val) {
    const idx = parseInt(val, 10) - 1;
    const all = document.getElementById('ID-deck-mode-content').children;
    for (let i = 0; i < all.length; i++)
      all[i].style.display = i === idx ? 'flex' : 'none';
  }

};

