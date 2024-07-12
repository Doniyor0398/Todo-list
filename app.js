let todoListArray = []; // Пустой массив
let getTodoListArray = localStorage.getItem("todoListArray"); // Получаем данные из localStorage по ключу "todoListArray"

if (getTodoListArray) {
  todoListArray = JSON.parse(getTodoListArray);
}

window.onload = function () {
  renderTodoList();
  applyDoneStyles();
};

function renderTodoList() {
  let todoListHTML = "";
  todoListArray.forEach(function (todoListArrayvalue, index) {
    let { todoName, dueDate } = todoListArrayvalue;

    let html = `
      <div class="main__result__sub">
        <div class="todoName" data-index="${index}">
          ${todoName}
          <span>${dueDate}</span>
        </div>
        <div class="main__result__body">
          <button class="main__result__done" data-index="${index}">
            Сделано
            <img src="./img/doneIcon.svg"/>
          </button>
          <button onclick="
            todoListArray.splice(${index}, 1);
            localStorage.setItem('todoListArray', JSON.stringify(todoListArray));
            qntTodoList();
            renderTodoList();          
          ">Удалить<img src="./img/deleteIcon.svg"/></button>
        </div>
      </div>`;

    todoListHTML += html;
  });

  document.querySelector(".main__result").innerHTML = todoListHTML;

  // При клике на кнопку "Сделано", изменяем стиль и сохраняем состояние

  document.querySelectorAll(".main__result__done").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      doneTodoList(index);
    });
  });

  function doneTodoList(index) {
    const todoNameElement = document.querySelector(
      `.todoName[data-index="${index}"]`
    );
    const buttonDone = document.querySelector(
      `.main__result__done[data-index="${index}"]`
    );

    if (todoNameElement) {
      if (todoNameElement.classList.contains("done")) {
        todoNameElement.classList.remove("done");
        buttonDone.style.background = "#9c27b0";
        todoListArray[index].done = false;
      } else {
        todoNameElement.classList.add("done");
        buttonDone.style.background = "#4caf50";
        todoListArray[index].done = true;
      }
      localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
    }
  }
  applyDoneStyles();
}

function applyDoneStyles() {
  todoListArray.forEach((task, index) => {
    const todoNameElement = document.querySelector(
      `.todoName[data-index="${index}"]`
    );
    const buttonDone = document.querySelector(
      `.main__result__done[data-index="${index}"]`
    );
    if (task.done && todoNameElement) {
      todoNameElement.classList.add("done");
      buttonDone.style.background = "#4caf50";
    }
  });
}

const inputElement = document.querySelector(".todoList__row__input");
const btnAdd = document.querySelector(".todoList__row__buttonAdd");
btnAdd.style.opacity = "0.5";

inputElement.oninput = function () {
  if (inputElement.value.trim().length === 0) {
    btnAdd.setAttribute("disabled", "");
  } else {
    btnAdd.removeAttribute("disabled");
    btnAdd.style.cursor = "pointer";
    btnAdd.style.opacity = "1";
  }
};

// Подсчет количества задач
function qntTodoList() {
  document.querySelector(
    ".quantityLength"
  ).innerHTML = `<img src="./img/iconHeaderRIght.png" alt="iconDelete" /> <span>${todoListArray.length}</span>`;
}
qntTodoList();

document.querySelector(".todoList__row__date").valueAsDate = new Date();

// Добавление задачи при клике на кнопку "Добавить"
function addTodo() {
  const inputDueData = document.querySelector(".todoList__row__date");
  const inputElement = document.querySelector(".todoList__row__input");
  const errorElement = document.querySelector(".main__error");
  errorElement.style.color = "red";
  const todoName = inputElement.value.trim();
  const dueDate = inputDueData.value;

  if (inputElement.value === "") {
    errorElement.innerHTML = `Пожалуйста, заполните все обязательные поля перед продолжением:🗒 <span>Готовить ужин</span>`;
    return;
  } else if (inputDueData.value === "") {
    errorElement.innerHTML = `Пожалуйста, заполните все обязательные поля перед продолжением:📅<span> 17-03-2024</span>`;
    errorElement.style.padding = "0px";
    errorElement.style.padding = "20px";
    return;
  }

  errorElement.innerHTML = "";
  btnAdd.style.opacity = "0.5";
  if (todoListArray) {
    todoListArray.push({ todoName, dueDate, done: false });
  } else {
    todoListArray = [{ todoName, dueDate, done: false }];
  }

  inputElement.value = "";

  qntTodoList();
  applyDoneStyles();
  renderTodoList();

  // Сохранение в localStorage
  localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
}
