import { mainTodoList } from "./applogic";
import { format } from "date-fns";

//New Todo
function editTodoForm() {
  const dialog = document.createElement("dialog");
  dialog.classList.add("modal");
  dialog.setAttribute("id", "editTodoDialog");

  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
  form.setAttribute("id", "editForm");

  const propertyRow = createSelectFormRow("td-property", "Choose a property", [
    "title",
    "description",
    "dueDate",
    "priority",
    "notes",
    "project tag",
  ]);
  const newValueRow = createFormRow("newValue", "", "text");

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("form-buttons");

  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("id", "editCancelBtn");
  cancelBtn.setAttribute("value", "cancel");
  cancelBtn.setAttribute("formmethod", "dialog");
  cancelBtn.textContent = "Cancel";

  const confirmBtn = document.createElement("button");
  confirmBtn.setAttribute("id", "editConfirmBtn");
  confirmBtn.setAttribute("value", "default");
  confirmBtn.textContent = "Confirm";

  btnContainer.appendChild(cancelBtn);
  btnContainer.appendChild(confirmBtn);
  form.appendChild(propertyRow);
  form.appendChild(newValueRow);
  form.appendChild(btnContainer);
  dialog.appendChild(form);
  return dialog;
}

function editTodoProperty(tdIndex) {
  let editProperty = document.getElementById("td-property").value;
  let newValue = document.getElementById("newValue").value;
  mainTodoList[tdIndex][editProperty] = newValue;
  let editedTd = mainTodoList[tdIndex];
  return editedTd;
}

function changeCompleteProperty(tdIndex, tdList) {
  let currentStatus = tdList[tdIndex]["status"];
  if (currentStatus === "") {
    tdList[tdIndex]["status"] = "complete";
  } else {
    tdList[tdIndex]["status"] = "";
  }
  return currentStatus;
}

//helper functions
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
    let currentOption = document.createElement("option");
    currentOption.textContent = option;
    select.appendChild(currentOption);
  });

  formRow.appendChild(label);
  formRow.appendChild(select);
  return formRow;
}

export { editTodoProperty, editTodoForm, changeCompleteProperty };
