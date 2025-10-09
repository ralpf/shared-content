
import { nearestNamedColor } from './colorUtil.js'

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
  bindInputHandlers();
  console.log('Binded handlers for input elements');
  initInputVisuals();
  console.log('Applied defaults');
});

function bindInputHandlers() {    // <~~~ HANDLERS
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
  setActive(idx) {
    const contents = document.getElementById('ID-main').children;
    for (let i = 0; i < contents.length; i++)
      contents[i].style.display = i === idx ? 'flex' : 'none';
  }
}

Main.Settings = {
  
};

Main.Lamp = {
  bindInputHandlers() {
    // flicker toggle
    document.getElementById('ID-lamp-flicker').addEventListener('change', 
      function() { document.getElementById('ID-lamp-flicker-content').style.display = this.checked ? 'flex' : 'none'; });
    // mode select dropdown
    document.getElementById('ID-lamp-mode-select').addEventListener('change', function() { Main.Lamp.setLampMode(this.value); });
  },

  initInputVisuals() {
    const flicker = document.getElementById('ID-lamp-flicker');       flicker.checked = true;  flicker.dispatchEvent(new Event('change'));
    const lampmode = document.getElementById('ID-lamp-mode-select');  lampmode.value = '1';    lampmode.dispatchEvent(new Event('change'));
    const xx = document.getElementById('iqbgb1');
    xx.textContent = nearestNamedColor('keks');
  },

  setLampMode(val) {
    const idx = parseInt(val, 10) - 1;
    const contents = document.getElementById('ID-lamp-mode-content').children;
    for (let i = 0; i < contents.length; i++)
      contents[i].style.display = i === idx ? 'flex' : 'none';
  }
};

