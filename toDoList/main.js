// 初始變數
const toDoList = document.querySelector("#my-todo");
const addBtn = document.querySelector("#addBtn");
const input = document.querySelector("#newTodo");
const doneList = document.querySelector("#done");
const lists = document.querySelector("#lists");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];
for (let todo of todos) {
  addItem(todo);
}

// 函式-增加項目
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  toDoList.appendChild(newItem);
}

//函式-判斷輸入值，去除空格後輸入資料仍大於0，表示非空白
function notBlank(inputValue) {
  return inputValue.replace(/(^\s*)|(\s*$)/g, "").length > 0;
}

// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value;
  if (notBlank(inputValue)) {
    addItem(inputValue);
    input.value = ""
  }
});

input.addEventListener("keypress", function () {
  const inputValue = input.value;
  if (event.keyCode == 13 && notBlank(inputValue)) {
    addItem(inputValue);
    input.value = ""
  }

});

// Delete and check
lists.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("delete")) {
    const parentElement = target.parentElement;
    parentElement.remove();
    
  } else if (target.tagName === "LABEL") {
    const parentElement = target.parentElement;
    target.classList.toggle("checked");
    
    if (target.classList.contains("checked")) {
      parentElement.remove();
      doneList.appendChild(parentElement);
    } else {
      parentElement.remove();
      toDoList.appendChild(parentElement);
    }
  }
});

