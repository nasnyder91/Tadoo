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

function showTodoModal(e, title, description, dueDate, dueTime, id){
  if(e.target.classList.contains('material-icons')){
    return;
  }
  document.querySelector('#modalTitle').textContent = title;
  document.querySelector('#modalDescription').textContent = '  ' + description;
  if(dueDate !== null){
    document.querySelector('#dateIconDiv').innerHTML = '<i class="far fa-calendar-alt fa-4x"></i>';
    document.querySelector('#modalDate').textContent = dueDate;
  }
  if(dueTime !== null){
    document.querySelector('#timeIconDiv').innerHTML = '<i class="far fa-clock prefix fa-4x"></i>';
    document.querySelector('#modalTime').textContent = '  ' + dueTime;
  }

  document.querySelector('#modalEditBtn').href = `/todos/edit/${id}`;
  // document.querySelector('#modalDeleteForm').action = `/todos/${id}?_method=DELETE`;

  todoModalInstance.open();
}

function clearModal(){
  document.querySelector('#modalTitle').textContent = '';
  document.querySelector('#modalDescription').textContent = '';
  document.querySelector('#modalDate').textContent = '';
  document.querySelector('#dateIconDiv').innerHTML = '';
  document.querySelector('#modalTime').textContent = '';
  document.querySelector('#timeIconDiv').innerHTML = '';
}

function clearInput(target){
  if(target === 'datepicker'){
    document.querySelector('.datepicker').value = '';
  }
  if(target === 'timepicker'){
    document.querySelector('.timepicker').value = '';
  }
}

function deleteBtnHandler(e, id){
  showDeleteConfirm(e, id);
  hideEditDeleteBtns(e);
}

function cancelDeleteHandler(e, id){
  showEditDeleteBtns(e);
  closeDeleteConfirm(id);
}

function showDeleteConfirm(e, id){
  if(document.querySelector('.deleteCover')){
    document.querySelector('.deleteCover').parentNode.removeChild(document.querySelector('.deleteCover'));
  }

  const todo = e.target.parentElement.parentElement;


  const deleteCover = document.createElement('div');
  deleteCover.className = 'deleteCover green lighten-2 center-align';
  deleteCover.id = `delete${id}`;
  deleteCover.innerHTML = `
    <span class="card-title">Are you sure you want to delete this Tadoo?</span>
    <div class="deleteConfirmBtns">
      <form action="/todos/${id}?_method=DELETE" method="post">
        <input type="hidden" name="_method" value="DELETE">
        <button type="submit" class="btn-floating green waves-effect waves-light"><i class="material-icons">check</i></button>
      </form>
      <button class="btn-floating red waves-effect waves-light"><i class="material-icons" onclick="cancelDeleteHandler(event, '${id}')">close</i></button>
    </div>
  `;
  todo.appendChild(deleteCover);
}

function closeDeleteConfirm(elemID){
  const elem = document.querySelector(`#delete${elemID}`);
  elem.parentNode.removeChild(elem);
}

function hideEditDeleteBtns(e){
  const todo = e.target.parentElement.parentElement;

  const editBtn = todo.querySelector('.editBtn');
  const deleteBtn = todo.querySelector('.deleteBtn');

  editBtn.style.display = 'none';
  deleteBtn.style.display = 'none';
}

function showEditDeleteBtns(e){
  const todo = e.target.parentElement.parentElement.parentElement.parentElement;

  const editBtn = todo.querySelector('.editBtn');
  const deleteBtn = todo.querySelector('.deleteBtn');

  editBtn.style.display = 'block';
  deleteBtn.style.display = 'block';
}
