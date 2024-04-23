let todoListArray = [];
let getTodoListArray = localStorage.getItem("todoListArray");

if (getTodoListArray) {
  todoListArray = JSON.parse(getTodoListArray);
}

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  for (i = 0; i < todoListArray.length; i++) {
    let todoListArrayvalue = todoListArray[i];
    let { todoName, dueDate } = todoListArrayvalue;

    let html = `
		<div class="main__result__sub">
      ${todoName} &nbsp;&nbsp; 
      <div class="main__result__body">
        <span>${dueDate}</span>
        <button 
          onclick="
          todoListArray.splice(${[i]},1)
          localStorage.removeItem('todoListArray');
          renderTodoList();          
          ">Удалить<img src="./img/deleteIcon.svg"/>
        </button>
      </div>
     </div>
  `;

    todoListHTML += html;
  }
  document.querySelector(".main__result").innerHTML = todoListHTML;
}

const inputElement = document.querySelector(".todoList__row__input");
const btnAdd = document.querySelector(".todoList__row__buttonAdd");
btnAdd.setAttribute("disabled", "");
btnAdd.style.opacity = "0.3";

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

function addTodo() {
  const inputDueData = document.querySelector(".todoList__row__date");
  const inputElement = document.querySelector(".todoList__row__input");
  const errorElement = document.querySelector(".main__error");
  const todoName = inputElement.value.trim();
  const dueDate = inputDueData.value;

  errorElement.style.color = "red";

  if (inputElement.value === "") {
    errorElement.innerHTML = "Пожалуйста, заполните поля, 🗒";
    return;
  } else if (inputDueData.value === "") {
    errorElement.innerHTML = "Пожалуйста, заполните поля 📅";

    errorElement.style.padding = "20px";
    return;
  }

  errorElement.innerHTML = "";
  todoListArray.push({ todoName, dueDate });
  inputElement.value = "";
  inputDueData.value = "";

  renderTodoList();
  // ! SET LOCAL STORAGE
  localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
}
