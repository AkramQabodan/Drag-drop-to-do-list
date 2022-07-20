"use strict";
const draggable = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
console.log(containers[0].children, Array.from(containers[0].children));
const input = document.querySelector(".input-bar");
const addButton = document.querySelector(".add");
//local storage initialization
let items = JSON.stringify({
  0: [],
  1: [],
  2: [],
  3: [],
});

if (!localStorage.getItem("items")) {
  localStorage.setItem("items", items);
}

// adding items
const addItem = (container, text) => {
  // adding input
  const item = document.createElement("li");
  item.setAttribute("draggable", true);
  item.classList.add("draggable");
  containers[container].append(item);

  text ? (item.innerText = text) : (item.innerText = `${input.value}`);
  let deleteButton = document.createElement("div");
  deleteButton.classList.add("delete-button");
  item.append(deleteButton);
  //adding event listners
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
  deleteButton.addEventListener("click", () => {
    item.remove();
  });
};
// putting items back
let savedItems = localStorage.getItem("items");
let memorizeditems = JSON.parse(savedItems);

for (let i = 0; i < 4; i++) {
  memorizeditems[i].forEach((item) => {
    addItem(i, item);
  });
}
//adding items to local storage
const updateLocalStorage = () => {
  let items = {
    0: [],
    1: [],
    2: [],
    3: [],
  };
  for (let i = 0; i < 4; i++) {
    // console.log(containers[i].children);
    // debugger;

    // [...containers[i].children].forEach((el) => items[i].push(el.innerText));

    var children = Array.from(containers[i].children);
    children.forEach(function (el) {
      items[i].push(el.innerText);
    });
  }
  // console.log(items);
  // console.log(JSON.stringify(items));
  let items2 = JSON.stringify(items);
  localStorage.setItem("items", items2);
};

addButton.addEventListener("click", () => {
  addItem(0);
});

//
draggable.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    container.appendChild(draggable);
  });
});
window.addEventListener("beforeunload", function (e) {
  if (localStorage.getItem("items")) {
    e.preventDefault();
    e.returnValue = "";
    updateLocalStorage();
  }
});
