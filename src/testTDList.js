// Imports
import _, {addDays} from "date-fns";
import { Todo} from "./constructors";

// Hardcode for testing
const mainTodoList = [];

hardCodeTDs("Always Quad 1","check view",addDays(new Date(), 1),"High","To-do App",);
hardCodeTDs("Always Quad 2 bc of priority","check view",addDays(new Date(), 15),"High","To-do App",);
hardCodeTDs("Always Quad 2 bc of date","check view",addDays(new Date(), 4),"Medium","To-do App",);
hardCodeTDs("Always Quad 3 bc of date","check view",addDays(new Date(), 6),"Low","To-do App",);
hardCodeTDs("Always Quad 3 bc of priority","check view",addDays(new Date(), 15),"Medium","To-do App",);
hardCodeTDs("Go to the gym","Complete the daily workout","","High", "Daily",);
hardCodeTDs("tester1", "checking fn", "04-11-1989", "Low", "Test 1");
hardCodeTDs("tester2", "checking fn", "05-18-2020", "Medium", "Test 2");
hardCodeTDs("Always today", "always today", new Date(), "Low", "Test 1");
hardCodeTDs("Today plus 2","checking fn", addDays(new Date(), 2),"High","Test 2",);
hardCodeTDs("Today plus 5","checking fn", addDays(new Date(), 5),"Medium","Test 3",);
hardCodeTDs("read the newspaper","populate daily list","","Medium","Daily",);
hardCodeTDs("Always Quad 4","should be there",addDays(new Date(), 20),"Low","Test 1",);
// Functions
function hardCodeTDs(title, descript, dueDate, priority, projectTag,) {
  const newTodo = new Todo(title, descript, dueDate, priority, projectTag,);
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
