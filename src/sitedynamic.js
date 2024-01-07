import { createProjectTagList, createProjectTDLists, getProjectStats} from "./applogic";

function generateQuadDateSelector(){
    let container = document.createElement('div');
    container.classList.add('date-selector-div');

    const dateSelectorLabel = document.createElement('label');
    dateSelectorLabel.classList.add('date-selector');
    dateSelectorLabel.textContent = 'Choose the date cut off for urgency:   '
    const dateSelector = document.createElement('input');
    dateSelector.setAttribute('type', 'date');
    dateSelector.setAttribute('id', 'date-selector');

    dateSelectorLabel.appendChild(dateSelector);
    container.appendChild(dateSelectorLabel);
    return container;
}

function generateProjectOverviewsDisplay(tdList){
    let container = document.createElement('div');
    container.classList.add('projectOverviews-container');
    let projectObjectList = createProjectTDLists(tdList)
    projectObjectList.forEach((object)=> {
        let div = generateStatsDiv(object);
        container.appendChild(div);
    });
    return container;
};

function generateStatsDiv(projectObject){
    let container = document.createElement('div');
    container.classList.add('project-overview');
    let titleDiv = document.createElement('div');
    titleDiv.classList.add('overview-title');
    titleDiv.textContent = projectObject['projectTag'];
    let projectStats = getProjectStats(projectObject['tdList']);
    
    let completeness = document.createElement('p');
    completeness.textContent = `${projectStats['numCompleted']} tasks out of  ${projectStats['numTds']} completed`;

    let q1 = document.createElement('p');
    q1.textContent = `${projectStats['numQ1']} task are urgent and important.`
    
    let q2 = document.createElement('p');
    q2.textContent = `${projectStats['numQ2']} task are not urgent and important.`
    
    let q3 = document.createElement('p');
    q3.textContent = `${projectStats['numQ3']} task are urgent and unimportant.`
    
    let q4 = document.createElement('p');
    q4.textContent = `${projectStats['numQ4']} task are not urgent and unimportant.`
    
    container.appendChild(titleDiv);
    container.appendChild(completeness);
    container.appendChild(q1);
    container.appendChild(q2);
    container.appendChild(q3);
    container.appendChild(q4);

    return container;
}


function generateProjectButtons(tdList){
    let container = document.createElement('div');
    container.classList.add('projectBtns-container')
    let projectTagList = createProjectTagList(tdList);
    projectTagList.forEach((tag)=>{
        let btn = document.createElement('button');
        btn.classList.add('button');
        btn.classList.add('project-btn');
        btn.textContent= tag;
        container.appendChild(btn);
    });
    return container;
};

function generateProjectHeader(title){
    let pHeader = document.createElement('h2')
    pHeader.classList.add('pHeader');
    pHeader.textContent =title;
    return pHeader;
}

function generateTdListDisplay(tdList){
    let container = document.createElement('div');
    container.classList.add('list-display');
    container.classList.add('tdList-container');
    tdList.forEach((element) => {
        let td=createTodoDiv(element);
        container.appendChild(td);
    });
    return container;
}

function generateTdQuadDisplay(quadLists){
    let container = document.createElement('div');
    container.classList.add('quad-display');
    container.classList.add('quad-container');
    for(let i=1; i<5; i++){
        let newQuad = createQuadContainer(quadLists[i-1]);
        newQuad.classList.add('quad'+i)
        container.appendChild(newQuad);
    };

    let urgent = document.createElement('div');
    urgent.classList.add('quad-grid-label');
    urgent.classList.add('urgent');
    urgent.textContent = 'URGENT';
    container.appendChild(urgent); 

    let later = document.createElement('div');
    later.classList.add('quad-grid-label');
    later.classList.add('later');
    later.textContent = 'NOT URGENT';
    container.appendChild(later);
    
    let important = document.createElement('div');
    important.classList.add('quad-grid-label');
    important.classList.add('rotate')
    important.classList.add('important');
    important.textContent = 'IMPORTANT';
    container.appendChild(important);

    let unimportant = document.createElement('div');
    unimportant.classList.add('quad-grid-label');
    unimportant.classList.add('rotate')
    unimportant.classList.add('unimportant');
    unimportant.textContent = 'UNIMPORTANT';
    container.appendChild(unimportant);

    return container;
}




function createQuadContainer(list){
    let quadContainer = document.createElement('div');
        quadContainer.classList.add('tdList-container')
        list.forEach((element) => {
            let td=createTodoDiv(element);
            quadContainer.appendChild(td);
        })
        return quadContainer; 
};
//Helper Functions

function createTodoDiv(tdObject){
    //Create container Div
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.setAttribute('data-index', tdObject['data-index'])
        //create checkbox img/div with src controlled by css
    let statusBox = document.createElement('img')
    statusBox.classList.add('checkbox');
    statusBox.src = '../src/Images/unchecked-box.png';
        //create title div/button to expand
    let todoTitle = document.createElement('div');
    todoTitle.classList.add('todo-title')
    todoTitle.textContent = tdObject.title;
        //create dueDate div
    let dueDateDiv =document.createElement('div');
    dueDateDiv.classList.add('dueDate-div');
    dueDateDiv.textContent = tdObject.dueDate;
        //create Priority div
    let priorityDiv = document.createElement('div')
    priorityDiv.classList.add('priority-div');
    priorityDiv.textContent=tdObject.priority;
    priorityDiv.style.backgroundColor= getPriorityColor(tdObject);
        //create edit button
    let editBtn = document.createElement('img');
    editBtn.classList.add('edit');
    editBtn.src = '../src/Images/pencil.png'
        //create delete button
    let deleteBtn = document.createElement('img');
    deleteBtn.classList.add('delete');
    deleteBtn.src='../src/Images/delete.png';
    //append elements to container
    todoDiv.appendChild(statusBox);
    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(dueDateDiv);
    todoDiv.appendChild(priorityDiv);
    todoDiv.appendChild(editBtn);
    todoDiv.appendChild(deleteBtn);

    return todoDiv;
};


function setTodoStatusImage(tdDiv, currentStatus){
    if (currentStatus != 'complete'){
        tdDiv.classList.remove('complete');  
        tdDiv.firstChild.src = '../src/Images/unchecked-box.png';
    } else if (currentStatus === 'complete'){
        tdDiv.classList.add('complete')  ;
        tdDiv.firstChild.src = '../src/Images/checked-checkbox.png';
    };
};

function getPriorityColor(todoObject){
    let priority = todoObject.priority;
    if (priority === 'High'){
        return 'red';
    } else if (priority === 'Medium'){
        return 'yellow';
    }else if (priority ==="Low"){
        return 'blue';
    }else {
        return 'grey';
    };
};


//Exports

export {generateTdListDisplay, generateProjectHeader, createTodoDiv, setTodoStatusImage, generateTdQuadDisplay, generateProjectButtons, generateProjectOverviewsDisplay}