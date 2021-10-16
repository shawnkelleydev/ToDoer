/* -----------------------------------

  DECLARATIONS / CALLBACK FUNCTIONS

----------------------------------- */

const form = document.querySelector("form");
const activeUL = document.querySelector("#active");
let remove;
let items;
let text = document.getElementById("new-item");

//focus textbox
text.focus();

//sets up remove listeners
function removeItems(btn, item, storageKey) {
  btn.addEventListener("click", () => {
    item.remove();
    localStorage.removeItem(storageKey);
  });
}

//handles checkboxes
function checkBoxListen(checkbox) {
  const parent = checkbox.parentElement.parentElement;
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      parent.style.background = "rgb(40, 40, 40)";
    } else {
      parent.style.background = "";
    }
  });
}

/* -----------------------------

  RELOAD FROM LOCAL STORAGE

----------------------------- */

function reloadStoredItems() {
  //grabs unique keys from local storage
  keys = Object.keys(localStorage);
  //writes / adds behavior to each list item
  for (let i = 0; i < keys.length; i++) {
    activeUL.insertAdjacentHTML(
      "beforeend",
      `
  <li id="li${keys[i]}">
    ${localStorage.getItem(keys[i])}
  </li>
  `
    );
    //checkbox toggle
    let checkbox = document.getElementById(`${keys[i]}`);
    checkBoxListen(checkbox, `${keys[i]}`);
    //removes from display and storage
    let removeBtn = document.getElementById(`r${keys[i]}`);
    let li = document.getElementById(`li${keys[i]}`);
    removeItems(removeBtn, li, keys[i]);
  }
}

//fires reloaded content
reloadStoredItems();

/* -------------------------

  ADD / REMOVE NEW ITEMS

------------------------- */

function addItem(e) {
  //prevent page reload
  e.preventDefault();
  //initial declarations
  const newItem = document.querySelector("#new-item").value;
  const errorMessage = document.querySelector("#error");
  //n = a unique barcode for each item
  const n = Math.random();

  if (newItem !== "") {
    errorMessage.innerText = "";
    //html writer
    activeUL.insertAdjacentHTML(
      "beforeend",
      `
  <li id="li${n}">
    <label for="${n}" class="todo-container">
      <div><input type="checkbox" id="${n}" class="item" /></div>
      <p>${newItem}</p>
      <button class="remove" id="r${n}"">X</button>
    </label>
  </li>
  `
    );
    //handles checkbox style toggle
    let checkbox = document.getElementById(n);
    checkBoxListen(checkbox);
    //declarations for storage addition and storage/li removal
    let removeBtn = document.getElementById(`r${n}`);
    let li = document.getElementById(`li${n}`);
    let key = `${n}`;
    //adds new item to local storage
    localStorage.setItem(n, li.innerHTML);
    //sets up remove buttons -- removes from display and storage
    removeItems(removeBtn, li, key);
    //clears input field
    document.querySelector("#new-item").value = "";
  } else {
    errorMessage.innerText = "Please provide text for your todo item.";
  }
}

//form submission listener, activates addItem()
form.addEventListener("submit", (e) => {
  addItem(e);
});
