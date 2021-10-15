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

text.focus();

function addItem(e) {
  const newItem = document.querySelector("#new-item").value;
  e.preventDefault();
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
  const checkbox = document.getElementById(n);
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      checkbox.parentElement.style.background = "darkGray";
    } else {
      checkbox.parentElement.style.background = "";
    }
  });
  const removeBtn = document.getElementById(`r${n}`);
  removeBtn.addEventListener("click", () => {
    const li = document.getElementById(`li${n}`);
    li.remove();
  });
  // let checkbox = items[i].children[0].children[0];
}

form.addEventListener("submit", (e) => {
  addItem(e);
});

/* -----------------

  CHECKED ITEMS

----------------- */

/* -------------

  REMOVE ITEMS

------------- */
