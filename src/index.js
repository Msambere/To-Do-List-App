//Imports
import { createSite } from './siteConstants';
import { mainTodoList, createDailyList, createThisWeekList, createTodayList, deleteTodo, addOverdueClass, createQuadLists, createProjectList } from './applogic';
import { generateTdListDisplay, generateProjectHeader, createTodoDiv, setTodoStatusImage, generateTdQuadDisplay, generateProjectButtons, generateProjectOverviewsDisplay } from './sitedynamic';
import { addNewTodo } from './newTD';
import { editTodoProperty, changeCompleteProperty } from './editTD';
import { addDays } from 'date-fns';

//Site initialization
createSite();
const main = document.getElementById('main');
const allTasksBtn = document.getElementById('all');
allTasksBtn.classList.toggle('active');
initializeDisplay();

const toggleBox = document.querySelector(".toggle-box");
const circle = document.querySelector(".circle");
const checkbox = document.getElementById("toggle-checkbox");

circle.addEventListener('click', ()=>switchDisplayMode());

toggleBox.addEventListener('click', ()=>{
    if(checkbox.checked){
        circle.style.transform = "translateX(42px)";
        circle.style.backgroundColor = "#000";
        toggleBox.style.backgroundColor = "#fff";
    }else{
        circle.style.transform = "translateX(0px)";
        circle.style.backgroundColor = "#fff";
        toggleBox.style.backgroundColor = "#000";
    }
});



//Button logic
const todayBtn = document.getElementById('todayBtn');
todayBtn.addEventListener('click', (event) => {
    toggleNavBtns(event);
    clearDomDisplay();
    refreshDisplay();
});

const thisWeekBtn = document.getElementById('weekly');
thisWeekBtn.addEventListener('click', (event) => {
    clearDomDisplay();
    toggleNavBtns(event);
    refreshDisplay();
});

allTasksBtn.addEventListener('click', (event) => {
    clearDomDisplay();
    toggleNavBtns(event);
    refreshDisplay();
});

const dailyBtn = document.getElementById('daily');
dailyBtn.addEventListener('click', (event) => {
    clearDomDisplay();
    toggleNavBtns(event);
    refreshDisplay();
});

const projectNavBtn = document.getElementById('projects');
projectNavBtn.addEventListener('click', (event) => {
    toggleNavBtns(event);
    projectNavBtn.after(generateProjectButtons(mainTodoList));
    clearDomDisplay();
    main.appendChild(generateProjectHeader('All Projects'));
    main.appendChild(generateProjectOverviewsDisplay(mainTodoList));
    activateAllBtns();
    //add code for clearing DOM and showing project Overviews
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach((btn) => btn.addEventListener('click', (event)=>{
        clearDomDisplay();
        toggleNavBtns(event);
        refreshDisplay();
        projectBtns.forEach((btn)=>btn.remove())
    }));
});



const newTDBtn = document.getElementById('new-todo-btn');
const newTodoDialog = document.getElementById('newTodoDialog');
const cancelBtn = newTodoDialog.querySelector('#cancelBtn');
const confirmBtn = newTodoDialog.querySelector("#confirmBtn");

newTDBtn.addEventListener("click", () => {
    newTDBtn.classList.toggle('clicked');
    newTodoDialog.showModal();
})

confirmBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let newTdObject = addNewTodo();
    displayNewTdDiv(newTdObject);
    activateAllBtns();
    document.getElementById('myForm').reset();
    newTodoDialog.close();
});

cancelBtn.addEventListener('click', () => {
    document.getElementById('myForm').reset();
    newTodoDialog.close();
});







//Helper functions

function switchDisplayMode(){
    main.classList.toggle('quad');
    clearDomDisplay();
    refreshDisplay();
}



function displayNewTdDiv(tdObject) {
    let newDiv = createTodoDiv(tdObject);
    let tdIndex = mainTodoList.findIndex(element => element.title === tdObject.title);
    let divList = document.querySelectorAll('.todo')
    if (tdIndex != 0) {
        let siblingTitle = mainTodoList[tdIndex - 1].title;
        divList.forEach((div) => {
            if (div.textContent.includes(siblingTitle)) {
                div.after(newDiv);
            };
        });
    } else {
        let secondTitle = mainTodoList[1].title;
        divList.forEach((div) => {
            if (div.textContent.includes(secondTitle)) {
                div.before(newDiv);
            };
        });
    };
}


