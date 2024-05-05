import { format, addDays } from "date-fns";
import { createProjectTagList, indexList } from "./listManagment";
import { Todo } from "./constructors";

// New Todo
const projectTagRow = document.getElementById("projectTag-options");

function createSelectOptions(optionsList) {
  optionsList.forEach((option) => {
    const currentOption = document.createElement("option");
    currentOption.textContent = option;
    projectTagRow.appendChild(currentOption);
  });
}

function addProjectTagOptions(tdList) {
  createSelectOptions(createProjectTagList(tdList));
}

function addNewTodo(tdList) {
  const tdTitle = document.getElementById("td-title").value;
  const tddescript = document.getElementById("td-description").value;
  const tddueDate = format(addDays(document.getElementById("td-dueDate").value, 1), "M-dd-y");
  const tdpriority = document.getElementById("td-priority").value;
  const tdprojectTag = document.getElementById("td-projectTag").value;
  console.log(tdprojectTag);
  const newTodo = new Todo(tdTitle, tddescript, tddueDate, tdpriority, tdprojectTag);
  console.table(newTodo);
  tdList.push(newTodo);
  tdList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  indexList(tdList);
  console.table(tdList);
  return newTodo;
}

// helper functions

export { addNewTodo, addProjectTagOptions };
