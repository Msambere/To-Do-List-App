// Imports
import _, {addDays} from "date-fns";
import { Todo} from "./constructors";

// Hardcode for testing
const mainTodoList = [];

hardCodeTDs("Create user constructor","Create a function that will store user information like id and avatar","01-25-2024","High","test notes","To-do App",);
hardCodeTDs("Look up data-fns library","See what functions are available","12-29-2023","High","","To-do App",);
hardCodeTDs("Go to the gym","Complete the daily workout","","High", "","Daily",);
hardCodeTDs("tester1", "checking fn", "04-11-1989", "Low", "", "Test 1");
hardCodeTDs("tester2", "checking fn", "05-18-2020", "Medium", "", "Test 2");
hardCodeTDs("Always today", "always today", new Date(), "Low", "", "Test 1");
hardCodeTDs("Today plus 2","checking fn", addDays(new Date(), 2),"High","","Test 2",);
hardCodeTDs("Today plus 5","checking fn", addDays(new Date(), 5),"Medium","","Test 3",);
hardCodeTDs("read the newspaper","Complete the daily workout","","Medium","","Daily",);
hardCodeTDs("Buy a yacht","Complete the daily workout","","Low","","Daily",);

// Functions
function hardCodeTDs(title, descript, dueDate, priority, todos, notes, projectTag,) {
  const newTodo = new Todo(title, descript, dueDate, priority, todos, notes, projectTag,);
  mainTodoList.push(newTodo);
  mainTodoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  indexList(mainTodoList);
  return mainTodoList;
}

function indexList(tdList) {
  tdList.forEach((tdObject) => {
    tdObject["data-index"] = tdList.findIndex(
      (td) => td.title === tdObject.title,
    );
  });
}

export {mainTodoList}
