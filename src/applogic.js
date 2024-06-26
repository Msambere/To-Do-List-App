// Imports
import _, { format, isBefore, addDays, subDays } from "date-fns";
import { Todo, User, Project } from "./constructors";

// Testing Hardcode
const mainTodoList = [];

hardCodeTDs(
  "Create user constructor",
  "Create a function that will store user information like id and avatar",
  "01-25-2024",
  "High",
  "test notes",
  "To-do App",
);
hardCodeTDs(
  "Look up data-fns library",
  "See what functions are available",
  "12-29-2023",
  "High",
  "",
  "To-do App",
);
hardCodeTDs(
  "Go to the gym",
  "Complete the daily workout",
  "",
  "High",
  "",
  "Daily",
);
hardCodeTDs("tester1", "checking fn", "04-11-1989", "Low", "", "Test 1");
hardCodeTDs("tester2", "checking fn", "05-18-2020", "Medium", "", "Test 2");
hardCodeTDs("Always today", "always today", new Date(), "Low", "", "Test 1");
hardCodeTDs(
  "Today plus 2",
  "checking fn",
  addDays(new Date(), 2),
  "High",
  "",
  "Test 2",
);
hardCodeTDs(
  "Today plus 5",
  "checking fn",
  addDays(new Date(), 5),
  "Medium",
  "",
  "Test 3",
);
hardCodeTDs(
  "read the newspaper",
  "Complete the daily workout",
  "",
  "Medium",
  "",
  "Daily",
);
hardCodeTDs(
  "Buy a yacht",
  "Complete the daily workout",
  "",
  "Low",
  "",
  "Daily",
);

// Functions
function hardCodeTDs( title, descript, dueDate, priority, todos, notes, projectTag,) {
  const newTodo = new Todo(title, descript, dueDate, priority, todos, notes, projectTag,);
  mainTodoList.push(newTodo);
  mainTodoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  indexList(mainTodoList);
  return mainTodoList;
}

function deleteTodo(tdTitle, tdList) {
  // Remove from main list
  const tdIndex = tdList.findIndex((tdObject) => tdObject.title === tdTitle);
  tdList.splice(tdIndex, 1);
  tdList.sort((a, b) => a.dueDate - b.dueDate);
  // Remove from main display
}

function createOverDueList(tdList) {
  const overdueList = tdList.filter((td) =>
    isBefore(td.dueDate, subDays(new Date(), 1)),
  );
  return overdueList;
}

function checkIfOverdue(tdObject) {
  return isBefore(tdObject.dueDate, subDays(new Date(), 1));
}

function addOverdueClass(tdList) {
  const overdueList = [];
  tdList.forEach((tdObject) => {
    if (checkIfOverdue(tdObject)) {
      overdueList.push(tdObject["data-index"].toString());
    }
  });
  const divList = document.querySelectorAll(".todo");
  divList.forEach((div) => {
    const tdIndex = div.getAttribute("data-index");
    if (overdueList.includes(tdIndex)) {
      div.classList.add("overdue");
    }
  });
}

function indexList(tdList) {
  tdList.forEach((tdObject) => {
    tdObject["data-index"] = tdList.findIndex((td) => td.title === tdObject.title);
  });
}

function createTodayList(tdList) {
  const todayList = tdList.filter(
    (td) =>
      td.dueDate === format(new Date(), "M-dd-y") && td.projectTag !== "Daily",
  );
  return todayList;
}

function createThisWeekList(tdList) {
  const thisWeekList = tdList.filter(
    (td) =>
      td.dueDate >= format(new Date(), "M-dd-y") &&
      td.dueDate <= format(addDays(new Date(), 7), "M-dd-y") &&
      td.projectTag !== "Daily",
  );
  return thisWeekList;
}

function createDailyList(tdList) {
  const dailyList = tdList.filter((td) => td.projectTag === "Daily");
  return dailyList;
}

function createProjectTagList(tdList) {
  const projectTagList = [];
  tdList.forEach((tdObject) => {
    const newProject = tdObject.projectTag;
    if (
      newProject !== "Daily" &&
      newProject !== "" &&
      !projectTagList.includes(newProject)
    ) {
      projectTagList.push(newProject);
    }
  });
  return projectTagList;
}

function createProjectList(tdList, projectTag) {
  const projectList = tdList.filter((td) => td.projectTag === projectTag);
  return projectList;
}

function createProjectTDLists(tdList) {
  const projectTagList = createProjectTagList(tdList);
  const projectTdLists = [];
  projectTagList.forEach((projectTag) => {
    const currentProject = new Project(projectTag, tdList);
    projectTdLists.push(currentProject);
  });
  return projectTdLists;
}

function createQuadLists(tdList) {
  const urgencyDate = addDays(new Date(), 10);
  const quad1 = tdList.filter(
    (td) =>
      td.priority === "High" && td.dueDate <= format(urgencyDate, "M-dd-y"),
  );
  const quad2 = tdList.filter(
    (td) =>
      (td.priority === "High" && td.dueDate > format(urgencyDate, "M-dd-y")) ||
      (td.priority === "Medium" && td.dueDate > format(urgencyDate, "M-dd-y")),
  );
  const quad3 = tdList.filter(
    (td) =>
      (td.priority === "Low" && td.dueDate <= format(urgencyDate, "M-dd-y")) ||
      (td.priority === "Medium" && td.dueDate <= format(urgencyDate, "M-dd-y")),
  );
  const quad4 = tdList.filter(
    (td) => td.priority === "Low" && td.dueDate > format(urgencyDate, "M-dd-y"),
  );
  const quadLists = [quad1, quad2, quad3, quad4];
  return quadLists;
}

function getProjectStats(projectList) {
  const completedTds = projectList.filter((td) => td.status === "complete");
  const numCompleted = completedTds.length;
  const numTds = projectList.length;
  const quadLists = createQuadLists(projectList);
  const numQ1 = quadLists[0].length;
  const numQ2 = quadLists[1].length;
  const numQ3 = quadLists[2].length;
  const numQ4 = quadLists[3].length;
  return { numTds, numCompleted, numQ1, numQ2, numQ3, numQ4 };
}
// exports

export {
  mainTodoList,
  createTodayList,
  createThisWeekList,
  createDailyList,
  deleteTodo,
  indexList,
  addOverdueClass,
  createQuadLists,
  createProjectTagList,
  createProjectList,
  getProjectStats,
  createProjectTDLists,
};
