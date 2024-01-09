import { createNewTodoForm } from "./newTD";
import { editTodoForm } from "./editTD";

const content = document.getElementById("content");

// Header

function createHeader() {
  const header = document.createElement("div");
  header.classList.add("header");

  const logoTitleBox = document.createElement("div");
  logoTitleBox.classList.add("ltbox");

  const logo = document.createElement("img");
  logo.classList.add("logo");
  logo.src = "../src/Images/logo.png";

  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "Check-It";

  const headerRight = document.createElement("div");
  headerRight.classList.add("header-right");

  const userDisplay = document.createElement("div");
  userDisplay.classList.add("userDisplay");
  userDisplay.textContent = "User name and avatar go here";

  const displayToggleBox = document.createElement("label");
  displayToggleBox.classList.add("toggle-box");
  const toggleBtn = document.createElement("input");
  toggleBtn.setAttribute("type", "checkbox");
  toggleBtn.setAttribute("id", "toggle-checkbox");
  const toggleCircle = document.createElement("div");
  toggleCircle.classList.add("circle");

  displayToggleBox.appendChild(toggleBtn);
  displayToggleBox.appendChild(toggleCircle);
  headerRight.appendChild(userDisplay);
  headerRight.appendChild(displayToggleBox);

  logoTitleBox.appendChild(logo);
  logoTitleBox.appendChild(title);
  header.appendChild(logoTitleBox);
  header.appendChild(headerRight);
  return header;
}

// Nav Bar

function createNavBar() {
  const navBar = document.createElement("div");
  navBar.classList.add("navBar");

  const todayBtn = document.createElement("button");
  todayBtn.classList.add("button");
  todayBtn.classList.add("navBtn");
  todayBtn.setAttribute("id", "todayBtn");
  todayBtn.textContent = "Today";

  const weekBtn = document.createElement("button");
  weekBtn.classList.add("button");
  weekBtn.classList.add("navBtn");
  weekBtn.setAttribute("id", "weekly");
  weekBtn.textContent = "This Week";

  const allBtn = document.createElement("button");
  allBtn.classList.add("button");
  allBtn.classList.add("navBtn");
  allBtn.setAttribute("id", "all");
  allBtn.textContent = "All Tasks";

  const dailyBtn = document.createElement("button");
  dailyBtn.classList.add("button");
  dailyBtn.classList.add("navBtn");
  dailyBtn.setAttribute("id", "daily");
  dailyBtn.textContent = "Daily Tasks";

  const projectBtn = document.createElement("button");
  projectBtn.classList.add("button");
  projectBtn.classList.add("navBtn");
  projectBtn.setAttribute("id", "projects");
  projectBtn.textContent = "Projects";

  const newTD = document.createElement("button");
  newTD.classList.add("button");
  newTD.classList.add("navBtn");
  newTD.setAttribute("id", "new-todo-btn");
  newTD.textContent = "+ Add New Todo";

  navBar.appendChild(todayBtn);
  navBar.appendChild(weekBtn);
  navBar.appendChild(allBtn);
  navBar.appendChild(dailyBtn);
  navBar.appendChild(projectBtn);
  navBar.appendChild(newTD);
  return navBar;
}

// Main Div
function createMainDiv() {
  const main = document.createElement("div");
  main.classList.add("main");
  main.setAttribute("id", "main");
  return main;
}

// Footer
function createFooter() {
  const footer = document.createElement("div");
  footer.classList.add("footer");
  footer.textContent = "made by Msambere";
  return footer;
}

function createSite() {
  content.appendChild(createHeader());
  content.appendChild(createNavBar());
  content.appendChild(createMainDiv());
  content.appendChild(createFooter());
  content.appendChild(createNewTodoForm());
  content.appendChild(editTodoForm());
}

export { createSite };
