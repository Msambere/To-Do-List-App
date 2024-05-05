import { addDays } from "date-fns";
import { createProjectTagList, createProjectTDLists, getProjectStats } from "./listManagment";
import { dueDateFormat } from "./constructors";

function generateQuadDateSelector() {
  const container = document.createElement("div");
  container.classList.add("date-selector-div");
  const dateSelectorForm = document.createElement("form");
  dateSelectorForm.setAttribute("id", "dateForm");
  const dateSelectorLabel = document.createElement("label");
  dateSelectorLabel.setAttribute("for", "date-selector");
  dateSelectorLabel.textContent = "Choose the date cut off for urgency:   ";
  const dateSelector = document.createElement("input");
  dateSelector.setAttribute("type", "date");
  dateSelector.setAttribute("id", "date-selector");
  dateSelector.setAttribute("name", "date-selector");
  dateSelector.setAttribute("value", dueDateFormat(addDays(new Date(), 10)));
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Change";
  dateSelectorForm.appendChild(dateSelectorLabel);
  dateSelectorForm.appendChild(dateSelector);
  dateSelectorForm.appendChild(submitBtn);
  container.appendChild(dateSelectorForm);
  return container;
}

function generateProjectOverviewsDisplay(tdList) {
  const container = document.createElement("div");
  container.classList.add("projectOverviews-container");
  container.classList.add("list-display");
  const projectObjectList = createProjectTDLists(tdList);
  projectObjectList.forEach((object) => {
    const div = generateStatsDiv(object);
    container.appendChild(div);
  });
  return container;
}

function taskGrammar(num) {
  let task = "";
  if (num === 1) {
    task = "task is";
  } else {
    task = "tasks are";
  }
  return task;
}

function generateStatsDiv(projectObject) {
  const container = document.createElement("div");
  container.classList.add("project-overview");
  const titleDiv = document.createElement("h3");
  titleDiv.classList.add("overview-title");
  titleDiv.textContent = projectObject.projectTag;
  const projectStats = getProjectStats(projectObject.tdList);

  const completeness = document.createElement("p");
  completeness.textContent = `${projectStats.numCompleted} / ${projectStats.numTds} tasks completed`;

  const q1 = document.createElement("p");
  const task1 = taskGrammar(projectStats.numQ1);
  q1.textContent = `${projectStats.numQ1}  ${task1} urgent and important.`;

  const q2 = document.createElement("p");
  const task2 = taskGrammar(projectStats.numQ2);
  q2.textContent = `${projectStats.numQ2} ${task2} not urgent and important.`;

  const q3 = document.createElement("p");
  const task3 = taskGrammar(projectStats.numQ3);
  q3.textContent = `${projectStats.numQ3} ${task3} urgent and unimportant.`;

  const q4 = document.createElement("p");
  const task4 = taskGrammar(projectStats.numQ4);
  q4.textContent = `${projectStats.numQ4} ${task4} not urgent and unimportant.`;

  container.appendChild(titleDiv);
  container.appendChild(completeness);
  container.appendChild(q1);
  container.appendChild(q2);
  container.appendChild(q3);
  container.appendChild(q4);

  return container;
}

function generateProjectButtons(tdList) {
  const PBContainer = document.getElementById("PBContainer");
  const projectTagList = createProjectTagList(tdList);
  projectTagList.forEach((tag) => {
    const btn = document.createElement("button");
    btn.classList.add("button");
    btn.classList.add("project-btn");
    btn.textContent = tag;
    PBContainer.appendChild(btn);
  });
}

function generateProjectHeader(title) {
  const pHeader = document.createElement("h2");
  pHeader.classList.add("pHeader");
  pHeader.textContent = title;
  return pHeader;
}

function generateTdListDisplay(tdList) {
  const container = document.createElement("div");
  container.classList.add("list-display");
  container.classList.add("tdList-container");
  tdList.forEach((element) => {
    const td = createTodoDiv(element);
    container.appendChild(td);
  });
  return container;
}

