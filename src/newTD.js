import { mainTodoList, indexList } from "./applogic";
import { Todo } from "./constructors";
import { format, addDays } from "date-fns";
import { createProjectTagList } from "./applogic";


//New Todo
function createNewTodoForm(){
    const dialog= document.createElement('dialog');
    dialog.classList.add('modal');
    dialog.setAttribute('id','newTodoDialog');
    
    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');
    form.setAttribute('id', 'myForm')

    const titleRow =createFormRow('td-title', 'Title of Todo', 'text');
    const descriptRow = createFormRow('td-description', 'Description of Todo', 'text');
    const dateRow= createFormRow('td-dueDate', 'Due Date:', 'date');
    const priorityRow = createSelectFormRow('td-priority', 'Priority', ['High','Medium','Low']);
    const projectRow = createSelectFormRow('td-projectTag', 'Project', createProjectTagList(mainTodoList));

    const btnContainer = document.createElement('div')
    btnContainer.classList.add('form-buttons');

    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('id', 'cancelBtn');
    cancelBtn.setAttribute('value', 'cancel');
    cancelBtn.setAttribute('formmethod', 'dialog');
    cancelBtn.textContent = 'Cancel';

    const confirmBtn = document.createElement('button');
    confirmBtn.setAttribute('id', 'confirmBtn');
    confirmBtn.setAttribute('value', 'default');
    confirmBtn.textContent = "Confirm"
       
    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(confirmBtn);
    form.appendChild(titleRow);
    form.appendChild(descriptRow);
    form.appendChild(dateRow);
    form.appendChild(priorityRow);
    form.appendChild(projectRow);
    form.appendChild(btnContainer);
    dialog.appendChild(form);
    return dialog;
};


function addNewTodo(){
  let tdTitle = document.getElementById('td-title').value;
  let tddescript = document.getElementById('td-description').value;
  let tddueDate = format(addDays(document.getElementById('td-dueDate').value, 1), 'M-dd-y');
  let tdpriority = document.getElementById('td-priority').value;
  let tdprojectTag = document.getElementById('td-projectTag').value
  let newTodo = new Todo(tdTitle, tddescript, tddueDate, tdpriority, [], '', tdprojectTag);
  mainTodoList.push(newTodo);
  mainTodoList.sort((a,b)=> new Date(a.dueDate)-new Date(b.dueDate));
  indexList(mainTodoList);
  return newTodo;
};

function addNestedTodo(index, title, description, dueDate, priority, todos, notes, projectTag){
  let nestedTodo = new Todo(title, description, dueDate, priority, todos, notes, projectTag);
  let nestedTdList = mainTodoList[index]['todos'];
  nestedTdList.push(nestedTodo);
  //tdObject.todos.sort((a,b)=>a.dueDate-b.dueDate);
};



//helper functions
function createFormRow(id, title, iType){
  const formRow = document.createElement('div');
  formRow.classList.add("form-row");

  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent= title;

  const input = document.createElement('input');
  input.setAttribute('type', iType);
  input.setAttribute('name', id);
  input.setAttribute('id', id);

  formRow.appendChild(label);
  formRow.appendChild(input);
  return formRow;
};

function createSelectFormRow(id, title, optionsList ){
  const formRow = document.createElement('div');
  formRow.classList.add("form-row");

  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent= title;

  const select = document.createElement('select');
  select.setAttribute('id', id);
  select.setAttribute('name', id);

  optionsList.forEach((option) => {
    let currentOption = document.createElement('option');
    currentOption.textContent = option;
    select.appendChild(currentOption);
  });

  formRow.appendChild(label);
  formRow.appendChild(select);
  return formRow;
};





export {createNewTodoForm, addNewTodo};