function activateAllBtns(){
    activateCheckBoxes();
    activateDeleteBtns();
    activateEditBtns();
};

function activateDeleteBtns() {
    const deleteBtns = document.querySelectorAll('.delete')
    deleteBtns.forEach((Btn) => Btn.addEventListener('click', (event) => deleteTdDiv(event)));
};

function activateCheckBoxes(){
    const checkBoxes = document.querySelectorAll('.checkbox');
    checkBoxes.forEach((box) => box.addEventListener('click', (event) => toggleComplete(event)));
};

function activateEditBtns(){
    const editTdBtns = document.querySelectorAll('.edit');
    const editTodoDialog = document.getElementById('editTodoDialog');
    const editCancelBtn = editTodoDialog.querySelector('#editCancelBtn');
    const editConfirmBtn = editTodoDialog.querySelector("#editConfirmBtn");

    editTdBtns.forEach((Btn) => Btn.addEventListener('click', (event) => {
        let tdTitle = (event.target.parentElement.firstChild.nextSibling.textContent);
        let tdIndex = mainTodoList.findIndex(tdObject => tdObject.title === tdTitle);
        editTodoDialog.showModal();
        editConfirmBtn.addEventListener('click', (event) => {
            event.preventDefault();
            editTodoProperty(tdIndex);
            mainTodoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            document.getElementById('editForm').reset();
            editTodoDialog.close();
            clearDomDisplay();
            refreshDisplay();
        });
        editCancelBtn.addEventListener('click', () => {
            document.getElementById('editForm').reset();
            editTodoDialog.close();
        });
    }));
}


function toggleComplete(event) {
    let tdDiv = event.target.parentElement;
    let tdIndex = tdDiv.getAttribute('data-index');
    let newStatus = changeCompleteProperty(tdIndex, mainTodoList);
    setTodoStatusImage(tdDiv, newStatus);  
};


function deleteTdDiv(event) {
    let tdTitle = (event.target.parentElement.firstChild.nextSibling.textContent);
    deleteTodo(tdTitle, mainTodoList);
    let tdDiv = event.target.parentElement;
    tdDiv.remove();
};

function toggleNavBtns(event) {
    let oldBtn = document.querySelectorAll('.active');
    oldBtn.forEach((element) => element.classList.toggle('active'))
    let btn = event.target;
    btn.classList.toggle('active');
};

function clearDomDisplay() {
    while(main.firstChild){
        main.removeChild(main.firstChild);
    };
};

function refreshDisplay(){
    let currentTab = document.querySelector('.active');
    let header = currentTab.textContent;
    let content = '';
    switch (header){
        case 'Today':
            content = createTodayList(mainTodoList);
            break;
        case 'This Week':
            content = createThisWeekList(mainTodoList);
            break;
        case 'All Tasks':
            content = mainTodoList;
            break;
        case 'Daily Tasks':
            content = createDailyList(mainTodoList);
            break;
        default: // for project tabs
            content = createProjectList(mainTodoList, header); 
            break;
    };
    main.appendChild(generateProjectHeader(header));
    if (main.classList.contains('quad')) {
        main.appendChild(generateTdQuadDisplay(createQuadLists(content)));
        addOverdueClass(mainTodoList);
    } else {
        main.appendChild(generateTdListDisplay(content));
        addOverdueClass(mainTodoList);
    };
    activateAllBtns();
    const tdDivList = document.querySelectorAll('.todo');
    tdDivList.forEach((div)=> {
        let tdIndex = div.getAttribute('data-index');
        let status = mainTodoList[tdIndex]['status']
        setTodoStatusImage(div, status);
    });
};

function initializeDisplay(){
    main.appendChild(generateProjectHeader('All tasks'));
    if (main.classList.contains('quad')) {
        main.appendChild(generateTdQuadDisplay(createQuadLists(mainTodoList)));
        addOverdueClass(mainTodoList);
    } else {
        main.appendChild(generateTdListDisplay(mainTodoList));
        addOverdueClass(mainTodoList);
    };
    activateAllBtns();
};
 
