// Imports
import { mainTodoList } from "./testTDList";
import createSite from "./siteConstants";
import { createDailyList, createThisWeekList, createTodayList, deleteTodo, addOverdueClass, createQuadLists, createProjectList } from "./listManagment";
import { generateTdListDisplay, generateProjectHeader, createTodoDiv, setTodoStatusImage, generateTdQuadDisplay, generateProjectButtons, generateProjectOverviewsDisplay } from "./sitedynamic";
import { addNewTodo } from "./newTD";
import { editTodoProperty, changeCompleteProperty } from "./editTD";

// Setting Local Storage
let currentTodoList = [];
function retrieveTdList() {
  const tdListRet = localStorage.getItem("tdList");
  currentTodoList = JSON.parse(tdListRet);
}

function storeTdList(tdList) {
  localStorage.setItem("tdList", JSON.stringify(tdList));
  retrieveTdList();
}

// Site initialization
if (localStorage.getItem("tdList")) {
  retrieveTdList();
} else {
  localStorage.setItem("tdList", JSON.stringify(mainTodoList));
  retrieveTdList();
}
const allTasksBtn = document.getElementById("all");
allTasksBtn.classList.toggle("active");
createSite(currentTodoList);
const main = document.getElementById("main");
activateAllBtns();
const tdDivList = document.querySelectorAll(".todo");
tdDivList.forEach((div) => {
  setTodoStatusImage(div, currentTodoList);
});

// Set up Display button
const circle = document.querySelector(".circle");

circle.addEventListener("click", () => {
  switchDisplayMode();
  if (main.classList.contains("quad")) {
    circle.style.transform = "translateX(35px)";
  } else {
    circle.style.transform = "translateX(0px)";
  }
});

// DRY Button logic
const navBtns = document.querySelectorAll(".navBtn");
navBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    clearDomDisplay();
    toggleNavBtns(event);
    refreshDisplay();
  });
});

const projectNavBtn = document.getElementById("projects");
const PBContainer = document.getElementById("PBContainer");
projectNavBtn.addEventListener("click", (event) => {
  if (!PBContainer.firstChild) {
    toggleNavBtns(event);
    generateProjectButtons(currentTodoList);
    clearDomDisplay();
    main.appendChild(generateProjectHeader("All Projects"));
    main.appendChild(generateProjectOverviewsDisplay(currentTodoList));
    activateAllBtns();
    const projectBtns = document.querySelectorAll(".project-btn");
    projectBtns.forEach((btn) =>
      btn.addEventListener("click", (event) => {
        clearDomDisplay();
        toggleNavBtns(event);
        refreshDisplay();
        projectBtns.forEach((btn) => btn.remove());
      }),
    );
  } else {
    const projectBtns = document.querySelectorAll(".project-btn");
    projectBtns.forEach((btn) => btn.remove());
    const projectTab = document.querySelector("#projects");
    console.log(projectTab);
    projectTab.classList.toggle("active");
    const btn = document.querySelector(".default-display");
    console.log("Before", btn);
    btn.classList.toggle("active");
    console.log("After", btn);
    clearDomDisplay();
    refreshDisplay();
  }
});

const newTDBtn = document.getElementById("new-todo-btn");
const newTodoDialog = document.getElementById("newToDoDialog");
const myForm = document.getElementById("myForm");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

newTDBtn.addEventListener("click", () => {
  newTDBtn.classList.toggle("clicked");
  newTodoDialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const newTdObject = addNewTodo(currentTodoList);
  displayNewTdDiv(newTdObject);
  activateAllBtns();
  myForm.reset();
  newTodoDialog.close();
  storeTdList(currentTodoList);
  addOverdueClass(currentTodoList);
});

cancelBtn.addEventListener("click", () => {
  document.getElementById("myForm").reset();
  newTodoDialog.close();
});

// Helper functions

function switchDisplayMode() {
  main.classList.toggle("quad");
  clearDomDisplay();
  refreshDisplay();
}

