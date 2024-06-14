// Imports
import _, {addDays} from "date-fns";
import { Todo} from "./constructors";

// Hardcode for testing
const mainTodoList = [];

hardCodeTDs("Always Quad 1","must clear local storage to update",addDays(new Date(), 1),"High","To-do App",);
hardCodeTDs("Always Quad 2 bc of priority","must clear local storage to update",addDays(new Date(), 15),"High","To-do App",);
hardCodeTDs("Always Quad 2 bc of date","must clear local storage to update",addDays(new Date(), 4),"Medium","To-do App",);
hardCodeTDs("Always Quad 3 bc of date","must clear local storage to update",addDays(new Date(), 6),"Low","To-do App",);
hardCodeTDs("Always Quad 3 bc of priority","must clear local storage to update",addDays(new Date(), 15),"Medium","To-do App",);
hardCodeTDs("Go to the gym","populate daily list","","High", "Daily",);
hardCodeTDs("tester1", "checking fn", "04-11-1989", "Low", "Test 1");
hardCodeTDs("tester2", "checking fn", "05-18-2020", "Medium", "Test 2");
hardCodeTDs("Always today", "must clear local storage to update", new Date(), "Low", "Test 1");
hardCodeTDs("Today plus 2","must clear local storage to update", addDays(new Date(), 2),"High","Test 2",);
hardCodeTDs("Today plus 5","must clear local storage to update", addDays(new Date(), 5),"Medium","Test 3",);
hardCodeTDs("read the newspaper","populate daily list","","Medium","Daily",);
hardCodeTDs("Always Quad 4","must clear local storage to update",addDays(new Date(), 20),"Low","Test 1",);
// Functions
function indexList(tdList) {
  tdList.forEach((tdObject) => {
    tdObject["data-index"] = tdList.findIndex(
      (td) => td.title === tdObject.title,
    );
  });
}

function hardCodeTDs(title, descript, dueDate, priority, projectTag,) {
  const newTodo = new Todo(title, descript, dueDate, priority, projectTag);
  mainTodoList.push(newTodo);
  mainTodoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  indexList(mainTodoList);
  return mainTodoList;
}



export {mainTodoList}
