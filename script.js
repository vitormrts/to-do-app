const input_text = document.querySelector(".l-header__text")

var id = 0
var cross_button = []

input_text.addEventListener("keyup", function(event) {
    if (isEnter(event)) { // enter pressionado
        const text = input_text.value
        if (text != 0) {
            const list = document.querySelector(".c-list")
            const li = document.createElement(`li`)
            li.id = `li-${id}`

            const todo = createTodo(text, id)
            li.innerHTML = todo
            list.appendChild(li)

            input_text.value = ''
            input_text.focus()
            cross_button = document.querySelectorAll(".c-list__cross-todo")
            console.log(cross_button)
            id += 1

            crossTodo(cross_button, list)
        }
    }
})

function crossTodo(todo_list, list) {
    todo_list.forEach(function(btn) {
        btn.addEventListener("click", function() {
            let id = btn.closest(`li`).id
            let li = document.querySelector(`#${id}`)
            list.removeChild(li)
        })
    })
}

function createTodo(todo_text, id) {
    return (
        `      
        <div id="div-${id}" class="c-list__item">
        <input type="checkbox" class="c-list__mark" name="mark">
        <label for="mark"></label>
        <div class="c-list__text">
        <p>${todo_text}</p>
        </div>
        <button id="button-${id}" class="c-list__cross-todo"><img src="assets/icon-cross.svg" alt="excluir tarefa"></button>
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