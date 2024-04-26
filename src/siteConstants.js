import { editTodoForm } from "./editTD";
import { generateTdQuadDisplay, generateTdListDisplay, generateProjectHeader } from "./sitedynamic";
import { addOverdueClass, createQuadLists } from "./listManagment";
import { addProjectTagOptions } from "./newTD";

const content = document.getElementById("content");
const main = document.getElementById("main");

function initializeDisplay(currentTodoList) {
  main.appendChild(generateProjectHeader("All Tasks"));
  if (main.classList.contains("quad")) {
    main.appendChild(generateTdQuadDisplay(createQuadLists(currentTodoList)));
  } else {
    main.appendChild(generateTdListDisplay(currentTodoList));
  }
  addOverdueClass(currentTodoList);
}

export default function createSite(tdList) {
  addProjectTagOptions(tdList);
  content.appendChild(editTodoForm());
  initializeDisplay(tdList);
}
