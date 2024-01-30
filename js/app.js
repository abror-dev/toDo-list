const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
const messageCreate = document.getElementById('message-create')
const messageEdit = document.getElementById('message-edit')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
const more_btn = document.querySelector('.more-btn')
const close_btn = document.getElementById('close')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

let editItemId

let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

function timeFun() {
  const now = new Date
  const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
  const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
  const year = now.getFullYear()
  const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
  const min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
  const secont = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()

  hourEl.textContent = hour
  minuteEl.textContent = min
  secondEl.textContent = secont
  setInterval(timeFun, 1000)
  fullDay.textContent = `${date}.${month}.${year}`
  return (`${hour}:${min}  ${date}.${month}.${year}`);

}
timeFun()

if (todos.length) showTodos()

function setTodos() {
  localStorage.setItem('list', JSON.stringify(todos))
}

function showTodos() {
  const todos = JSON.parse(localStorage.getItem('list'))
  listGroupTodo.innerHTML = ""
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML +=
      `<li ondblclick=setCompleted(${i}) class="list-group-item d-flex justify-content-between ${item.completed == true ? 'complated' : ''}">
             ${item.text}
            <div class="todo-icons">
                <span class="opacity-50 me-2">${item.time}</span>
                <img onclick =(deleteTodo(${i}))  src="./img/delete.svg" alt="delete icon" width="25" height="25">
                <img onclick=(editTodo(${i})) src="./img/edit.svg" alt="edit icon" width="25" height="25"> 
            </div>
        </li>`
  });
}
formCreate.addEventListener('click', (e) => {
  e.preventDefault()
  const TodoText = formCreate['input-create'].value.trim()
  if (TodoText.length) {
    formCreate.reset()
    todos.push({ text: TodoText, time: timeFun(), completed: false })
    setTodos()
    showTodos()
  } else {
    messageCreate.textContent = 'Please write some text...'
    setTimeout(() => {
      messageCreate.textContent = ''
    }, 2000)
  }
})

function deleteTodo(id) {
  const deletedTodos = todos.filter((item, i) => {
    return i !== id
  })
  todos = deletedTodos
  setTodos()
  showTodos()
}

function setCompleted(id) {
  const completedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true }
    } else {
      return { ...item }
    }
  })
  todos = completedTodos
  setTodos()
  showTodos()
}

formEdit.addEventListener('submit', (e) => {
  e.preventDefault()
  const TodoText = formEdit['input-edit'].value.trim()
  formEdit.reset()
  if (TodoText.length) {
    todos.splice(editItemId, 1, { text: TodoText, time: timeFun(), completed: false })
    setTodos()
    showTodos()
    Modalclose()
  } else {
    messageEdit.textContent = 'Please write some text...'
    setTimeout(() => {
      messageEdit.textContent = ''
    }, 2000)
  }
})

function editTodo(id) {
  ModalOpen()
  editItemId = id
}
close_btn.addEventListener('click', () => {
  Modalclose()
})
function ModalOpen() {
  modal.setAttribute('class', 'modal-todo')
  overlay.setAttribute('class', 'overlay')
}
function Modalclose() {
  modal.setAttribute('class', 'modal-todo d-none')
  overlay.setAttribute('class', 'overlay d-none')
}

