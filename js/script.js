/*

active li html

<li>
  <label for="item" class="todo-container">
    <input type="checkbox" id="item" />
    <span>Make a todo app for personal use</span>
  </label>
</li>;

*/

/* -------------

  ADD ITEMS

------------- */

const form = document.querySelector("form");
const activeUL = document.querySelector("#active");
let remove;
let items;
let text = document.getElementById("new-item");

//focus textbox
text.focus();

//reload previous content
function reloadStoredItems() {
  keys = Object.keys(localStorage);
  console.log(localStorage.getItem(keys[0]));
  for (let i = 0; i < keys.length; i++) {
    activeUL.insertAdjacentHTML(
      "beforeend",
      `
  <li id="li${keys[i]}">
    ${localStorage.getItem(keys[i])}
  </li>
  `
    );
    //checkbox
    let checkbox = document.getElementById(`${keys[i]}`);
    checkBoxListen(checkbox, `${keys[i]}`);
    //remove
    let removeBtn = document.getElementById(`r${keys[i]}`);
    let li = document.getElementById(`li${keys[i]}`);
    localStorage.setItem(keys[i], li.innerHTML);
    removeBtn.addEventListener("click", () => {
      li.remove();
      localStorage.removeItem(`${keys[i]}`);
    });
  }
}

reloadStoredItems();

//add / remove items
function addItem(e) {
  e.preventDefault();
  const newItem = document.querySelector("#new-item").value;
  const n = Math.random();
  activeUL.insertAdjacentHTML(
    "beforeend",
    `
  <li id="li${n}">
    <label for="${n}" class="todo-container">
      <input type="checkbox" id="${n}" class="item" />
      <p>${newItem}</p>
      <button class="remove" id="r${n}"">X</button>
    </label>
  </li>
  `
  );

  let checkbox = document.getElementById(n);
  checkBoxListen(checkbox);
  // checkbox.addEventListener("change", () => {
  //   if (checkbox.checked) {
  //     checkbox.parentElement.style.background = "rgb(40, 40, 40)";
  //   } else {
  //     checkbox.parentElement.style.background = "";
  //   }
  // });
  let removeBtn = document.getElementById(`r${n}`);
  let li = document.getElementById(`li${n}`);
  localStorage.setItem(n, li.innerHTML);
  removeBtn.addEventListener("click", () => {
    li.remove();
    localStorage.removeItem(`${n}`);
  });
  document.querySelector("#new-item").value = "";
}

form.addEventListener("submit", (e) => {
  addItem(e);
});

//checkBoxListen
function checkBoxListen(checkbox) {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      checkbox.parentElement.style.background = "rgb(40, 40, 40)";
    } else {
      checkbox.parentElement.style.background = "";
    }
  });
}
