// Initialize Materialize CSS Elements
const userDrop = document.querySelector('#navDrop');
const userDropInstance = M.Dropdown.init(userDrop, {
  coverTrigger: false
});

const sortDrop = document.querySelector('#sortDrop');
const sortDropInstance = M.Dropdown.init(sortDrop, {
  coverTrigger: false
});

const datePicker = document.querySelector('.datepicker');
const datePickerInstance = M.Datepicker.init(datePicker, {
  minDate: new Date()
});

const timePicker = document.querySelector('.timepicker');
const timePickerInstance = M.Timepicker.init(timePicker, {});

const todoModal = document.querySelector('.modal');
const todoModalInstance = M.Modal.init(todoModal, {
  onCloseEnd: clearModal
});

function showTodoModal(e, title, description, dueDate, dueTime){
  if(e.target.classList.contains('material-icons')){
    return;
  }
  document.querySelector('#modalTitle').textContent = title;
  document.querySelector('#modalDescription').textContent = description;
  if(dueDate !== null){
    document.querySelector('#modalDate').textContent = dueDate;
  }
  if(dueTime !== null){
    document.querySelector('#modalTime').textContent = dueTime;
  }

  todoModalInstance.open();
}

function clearModal(){
  document.querySelector('#modalTitle').textContent = '';
  document.querySelector('#modalDescription').textContent = '';
  document.querySelector('#modalDate').textContent = '';
  document.querySelector('#modalTime').textContent = '';
}

function clearInput(target){
  if(target === 'datepicker'){
    document.querySelector('.datepicker').value = '';
  }
  if(target === 'timepicker'){
    document.querySelector('.timepicker').value = '';
  }
}