function generateTdQuadDisplay(quadLists) {
  const container = document.createElement("div");
  container.classList.add("quad-display");
  container.classList.add("quad-container");
  for (let i = 1; i < 5; i++) {
    const newQuad = createQuadContainer(quadLists[i - 1]);
    newQuad.classList.add(`quad${i}`);
    container.appendChild(newQuad);
  }

  const urgent = document.createElement("div");
  urgent.classList.add("quad-grid-label");
  urgent.classList.add("urgent");
  urgent.textContent = "URGENT";
  container.appendChild(urgent);

  const later = document.createElement("div");
  later.classList.add("quad-grid-label");
  later.classList.add("later");
  later.textContent = "NOT URGENT";
  container.appendChild(later);

  const important = document.createElement("div");
  important.classList.add("quad-grid-label");
  important.classList.add("rotate");
  important.classList.add("important");
  important.textContent = "IMPORTANT";
  container.appendChild(important);

  const unimportant = document.createElement("div");
  unimportant.classList.add("quad-grid-label");
  unimportant.classList.add("rotate");
  unimportant.classList.add("unimportant");
  unimportant.textContent = " NOT IMPORTANT";
  container.appendChild(unimportant);

  return container;
}

function createQuadContainer(list) {
  const quadContainer = document.createElement("div");
  quadContainer.classList.add("tdList-container");
  list.forEach((element) => {
    const td = createTodoDiv(element);
    quadContainer.appendChild(td);
  });
  return quadContainer;
}
// Helper Functions

function createTodoDiv(tdObject) {
  // Create container Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.setAttribute("data-index", tdObject["data-index"]);
  // create checkbox img/div with src controlled by css
  const statusBox = document.createElement("img");
  statusBox.classList.add("checkbox");
  statusBox.src = "../src/Images/unchecked-box.png";
  statusBox.setAttribute("alt", "checkbox");
  // create title div/button to expand
  const todoTitle = document.createElement("div");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = tdObject.title;
  // create dueDate div
  const dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("dueDate-div");
  dueDateDiv.textContent = tdObject.dueDate;
  // create Priority div
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("priority-div");
  priorityDiv.textContent = tdObject.priority;
  priorityDiv.style.color = getPriorityColor(tdObject);
  // create info button
  const infoBtn = document.createElement("button");
  infoBtn.classList.add("info");
  infoBtn.onclick = () => showInfo(tdObject);
  infoBtn.textContent = "Info";
  // create edit button
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.onclick = () => openTdEditor(tdObject);
  const editBtnImg = document.createElement("img");
  editBtnImg.src = "../src/Images/pencil.png";
  editBtnImg.setAttribute("onerror", "this.onerror=null;this.src = ./Images/pencil.png");
  editBtnImg.setAttribute("alt", "edit");
  editBtn.appendChild(editBtnImg);

  // create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = () => setDeleteTdIndex(tdObject);
  const deleteBtnImg = document.createElement("img");
  deleteBtnImg.src = "../src/Images/delete.png";
  deleteBtnImg.setAttribute("alt", "delete");
  deleteBtn.appendChild(deleteBtnImg);
  // append elements to container
  todoDiv.appendChild(statusBox);
  todoDiv.appendChild(todoTitle);
  todoDiv.appendChild(dueDateDiv);
  todoDiv.appendChild(priorityDiv);
  todoDiv.appendChild(infoBtn);
  todoDiv.appendChild(editBtn);
  todoDiv.appendChild(deleteBtn);

  return todoDiv;
}

function setTodoStatusImage(tdDiv, tdList) {
  const tdIndex = tdDiv.getAttribute("data-index");
  const currentStatus = tdList[tdIndex].status;
  if (currentStatus === "incomplete") {
    tdDiv.classList.remove("complete");
    tdDiv.firstChild.src = "../src/Images/unchecked-box.png";
  } else if (currentStatus === "complete") {
    tdDiv.classList.add("complete");
    tdDiv.firstChild.src = "../src/Images/checked-checkbox.png";
  }
}

function getPriorityColor(todoObject) {
  const { priority } = todoObject;
  if (priority === "High") {
    return "red";
  }
  if (priority === "Medium") {
    return "blue";
  }
  if (priority === "Low") {
    return "black";
  }
  return "grey";
}

const editTodoDialog = document.getElementById("editToDoDialog");

function openTdEditor(tdObject) {
  const tdIndex = tdObject["data-index"];
  editTodoDialog.showModal();
  document.getElementById("editTdIndex").value = tdIndex;
  return tdObject;
}

function setDeleteTdIndex(tdObject) {
  const tdIndex = tdObject["data-index"];
  document.getElementById("deleteTDIndex").value = tdIndex;
}

const infoDialog = document.getElementById("tdInfoDialog");
const infoContent = document.getElementById("expandedInfo");
function showInfo(tdObject) {
  infoContent.textContent = tdObject.description;
  infoDialog.showModal();
}

// Exports

export { generateTdListDisplay, generateProjectHeader, createTodoDiv, setTodoStatusImage, generateTdQuadDisplay, generateProjectButtons, generateProjectOverviewsDisplay, generateQuadDateSelector };
