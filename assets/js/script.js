//References to the DOM elements
const taskTitleInputEl = $('#task-name-input');
const taskDueDateInputEl = $('#task-type-input');
const taskDescriptionInputEl = $('#taskDescription');

// Task will be read from local storage and will return array of project objects.
// If there aren't any task in localStorage, an empty array will be initialize ([]) and returned.
function readProjectsFromStorage() {
// Retrieve task and nextId from localStorage and a parse the JSOn to an array.
//Use `let` becuse there's a change and there aren't any task in localStarage and it will need to be initialized in order to empty the array. 
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// If task were unable to be retrieved from localStorage, the task will be assigned to a new empty array to push to later.
  if (!task) {
    task = [];
  }

  // The task array will be returned either empty or with data in it, whichever it was determined to be by the logic right above.
  return task;
}

// Will accepts an array of projects, stringifys them, and saves them in localStorage.
function saveProjectsToStorage(task) {
    localStorage.setItem('task', JSON.stringify(task));
}


     // Todo: create a function to generate a unique task id
       function generateTaskId() {



    // Create a task card from the information passed in the task parameter and returned it.
    function createTaskCard(task) {
     const card = $('<div>');
     card.addClass('card task-card draggable my-3');"
     card.attr('data-task-id', task.id);
     const cardHeader = $('<div>').addClass ('card-header').text (task.title);
     const cardBody = $( '<div>').addClass('card-body');
     const cardDescription = $("<p>").addClass ("card-text").text (task.description);
     const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
     const cardDeleteBtn = $('<button>')
       .addClass('btn btn-danger delete')
       .text('Delete')
       .attr('data-task-id',task.id);
     cardDeleteBtn.on('click', handleDeleteTask);

    // The card background color will be based on the due date. Will only apply the styles if the dueDate exists and the status is not done.
     if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

     // Task will turn yellow if task is due today. Tasks will turn red if they're overdue
        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
          } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
          }
        }
    // Append them to their correct elements.
    cardBody.append(cardDescription,cardDueDate, cardDeleteBtn);
    card.append(cardHeader, cardBody);

return taskcard;

function printTaskData() {
    const task = readtaskFromStorage();
  
    // Empty existing task cards 
    const todoList = $('#todo-cards');
    todoList.empty();
  
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
  
    const doneList = $('#done-cards');
    doneList.empty();
  
    //Create task cards for each status
    for (let Task of Task) {
      if (task.status === 'to-do') {
        todoList.append(createTaskCard(Task));
      } else if (task.status === 'in-progress') {
        inProgressList.append(createTaskCard(Task));
      } else if (Task.status === 'done') {
        doneList.append(createTaskCard(Task));
      }
    }

    // Use JQuery UI to allow task cards to become draggable 
$('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    //  This function allows the a clone to be created of the card that will be dragged.  This is visual and this will not affect the data.
    helper: function (e) {
      // This will allow the target of the drag event to be checked, this will provide confirmation if the target is a card itself or a child element. If it is the card itself, clone it, if it's a child,  find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // This will allow the clone to return to the width set of the width of the original card. This will prevent the clone from taking up the entire width of the lane. This will also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}
   
     //  Removes the task from the local storage, prints the task data back to the page
      function handleDeleteTask() {
    const TaskId = $(this).attr('data-task-id');
    const Task = readTaskFromStorage();
  
    //   Remove the task from the array.  Use `forEach()` loop to remove tasks.
    task.forEach((task) => {
      if (task.id === taskId) {
        task.splice(task.indexOf(task), 1);
      }
    });
  
    // Save task to local storage  
    saveTaskToStorage(task);
  
    //Print task back to the screen
    printTaskData();
  }
  
  // Add task to local storage, prints to task data
  function handleTaskFormSubmit(event) {
    event.preventDefault();
  
    // This will allow user's input to be read form the form.
    const taskName = taskNameInputEl.val().trim();
    const taskDueDate = taskDueDateInputEl.val(); // don't need to trim select input
    const taskDescription =taskDescriptionInputElDateInputEl.val(); // don't need to trim select input
  
    const newTask = {
    //  Use web API "Crypto" to generate our random id for our task.
      name: taskName,
      type: taskDueDate,
      dueDate:taskDescription,
      status: 'to-do',
    };
  
    // This will allow us to pull the tasks from the localStorage, we can push the new task to the new array
    const task = readTaskFromStorage();
    task.push(newTask);
  
    // The updated task will be saved to the localStorage
    saveTaskToStorage(task);
  
    // The task data will print to the screen
    printTaskData();
  
    // Form inputs will be cleared 
    taskNameInputEl.val('');
    taskDueDateInputEl.val('');
    taskDescriptionInputEl.val('');
  }
  
   // Fuction that will update the status of the task and save to localStorage
  function handleDrop(event, ui) {
    // Read tasks from the localStorage
    const task = readTaskFromStorage();
  
    // Retrieve task id from the event
    const taskId = ui.draggable[0].dataset.taskId;
  
    // Retrieve the id of the lane where card was dropped 
    const newStatus = event.target.id;
  
    for (let task of task) {
      // Find task card by locating the id and updating the task status
      if (task.id === taskId) {
        task.status = newStatus;
      }
    }
    // Save updated task array to the local storge, provide new task data
    localStorage.setItem('task', JSON.stringify(task));
    printTaskData();
   });
});
  

