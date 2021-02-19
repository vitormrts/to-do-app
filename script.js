const inputText = document.querySelector(".l-header__text")
const list = document.querySelector(".c-list")
const clearCompleted = document.querySelector("#clear-completed")
const completed = document.querySelector("#completed-items")
const active = document.querySelector("#active-items")
const all = document.querySelector("#all-items")
const itemsLeft = document.querySelector("#items-left")

let allItems = []
let completedItems = []
let activeItems = []

const getStyle = (style) => {
    return window.getComputedStyle(document.documentElement).getPropertyValue(style)
}

var id = 0

clearCompleted.addEventListener("click", function() {
    const list = document.querySelector(".c-list")
    let completedTodo = document.querySelectorAll(".c-list__mark.complete")
    completedTodo.forEach((todo) => {
        let liId = todo.closest("li").id
        let liElem = document.querySelector(`#${liId}`)
        list.removeChild(liElem)
    })
})

inputText.addEventListener("keyup", function(event) {
    if (isEnter(event)) { // enter pressionado
        const text = inputText.value
        if (text != 0) {
            const li = document.createElement(`li`)
            li.id = `li-${id}`
            const todo = createTodo(text, id)
            li.innerHTML = todo
            list.appendChild(li)
            inputText.value = ''
            inputText.focus()
            crossButtons = document.querySelectorAll(".c-list__cross-todo")
            checkButtons = document.querySelectorAll(".c-list__mark")
            id += 1

            crossTodo(crossButtons, list)
            completeTodo(checkButtons)
        }
    }
})

function crossTodo(crossButtons, list) {
    crossButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            let liId = btn.closest(`li`).id
            let liElem = document.querySelector(`#${liId}`)
            list.removeChild(liElem)
        })
    })
}

function completeTodo(checkButtons) {
    checkButtons.forEach(function(check) {
        check.addEventListener("change", ({target}) => {
            let p = document.getElementById(`p-${check.id}`)
            if (target.checked) {
                p.style.textDecoration = "line-through"
                p.style.color = `${getStyle("--color-options")}`
                check.setAttribute("class", "c-list__mark complete")
            }
            else {
                p.style.textDecoration = "none"
                p.style.color = `${getStyle("--color-text")}`
                check.setAttribute("class", "c-list__mark incomplete")
            }
        })
    })
} 

function createTodo(todo_text, id) {
    return (
        `      
        <div id="div-${id}" class="c-list__item">
        <div class="c-list__check">
        <input id="${id}" type="checkbox" class="c-list__mark incomplete" name="mark">
        <label for="mark"></label>
        <img src="assets/icon-check.svg" alt="">
        </div>
        <div class="c-list__text">
        <p id="p-${id}">${todo_text}</p>
        </div>
        <button id="${id}" class="c-list__cross-todo"><img src="assets/icon-cross.svg" alt="excluir tarefa"></button>
        </div>
      `
    )
} 

function isEnter(event) {
    if (event.keyCode == 13) {
        return true
    }
    return false
}