//Imports
import _, {format, isBefore, addDays, subDays } from 'date-fns';
import { Todo, User, Project } from './constructors';

//Testing Hardcode
let mainTodoList = [];

hardCodeTDs('Create user constructor', 'Create a function that will store user information like id and avatar', '01-25-2024', 'High','test notes', 'To-do App');
hardCodeTDs('Look up data-fns library', 'See what functions are available', '12-29-2023', 'High','','To-do App')
hardCodeTDs('Go to the gym', 'Complete the daily workout', '', 'High','','Daily');
hardCodeTDs('tester1', 'checking fn', '04-11-1989', 'Low','','Test 1')
hardCodeTDs('tester2', 'checking fn', '05-18-2020', 'Medium','','Test 2')
hardCodeTDs('Always today', 'always today', new Date(), 'Low','','Test 1')
hardCodeTDs('Today plus 2', 'checking fn', addDays(new Date(),2), 'High','','Test 2')
hardCodeTDs('Today plus 5', 'checking fn', addDays(new Date(),5), 'Medium','','Test 3')
hardCodeTDs('read the newspaper', 'Complete the daily workout', '', 'Medium','','Daily');
hardCodeTDs('Buy a yacht', 'Complete the daily workout', '', 'Low','','Daily');

//Functions
function hardCodeTDs(title, descript, dueDate, priority, todos, notes , projectTag){
    let newTodo = new Todo(title, descript, dueDate, priority, todos, notes , projectTag);
    mainTodoList.push(newTodo);
    mainTodoList.sort((a,b)=> new Date(a.dueDate)-new Date(b.dueDate));
    indexList(mainTodoList);
    return mainTodoList;
};



function deleteTodo(tdTitle, tdList){
    //Remove from main list
    let tdIndex =tdList.findIndex(tdObject => tdObject.title === tdTitle);
    tdList.splice(tdIndex, 1);
    tdList.sort((a,b)=>a.dueDate-b.dueDate);
    //Remove from main display
};

function createOverDueList (tdList){
    let overdueList = tdList.filter((td)=>isBefore(td.dueDate, subDays(new Date(),1)));
    return overdueList;
};

function checkIfOverdue(tdObject){
   return isBefore(tdObject.dueDate, subDays(new Date(),1));
   
};

function addOverdueClass(tdList){
    let overdueList =[];
    tdList.forEach((tdObject)=> {
        if (checkIfOverdue(tdObject)){
            overdueList.push(tdObject['data-index'].toString());
        };
    });
    let divList = document.querySelectorAll('.todo');
    divList.forEach((div)=>{
        let tdIndex = div.getAttribute('data-index');
        if (overdueList.includes(tdIndex)){
            div.classList.add('overdue');
        };
    });
};

function indexList(tdList){
    tdList.forEach((tdObject)=>{
        tdObject['data-index'] = tdList.findIndex(td => td.title === tdObject.title);
    });
};

function createTodayList(tdList){
    let todayList= tdList.filter((td)=> (td.dueDate === format( new Date(), 'M-dd-y') && td.projectTag !='Daily'));
    return todayList;
};


function createThisWeekList(tdList){
    let thisWeekList= tdList.filter((td)=> (td.dueDate>= format( new Date(), 'M-dd-y') && td.dueDate<= format( addDays(new Date(),7), 'M-dd-y') && td.projectTag !='Daily' ));
    return thisWeekList;
};

function createDailyList(tdList){
    let dailyList = tdList.filter((td)=>td.projectTag==='Daily');
    return dailyList;
};


function createProjectTagList(tdList){
    let projectTagList = [];
    tdList.forEach((tdObject)=>{
        let newProject = tdObject['projectTag'];
        if((newProject != 'Daily') && (newProject!= '') && (!projectTagList.includes(newProject))){
            projectTagList.push(newProject);
        };
    });return projectTagList;
};

function createProjectList(tdList, projectTag){
    let projectList = tdList.filter((td)=> (td.projectTag === projectTag));
    return projectList;
}; 

function createProjectTDLists(tdList){
    let projectTagList = createProjectTagList(tdList);
    let projectTdLists = [];
    projectTagList.forEach((projectTag)=>{
        let currentProject = new Project(projectTag, tdList);
        projectTdLists.push(currentProject);
    });
    return projectTdLists;
};



function createQuadLists(tdList){
    let urgencyDate = addDays(new Date(), 10);
    let quad1 = tdList.filter((td)=>(td.priority === 'High' && td.dueDate<= format(urgencyDate, 'M-dd-y')));
    let quad2 = tdList.filter((td)=>(td.priority === 'High' && td.dueDate> format(urgencyDate, 'M-dd-y'))|| (td.priority === 'Medium' && td.dueDate > format(urgencyDate, 'M-dd-y')));
    let quad3 = tdList.filter((td)=>(td.priority === 'Low' && td.dueDate<= format(urgencyDate, 'M-dd-y')) || (td.priority === 'Medium' && td.dueDate<= format(urgencyDate, 'M-dd-y')));
    let quad4 = tdList.filter((td)=>(td.priority === 'Low' && td.dueDate> format(urgencyDate, 'M-dd-y')));
    let quadLists = [quad1, quad2, quad3, quad4];
    return quadLists;
};

function getProjectStats(projectList){
    let completedTds = projectList.filter((td)=>td.status === 'complete');
    let numCompleted = completedTds.length;
    let numTds=projectList.length;
    let quadLists = createQuadLists(projectList);
    let numQ1= quadLists[0].length;
    let numQ2= quadLists[1].length;
    let numQ3= quadLists[2].length;
    let numQ4= quadLists[3].length;
    return{numTds, numCompleted, numQ1, numQ2, numQ3, numQ4};
};
//exports

export {mainTodoList, createTodayList, createThisWeekList, createDailyList,  deleteTodo, indexList, addOverdueClass, createQuadLists, createProjectTagList, createProjectList, getProjectStats, createProjectTDLists}