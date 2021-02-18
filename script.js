const input_text = document.querySelector(".l-header__text")

input_text.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) { // enter pressionado
        const text = input_text.value
        if (text == 0) {
            // ALERTA PEDINDO PARA PREENCHER
            console.log("VAZIO")
        }
        else {
            console.log("NAO ESTA VAZIO")
            const list = document.querySelector(".c-list")
            const li = document.createElement("li")

            const todo = createTodo(text)
            li.innerHTML = todo

            list.appendChild(li)
            
            var div = document.createElement("div")

            input_text.value = ''
            input_text.focus()
        }
        // verifico se esta vazio

    }
})

function createTodo(todo_text) {
    return (
        `      
        <div class="c-list__item">
        <input type="checkbox" class="c-list__mark" name="mark">
        <label for="mark"></label>
        <div class="c-list__text">
        <p>${todo_text}</p>
        </div>
        <img src="assets/icon-cross.svg" alt="excluir tarefa">
        </div>
      `
    )
} 