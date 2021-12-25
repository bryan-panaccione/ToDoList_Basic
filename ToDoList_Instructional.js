//selectors, identify the items that user interacts with in some way
//selector 1 the input field, this is the data from the form field input by the user 'input' input form should have this class
const userInput = document.querySelector('.user-inputStr')
//selector 2 a list item, This is the div that is added to DOM through user input and pressing submit button (the "to do item")
const listItem = document.querySelector('.todo-list')
//selector 3 the input button, the right arrow or "enter" button on the user input field. (button needs "submitInput" class)
const inputButton = document.querySelector('.submitInput')
//selector 4 clear all button, Clear/Delete user input
const clearAllButton = document.querySelector('.clearButton')
//selector 5 saveButton
const saveButtonSelect = document.querySelector('.saveButton')
// selector 5, bring in local storage
const previousListButton = document.querySelector('.localButton')

//Add event listeners, things the user can do that require a certain response
//eventListener 1 - when user clicks on the input button selector 3, execute createTask
inputButton.addEventListener('click', createTask)
//eventListener 2 - when user clicks on an item in the list -selector2- execute delCheck
listItem.addEventListener("click", delCheck)
//eventListener 3 - when user clicks on clear all button, execute clearAll
clearAllButton.addEventListener("click", clearAll)
//console.log(inputButton)
saveButtonSelect.addEventListener("click", saveLocal)

previousListButton.addEventListener("click", getPreviousList)
// functions
//createTask creates taskDiv with input, delete and check inside
function createTask(event) {
    event.preventDefault();
    //create taskDiv
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskDiv');
    //create task that user input
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');
    taskItem.innerText = userInput.value;
    taskDiv.appendChild(taskItem);
    //add check
    const checkIcon = document.createElement('button');
    checkIcon.classList.add('checked-Item');
    checkIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
    taskDiv.appendChild(checkIcon);
    //add delete
    const deleteIcon = document.createElement('button');
    deleteIcon.classList.add('deleted-Item');
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    taskDiv.appendChild(deleteIcon);
    //append taskDiv to the ul in html body
    listItem.appendChild(taskDiv);
    //clear value after input
    userInput.value = "";
}


//Delete or Check Function, this function runs when any button in taskDiv is 'click', can extend functionality of list item buttons by adding button actions here
function delCheck(e) {
    //create variable that holds input array from click
    const buttonChoice = e.target;
    //create variable that holds parent of clicked item so whole section can be changed
    const taskStatus = buttonChoice.parentElement;
    if (buttonChoice.classList[0] === 'checked-Item') {
        //markFinished class can add some text effect like overline or opacity drop
        taskStatus.classList.add('markFinished')
    }
    if (buttonChoice.classList[0] === 'deleted-Item') {
        //add slideOut css class that has a transition
        taskStatus.classList.add('slideOut')
        //this waits until slideOut transition is completed, then removes entire taskDiv
        taskStatus.addEventListener('transitionend', () => taskStatus.remove())
    }
}


//Clear List Function, a few different ways to do this exist
function clearAll() {
    //using jQuery
    //$('.taskDiv').remove();
    //using forEach
    //document.querySelectorAll('.taskDiv').forEach(e => e.remove());
    //loop through array
    let taskArray = document.querySelectorAll('.taskDiv')
    for (var i = 0; i < taskArray.length; i++) {
        //must go back to document with document. to effect the element, otherwise it just clears array
        document.getElementsByClassName('taskDiv')[0].remove();
    }
}

function saveLocal() {
    //dont clear, use removeItem for list key specifically in case localstorage is used somewhere else
    localStorage.removeItem('list')
    var savedList = document.getElementById("saveSection")
    localStorage.setItem('list', savedList.outerHTML)

}
//pull previous list from local storage and append it to the identified saveSection, probably the ul, but it can go wherever
function getPreviousList() {
    //pull the list item from local storage
    var testedStore = localStorage.getItem('list')
    //create a new div 
    var divTag = document.createElement('div')
    //innerHTML is tested score, the item coming from storage
    divTag.innerHTML = testedStore
    document.getElementById("saveSection").appendChild(divTag)
}
