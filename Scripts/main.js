const shCalendarContainer = document.querySelector('.sh-calendar-container');
const shCalendarHeader = document.querySelector('.sh-calendar-header');
const shCalendarBody = document.querySelector('.sh-calendar-body');
const shCalendarFlex = document.querySelector('.sh-calendar-flex');
const shPrevButton = document.querySelector('.sh-prev-button');
const shNextButton = document.querySelector('.sh-next-button');
const shCurrentDate = document.querySelector('.sh-current-date');

let shDate = new Date();
let shCurrentYear = shDate.getFullYear();
let shCurrentMonth = shDate.getMonth();

function shRenderCalendar() {
  const shFirstDayOfMonth = new Date(shCurrentYear, shCurrentMonth, 1);
  const shLastDayOfMonth = new Date(shCurrentYear, shCurrentMonth + 1, 0);
  const shFirstDayOfWeek = shFirstDayOfMonth.getDay();
  const shLastDayOfWeek = shLastDayOfMonth.getDay();
  const shDaysInMonth = shLastDayOfMonth.getDate();
  const shDaysInPreviousMonth = new Date(shCurrentYear, shCurrentMonth, 0).getDate();

  shCalendarFlex.innerHTML = '';

  let shDayCounter = 1;
  let shNextMonthDay = 1;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const shDay = document.createElement('div');
      shDay.classList.add('sh-day-of-month');

      if (i === 0 && j < shFirstDayOfWeek) {
        const shPreviousMonthDay = shDaysInPreviousMonth - shFirstDayOfWeek + j + 1;
        shDay.textContent = shPreviousMonthDay;
        shDay.classList.add('sh-inactive');
      } else if (shDayCounter > shDaysInMonth) {
        shDay.textContent = shNextMonthDay;
        shDay.classList.add('sh-inactive');
        shNextMonthDay++;
      } else {
        shDay.textContent = shDayCounter;
        shDay.classList.add('sh-active');
        shDayCounter++;
      }

      shCalendarFlex.appendChild(shDay);
    }
  }

  shCurrentDate.textContent = `${shDate.toLocaleString('default', { month: 'long' })} ${shCurrentYear}`;
}
shRenderCalendar();

shPrevButton.addEventListener('click', () => {
  shCurrentMonth--;
  if (shCurrentMonth < 0) {
    shCurrentMonth = 11;
    shCurrentYear--;
  }
  shDate = new Date(shCurrentYear, shCurrentMonth, 1);
  shRenderCalendar();
});

shNextButton.addEventListener('click', () => {
  shCurrentMonth++;
  if (shCurrentMonth > 11) {
    shCurrentMonth = 0;
    shCurrentYear++;
  }
  shDate = new Date(shCurrentYear, shCurrentMonth, 1);
  shRenderCalendar();
});

// Sticky Notes Section
const stickyNotesSection = document.querySelector('.sticky-notes-section');
const notesContainer = document.querySelector('#notes-container');

// Create a new sticky note
function createStickyNote(note) {
  if (notesContainer.children.length < 9) {
    const stickyNote = document.createElement('div');
    stickyNote.classList.add('sh-sticky-note');

    const noteHeader = document.createElement('div');
    noteHeader.classList.add('sh-note-header');

    const date = new Date(note.title);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;

    const noteTitle = document.createElement('h3');
    noteTitle.textContent = formattedDate;
    noteHeader.appendChild(noteTitle);

    const noteBody = document.createElement('div');
    noteBody.classList.add('sh-note-body');

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = '+';
    const addTaskButtonSpan = document.createElement('span');
    addTaskButtonSpan.textContent = ' Add Note';
    addTaskButton.appendChild(addTaskButtonSpan);
    addTaskButton.classList.add('sh-add-task-button');
    noteBody.appendChild(addTaskButton);

    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('sh-tasks-container');
    noteBody.appendChild(tasksContainer);

    const noteFooter = document.createElement('div');
    noteFooter.classList.add('sh-note-footer');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('sh-delete-button');
    noteFooter.appendChild(deleteButton);

    stickyNote.appendChild(noteHeader);
    stickyNote.appendChild(noteBody);
    stickyNote.appendChild(noteFooter);

    notesContainer.appendChild(stickyNote);

    addTaskButton.addEventListener('click', () => {
      const taskInput = prompt('Enter your task:');
      const task = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      task.appendChild(checkbox);
      task.appendChild(document.createTextNode(taskInput));
      tasksContainer.appendChild(task);
    });

    deleteButton.addEventListener('click', () => {
      stickyNote.remove();
    });
  } else {
    alert('You have reached the maximum number of notes (9).');
  }
}


// Add event listener to the calendar
shCalendarFlex.addEventListener('click', (e) => {
  if (e.target.classList.contains('sh-day-of-month')) {
    const day = e.target;
    const dayOfMonth = day.textContent;
    const month = shCurrentMonth + 1;
    const year = shCurrentYear;
    const note = {
      title: `${year}-${month.toString().padStart(2, '0')}-${dayOfMonth.toString().padStart(2, '0')}`,
      body: 'Add note...'
    };

    const date = new Date(note.title);
    if (date.getMonth() !== shCurrentMonth) {
      alert('This date is not of this month.');
      e.preventDefault();
      e.stopPropagation();
    } else {
      createStickyNote(note);
    }
  }
});

// Add event listener to the notes container
notesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('sticky-note')) {
    const note = e.target;
    const noteTitle = note.querySelector('.note-header h3').textContent;
    const noteBody = note.querySelector('.note-body').textContent;

    alert(`Note Title: ${noteTitle}\nNote Body: ${noteBody}`);
  }
});

// Clock Section
const clockContainer = document.querySelector('.clock-container');
const clock = document.querySelector('.clock');

// Update the clock every second
setInterval(() => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  clock.textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);

// Digi Clock Section
const digiClockContainer = document.querySelector('.digi-clock-container');
const digiClock = document.querySelector('.digi-clock');

// Update the digi clock every second
setInterval(() => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  digiClock.textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);

// Add event listener to the clock
clock.addEventListener('click', () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  alert(`Current Time: ${hours}:${minutes}:${seconds}`);
});

// Add event listener to the digi clock
digiClock.addEventListener('click', () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  alert(`Current Time: ${hours}:${minutes}:${seconds}`);
});

