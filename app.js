let todoListArray = []; // ! пустой массив
let getTodoListArray = localStorage.getItem("todoListArray"); // ! получаем данные от local.setItem по кулючу todoListArray

if (getTodoListArray) {
  todoListArray = JSON.parse(getTodoListArray);
}

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  for (let i = 0; i < todoListArray.length; i++) {
    let todoListArrayvalue = todoListArray[i];
    let { todoName, dueDate } = todoListArrayvalue;

    let html = `
      <div class="main__result__sub">
        <div class="todoName" data-index="${i}">
        ${todoName}
        <span>${dueDate}</span>
        </div>
         &nbsp;&nbsp; 
        <div class="main__result__body">
         <button class="main__result__done" data-index="${i}">
         Сделано
         <img src="./img/doneIcon.svg"/>
         </button>
          <button 
            onclick="
            todoListArray.splice(${i}, 1);
            localStorage.setItem('todoListArray',   
            JSON.stringify(todoListArray));
            qntTodoList();
            renderTodoList();          
            ">Удалить<img src="./img/deleteIcon.svg"/>
          </button>
        </div>
      </div>
      `;

    todoListHTML += html;
  }
  document.querySelector(".main__result").innerHTML = todoListHTML;
  // ! Функции  При клике на кнопку Сделано, зачерковать текст
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

    if (todoNameElement) {
      if (todoNameElement.classList.contains("done")) {
        todoNameElement.classList.remove("done");
        todoListArray[index].done = false;
      } else {
        todoNameElement.classList.add("done");
        todoListArray[index].done = true;
      }

      localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
    } else {
      console.warn(`Элемент с индексом ${index} не найден`);
    }
  }
}

const inputElement = document.querySelector(".todoList__row__input");
const btnAdd = document.querySelector(".todoList__row__buttonAdd");
btnAdd.style.opacity = "0.099";

inputElement.oninput = function () {
  if (inputElement.value.trim().length === 0) {
    btnAdd.setAttribute("disabled", "");
    return;
  } else {
    btnAdd.removeAttribute("disabled", "");
    btnAdd.style.cursor = "pointer";
    btnAdd.style.opacity = "1";
  }
};

// ! Посчитать количество заметок

function qntTodoList() {
  document.querySelector(
    ".quantityLength"
  ).innerHTML = `Количество задач: <span>${todoListArray.length}</span> `;
}
qntTodoList();

// ! Добавление задач при клике на кнопку Добавить
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
    errorElement.innerHTML = `Пожалуйста, заполните все обязательные поля перед продолжением:📅 17-03-2024`;
    errorElement.style.padding = "0px";
    errorElement.style.padding = "20px";
    return;
  }

  errorElement.innerHTML = "";

  if (todoListArray) {
    todoListArray.push({ todoName, dueDate });
  } else {
    todoListArray = [{ todoName, dueDate }];
  }

  inputElement.value = "";

  qntTodoList();
  renderTodoList();

  // ! SET LOCAL STORAGE
  localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
}
