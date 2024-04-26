// Imports
import _, { format, isBefore, addDays, subDays } from "date-fns";
import { Project } from "./constructors";

function deleteTodo(tdTitle, tdList) {
  // Remove from main list
  const tdIndex = tdList.findIndex((tdObject) => tdObject.title === tdTitle);
  tdList.splice(tdIndex, 1);
  tdList.sort((a, b) => a.dueDate - b.dueDate);
  // Remove from main display
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
  const todayList = tdList.filter((td) => td.dueDate === format(new Date(), "M-dd-y") && td.projectTag !== "Daily");
  return todayList;
}

function createThisWeekList(tdList) {
  const thisWeekList = tdList.filter((td) => td.dueDate >= format(new Date(), "M-dd-y") && td.dueDate <= format(addDays(new Date(), 7), "M-dd-y") && td.projectTag !== "Daily");
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
    if (newProject !== "Daily" && newProject !== "" && !projectTagList.includes(newProject)) {
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
  const quad1 = tdList.filter((td) => td.priority === "High" && td.dueDate <= format(urgencyDate, "M-dd-y"));
  const quad2 = tdList.filter((td) => (td.priority === "High" && td.dueDate > format(urgencyDate, "M-dd-y")) || (td.priority === "Medium" && td.dueDate <= format(urgencyDate, "M-dd-y")));
  const quad3 = tdList.filter((td) => (td.priority === "Low" && td.dueDate <= format(urgencyDate, "M-dd-y")) || (td.priority === "Medium" && td.dueDate > format(urgencyDate, "M-dd-y")));
  const quad4 = tdList.filter((td) => td.priority === "Low" && td.dueDate > format(urgencyDate, "M-dd-y"));
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
