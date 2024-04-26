// Imports
import _, { format } from "date-fns";

// Constuctor functions

function Todo(title, description, dueDate, priority, projectTag) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDateFormat(dueDate);
  this.priority = priority;
  this.projectTag = projectTag;
  this.status = "";
}

function Project(projectTag, tdList) {
  this.projectTag = projectTag;
  const list = tdList.filter((td) => td.projectTag === projectTag);
  this.tdList = list;
}

function User(name, avatar) {
  this.name = name;
  this.avatar = avatar;
}

// Helper functions
function dueDateFormat(dueDate) {
  if (dueDate === "") {
    return format(new Date().toLocaleString(), "M-dd-y");
  }
  return format(new Date(dueDate).toLocaleString(), "M-dd-y");
}

export { Todo, User, Project };