function displayNewTdDiv(tdObject) {
  const newDiv = createTodoDiv(tdObject);
  const tdIndex = currentTodoList.findIndex((element) => element.title === tdObject.title);
  const divList = document.querySelectorAll(".todo");
  if (tdIndex !== 0) {
    const siblingTitle = currentTodoList[tdIndex - 1].title;
    divList.forEach((div) => {
      if (div.textContent.includes(siblingTitle)) {
        div.after(newDiv);
      }
    });
  } else {
    const secondTitle = currentTodoList[1].title;
    divList.forEach((div) => {
      if (div.textContent.includes(secondTitle)) {
        div.before(newDiv);
      }
    });
  }
}

function activateAllBtns() {
  activateCheckBoxes();
  activateDeleteBtns();
  activateEditBtns();
}

function activateDeleteBtns() {
  const deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((Btn) => Btn.addEventListener("click", (event) => deleteTdDiv(event)));
}

function activateCheckBoxes() {
  const checkBoxes = document.querySelectorAll(".checkbox");
  checkBoxes.forEach((box) => box.addEventListener("click", (event) => toggleComplete(event)));
}

function activateEditBtns() {
  const editTdBtns = document.querySelectorAll(".edit");
  const editTodoDialog = document.getElementById("editToDoDialog");
  const editForm = document.getElementById("editForm");
  const editCancelBtn = document.querySelector("#editCancelBtn");
  const editConfirmBtn = document.querySelector("#editConfirmBtn");

  editTdBtns.forEach((Btn) =>
    Btn.addEventListener("click", (event) => {
      const tdTitle = event.target.parentElement.firstChild.nextSibling.textContent;
      const tdIndex = currentTodoList.findIndex((tdObject) => tdObject.title === tdTitle);
      console.log(tdTitle, " ", tdIndex);
      editTodoDialog.showModal();
      editConfirmBtn.addEventListener("click", (event) => {
        event.preventDefault();
        editTodoProperty(tdIndex, currentTodoList);
        currentTodoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        editForm.reset();
        console.log(editForm.elements);
        editTodoDialog.close();
        storeTdList(currentTodoList);
        clearDomDisplay();
        refreshDisplay();
      });
      editCancelBtn.addEventListener("click", () => {
        document.getElementById("editForm").reset();
        editTodoDialog.close();
      });
    }),
  );
}

function toggleComplete(event) {
  const tdDiv = event.target.parentElement;
  const tdIndex = tdDiv.getAttribute("data-index");
  changeCompleteProperty(tdIndex, currentTodoList);
  setTodoStatusImage(tdDiv, currentTodoList);
  storeTdList(currentTodoList);
}

function deleteTdDiv(event) {
  const tdTitle = event.target.parentElement.firstChild.nextSibling.textContent;
  deleteTodo(tdTitle, currentTodoList);
  const tdDiv = event.target.parentElement;
  tdDiv.remove();
  storeTdList(currentTodoList);
}

function toggleNavBtns(event) {
  if (event.target.textContent == "+ Add New Todo") {
    return;
  }
  const oldBtn = document.querySelectorAll(".active");
  oldBtn.forEach((element) => element.classList.toggle("active"));
  const btn = event.target;
  btn.classList.toggle("active");
}

function clearDomDisplay() {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

function refreshDisplay() {
  const currentTab = document.querySelector(".active");
  const header = currentTab.textContent;
  let content = "";
  switch (header) {
    case "Today":
      content = createTodayList(currentTodoList);
      break;
    case "This Week":
      content = createThisWeekList(currentTodoList);
      break;
    case "All Tasks":
      content = currentTodoList;
      break;
    case "Daily Tasks":
      content = createDailyList(currentTodoList);
      break;
    case "+ Add New Todo":
      break;
    default: // for project tabs
      content = createProjectList(currentTodoList, header);
      break;
  }
  main.appendChild(generateProjectHeader(header));
  if (main.classList.contains("quad")) {
    main.appendChild(generateTdQuadDisplay(createQuadLists(content)));
    addOverdueClass(currentTodoList);
  } else {
    main.appendChild(generateTdListDisplay(content));
    addOverdueClass(currentTodoList);
  }
  activateAllBtns();
  const tdDivList = document.querySelectorAll(".todo");
  tdDivList.forEach((div) => {
    setTodoStatusImage(div, currentTodoList);
  });
}
