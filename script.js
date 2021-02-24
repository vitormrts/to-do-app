const inputText = document.querySelector(".l-header__text")
const list = document.querySelector(".c-list")
const clearCompleted = document.querySelector("#clear-completed")
const showCompleted = document.querySelector("#completed-items")
const showActive = document.querySelector("#active-items")
const showAll = document.querySelector("#all-items")
const itemsLeft = document.querySelector("#items-left")
const menuItems = document.querySelectorAll(".c-menu__item-option")
const toggleTheme = document.querySelector(".l-header__checkbox")
const icon = document.querySelector(".l-header__icon")

let completedItems = []
let activeItems = []

var id = 0
let status = "all"

const getStyle = (style) => {
    return window.getComputedStyle(document.documentElement).getPropertyValue(style)
}

const lightColors = {
    "bg": getStyle("--color-bg"),
    "around-check": getStyle("--color-around-check"),
    "bg-list": getStyle("--color-bg-list"),
    "create": getStyle("--color-create"),
    "text": getStyle("--color-text"),
    "options": getStyle("--color-options"),
    "shadow": getStyle("--color-shadow"),
}

const darkColors = {
    "bg": "hsl(235, 21%, 11%)",
    "around-check": "hsl(237, 14%, 26%)",
    "bg-list": "hsl(235, 24%, 19%)",
    "create": "hsl(234, 39%, 85%)",
    "text": "white",
    "options": "hsl(233, 14%, 35%)",
    "shadow": "hsl(233, 9%, 5%)"
}

const transformKey = key => "--color-" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key =>
        document.documentElement.style.setProperty(transformKey(key), colors[key])   
    )
}

toggleTheme.addEventListener("change", ({target}) => {
    if (target.checked) {
        changeColors(darkColors);
        icon.src = "assets/icon-sun.svg";
    }
    else {
        changeColors(lightColors)
        icon.src = "assets/icon-moon.svg"
    }
})

function changeColorButton(button, index) {
    for (var i in menuItems) {
        if (menuItems[i] != button) {
            menuItems[i].className = "c-menu__item-option disabled"
        }
        else {
            menuItems[i].className = "c-menu__item-option enabled"
        }
    }
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
            itemsLeft.innerText = `${activeItems.length} items left`
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
            itemsLeft.innerText = `${activeItems.length} items left`
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

    changeColorButton(showAll, 0)
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
    changeColorButton(showCompleted, 2)
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
    changeColorButton(showActive, 1)
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
            }
        })
    })
    itemsLeft.innerText = `${activeItems.length} items left`
} 

function createTodo(todo_text, id) {
    return (
        `      
        <div id="div-${id}" class="c-list__item">
        <div class="c-list__check">
        <input id="${id}" type="checkbox" class="c-list__mark incomplete" name="mark">
        <label for="mark"></label>
        <svg class="c-list__mark__icon-check" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FGF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
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