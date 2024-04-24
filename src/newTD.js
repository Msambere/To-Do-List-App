import { format, addDays } from "date-fns";
import { createProjectTagList, indexList } from "./listManagment";
import { Todo } from "./constructors";
import { mainTodoList } from "./testTDList";

// New Todo
function createNewTodoForm(tdList) {
  const dialog = document.createElement("dialog");
  dialog.classList.add("modal");
  dialog.setAttribute("id", "newTodoDialog");

  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
  form.setAttribute("id", "myForm");

  const titleRow = createFormRow("td-title", "Title of Todo", "text");
  const descriptRow = createFormRow("td-description", "Description of Todo", "text");
  const dateRow = createFormRow("td-dueDate", "Due Date:", "date");
  const priorityRow = createSelectFormRow("td-priority", "Priority", ["High", "Medium", "Low"]);
  console.log(tdList);
  const projectRow = createSelectFormRow("td-projectTag", "Project", createProjectTagList(tdList));

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("form-buttons");

  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("id", "cancelBtn");
  cancelBtn.setAttribute("value", "cancel");
  cancelBtn.setAttribute("formmethod", "dialog");
  cancelBtn.textContent = "Cancel";

  const confirmBtn = document.createElement("button");
  confirmBtn.setAttribute("id", "confirmBtn");
  confirmBtn.setAttribute("value", "default");
  confirmBtn.textContent = "Confirm";

  btnContainer.appendChild(cancelBtn);
  btnContainer.appendChild(confirmBtn);
  form.appendChild(titleRow);
  form.appendChild(descriptRow);
  form.appendChild(dateRow);
  form.appendChild(priorityRow);
  form.appendChild(projectRow);
  form.appendChild(btnContainer);
  dialog.appendChild(form);
  return dialog;
}

function addNewTodo(tdList) {
  const tdTitle = document.getElementById("td-title").value;
  const tddescript = document.getElementById("td-description").value;
  const tddueDate = format(addDays(document.getElementById("td-dueDate").value, 1), "M-dd-y");
  const tdpriority = document.getElementById("td-priority").value;
  const tdprojectTag = document.getElementById("td-projectTag").value;
  const newTodo = new Todo(tdTitle, tddescript, tddueDate, tdpriority, [], "", tdprojectTag);
  tdList.push(newTodo);
  tdList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  indexList(tdList);
  return newTodo;
}

// helper functions
function createFormRow(id, title, iType) {
  const formRow = document.createElement("div");
  formRow.classList.add("form-row");

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = title;

  const input = document.createElement("input");
  input.setAttribute("type", iType);
  input.setAttribute("name", id);
  input.setAttribute("id", id);

  formRow.appendChild(label);
  formRow.appendChild(input);
  return formRow;
}

function createSelectFormRow(id, title, optionsList) {
  const formRow = document.createElement("div");
  formRow.classList.add("form-row");

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = title;

  const select = document.createElement("select");
  select.setAttribute("id", id);
  select.setAttribute("name", id);

  optionsList.forEach((option) => {
    const currentOption = document.createElement("option");
    currentOption.textContent = option;
    select.appendChild(currentOption);
  });

  formRow.appendChild(label);
  formRow.appendChild(select);
  return formRow;
}

export { createNewTodoForm, addNewTodo };
