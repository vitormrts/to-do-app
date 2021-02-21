const inputText = document.querySelector(".l-header__text")
const list = document.querySelector(".c-list")
const clearCompleted = document.querySelector("#clear-completed")
const showCompleted = document.querySelector("#completed-items")
const showActive = document.querySelector("#active-items")
const showAll = document.querySelector("#all-items")
const itemsLeft = document.querySelector("#items-left")

let allItems = []
let completedItems = []
let activeItems = []

var id = 0
let status = "all"

const getStyle = (style) => {
    return window.getComputedStyle(document.documentElement).getPropertyValue(style)
}

clearCompleted.addEventListener("click", function() {
    let completedTodo = document.querySelectorAll(".c-list__mark.complete")
    completedTodo.forEach((todo) => {
        let liId = todo.closest("li").id
        let liElem = document.querySelector(`#${liId}`)
        list.removeChild(liElem)
        completedItems.splice(0, completedItems.length)
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
            if (status != "completed") {
                list.appendChild(li)
            }
            inputText.value = ''
            inputText.focus()
            activeItems.push(li)
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
            removeItem(liElem, activeItems)
            removeItem(liElem, completedItems)
        })
    })
}

showAll.addEventListener("click", () => {
    list.innerHTML = ""

    activeItems.forEach((todo) => {
        list.appendChild(todo)
    })

    completedItems.forEach((todo) => {
        list.appendChild(todo)
    })

    // let incompleteTodo = document.querySelector(".c-list__mark.incomplete")
    // incompleteTodo.forEach((todo) => {
    //     let liId = todo.closest("li").id
    //     let liElem = document.querySelector(`#${liId}`)
    //     list.appendChild(liElem)
    // })

    // let completedTodo = document.querySelector(".c-list__mark.complete")
    // completedTodo.forEach((todo) => {
    //     let liId = todo.closest("li").id
    //     let liElem = document.querySelector(`#${liId}`)
    //     list.appendChild(liElem)
    // })
})

showCompleted.addEventListener("click", () => {
    status = "completed"
    let incompleteTodo = document.querySelectorAll(".c-list__mark.incomplete")
    incompleteTodo.forEach((todo) => {
        let liId = todo.closest("li").id
        let liElem = document.querySelector(`#${liId}`)
        addItem(liElem, activeItems)
        list.removeChild(liElem)
    })
    if (completedItems.length > 0) {
        completedItems.forEach((item) => {
            list.appendChild(item)
        })
    }
 })

showActive.addEventListener("click", () => {
    status = "active"
    let completedTodo = document.querySelectorAll(".c-list__mark.complete")
    completedTodo.forEach((todo) => {
        let liId = todo.closest("li").id
        let liElem = document.querySelector(`#${liId}`)
        addItem(liElem, completedItems)
        list.removeChild(liElem)
    })
    if (activeItems.length > 0) {
        activeItems.forEach((item) => {
            list.appendChild(item)
        })
    }
})

let removeItem = (elem, list) => {
    let index = list.indexOf(elem)
    if (index > -1) {
        return list.splice(index, 1)
    }
}

let addItem = (elem, list) => {
    let index = list.indexOf(elem)
    if (index == -1) {
        return list.push(elem)
    }
}

function completeTodo(checkButtons) {
    checkButtons.forEach(function(check) {
        check.addEventListener("change", ({target}) => {
            let p = document.getElementById(`p-${check.id}`)
            let liId = check.closest("li").id
            let liElem = document.querySelector(`#${liId}`)
            if (target.checked) {
                p.style.textDecoration = "line-through"
                p.style.color = `${getStyle("--color-options")}`
                check.setAttribute("class", "c-list__mark complete")
                removeItem(liElem, activeItems)
            }
            else  {
                p.style.textDecoration = "none"
                p.style.color = `${getStyle("--color-text")}`
                check.setAttribute("class", "c-list__mark incomplete")
                addItem(liElem, activeItems)
                // console.log("UNCHECKED! ", activeItems)
            }
            // addItem(liElem, allItems)
            // console.log(allItems)

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