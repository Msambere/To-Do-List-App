import { createNewTodoForm } from "./newTD";
import { editTodoForm } from "./editTD";
import { generateTdQuadDisplay, generateTdListDisplay, generateProjectHeader } from "./sitedynamic";
import { addOverdueClass, createQuadLists } from "./listManagment";

const content = document.getElementById("content");
const main = document.getElementById("main");
const allTasksBtn = document.getElementById("all");
allTasksBtn.classList.toggle("active");

function initializeDisplay(currentTodoList) {
  main.appendChild(generateProjectHeader("All tasks"));
  if (main.classList.contains("quad")) {
    main.appendChild(generateTdQuadDisplay(createQuadLists(currentTodoList)));
  } else {
    main.appendChild(generateTdListDisplay(currentTodoList));
  }
  addOverdueClass(currentTodoList);
}

export default function createSite(tdList) {
  content.appendChild(createNewTodoForm(tdList));
  content.appendChild(editTodoForm());
  initializeDisplay(tdList);
}
