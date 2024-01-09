//Imports
import _, { format } from "date-fns";

//Constuctor functions

function Todo(title, description, dueDate, priority, notes, projectTag) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDateFormat(dueDate);
  this.priority = priority;
  this.todos = [];
  this.notes = notes;
  this.projectTag = projectTag;
  this.status = "";
}

function Project(projectTag, tdList) {
  this.projectTag = projectTag;
  let list = tdList.filter((td) => td.projectTag === projectTag);
  this.tdList = list;
}

function User(name, avatar) {
  this.name = name;
  this.avatar = avatar;
}

//Helper functions
function dueDateFormat(dueDate) {
  if (dueDate === "") {
    return format(new Date().toLocaleString(), "M-dd-y");
  } else {
    return format(new Date(dueDate).toLocaleString(), "M-dd-y");
  }
}

export { Todo, User, Project };
