document.querySelector('#button-submit').addEventListener('click', (event) => Form.submit(event))

document.querySelector('#active-items').addEventListener('click', () => FilteredTodos.toggle("active"))
document.querySelector('#all-items').addEventListener('click', () => FilteredTodos.toggle("all"))
document.querySelector('#completed-items').addEventListener('click', () => FilteredTodos.toggle("completed"))

document.querySelector('#clear-completed').addEventListener('click', () => Todo.clearCompleted())

let allTodos = [
    {
        id: 1,
        description: "Bla",
        status: "active"     
    },
    {
        id: 2,
        description: "Bla bla",
        status: "active"         
    },
    {
        id: 3,
        description: "Bla bla bla",
        status: "active"  
    },
    {
        id: 4,
        description: "Bla bla bla bla",
        status: "active"       
    },
    {
        id: 5,
        description: "Bla bla bla bla bla",
        status: "active"     
    },
    {
        id: 6,
        description: "Bla bla bla bla bla bla",
        status: "completed"       
    },
    {
        id: 7,
        description: "Bla bla bla bla bla bla bla",
        status: "completed"       
    },
    {
        id: 8,
        description: "Bla bla bla bla bla bla bla bla",
        status: "completed"       
    }
]

const FilteredTodos = {
    pressed: 'all',

    options: document.querySelectorAll(".c-menu__item-option"),

    getAll() {
        return allTodos;
    },

    getActive() {
        let todos = FilteredTodos.getAll();
        return todos.filter(todo => todo.status != 'completed');
    },

    getCompleted() {
        let todos = FilteredTodos.getAll();
        return todos.filter(todo => todo.status == 'completed');
    },

    toggle(filter) {
        FilteredTodos.pressed = filter;

        FilteredTodos.options.forEach(option => {
            if (option.id == `${filter}-items` && !option.classList.contains('enabled')) {
                option.classList.toggle('enabled')
            } 
  
            if (option.id != `${filter}-items` && option.classList.contains('enabled')) {
                option.classList.toggle('enabled')
            }
        } )

        App.reload()
    },

    getTodos() {
        if (FilteredTodos.pressed == 'active') {
            return FilteredTodos.getActive();
        }
        if (FilteredTodos.pressed == 'completed') {
            return FilteredTodos.getCompleted();
        }
        
        return FilteredTodos.getAll();
    }

}

const Todo = {
    add(todo) {
        FilteredTodos.getAll().push(todo);

        App.reload();
    },

    completedTodo(id) {
        let todos = FilteredTodos.getAll();
        const index = todos.findIndex(todo => todo.id == id);

        todos[index].status = todos[index].status == 'active' ? 'completed' : 'active';

        App.reload();
    },

    deleteTodo(id) {
        let todos = FilteredTodos.getAll();
        const index = todos.findIndex(todo => Number(todo.id) == id);

        todos.splice(index, 1);
        App.reload();
    },

    clearCompleted() {
        allTodos = allTodos.filter(todo => todo.status == 'active');
        
        App.reload();
    },

    orderTodos() {
        let newAllTodos = []
        newAllTodos = newAllTodos.concat(FilteredTodos.getActive(), FilteredTodos.getCompleted())
        allTodos = newAllTodos
        console.log(allTodos)
    }

    
}

const Form = {
    description: document.querySelector('#input-todo'),
    id: FilteredTodos.getAll().length + 1,

    validateFields() {
        const { description } = Form.getValues();

        if (description.trim() === '') {
            throw new Error("Por favor, insira uma nova tarefa.");
        }
    },

    formatValues() {
        let { description, id } = Form.getValues();
        return {
            description: description.trim(),
            status: 'active',
            id
        }
    },

    getValues() {
        return {
            description: Form.description.value,
            id: Form.id
        }
    },

    clearFields() {
        Form.description.value = ''
    },

    submit(event) {
        event.preventDefault();

        try {
            Form.validateFields();
            
            const todo = Form.formatValues();

            Todo.add(todo);

            Form.clearFields();
        } catch (error) {
            alert(error);
        }
    }
}


const DOM = {
    todoContainer: document.querySelector('.c-list'),
    addTodo(todo) {

        const li = document.createElement('li');
        li.innerHTML = DOM.innerHTMLTodo(todo);

        DOM.todoContainer.appendChild(li);

        const mark = document.querySelector(`#mark-todo-${todo.id}`)

        if (todo.status == 'completed') {
            li.classList.add('completed');
            mark.classList.add('checked');
        }

        document.querySelector(`#mark-todo-${todo.id}`).addEventListener('click', () => Todo.completedTodo(todo.id));
        document.querySelector(`#todo-cross-${todo.id}`).addEventListener('click', () => Todo.deleteTodo(todo.id));
    },

    innerHTMLTodo(todo) {
        const html = `
            <div class="c-list__item">
                <div>
                    <div class="c-list__check">
                        <input id="mark-todo-${todo.id}" type="checkbox" class="c-list__mark" name="mark">
                        <label for="mark"></label>
                        <svg class="c-list__mark__icon-check" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FGF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                    </div>
                    <div class="c-list__text">
                        <p>${todo.description}</p>
                    </div>
                </div>
                <button id="todo-cross-${todo.id}" class="c-list__cross-todo"><img src="./src/assets/icon-cross.svg" alt="Excluir tarefa"></button>
            </div>
        `
        return html;
    },

    clearTodos() {
        DOM.todoContainer.innerHTML = '';
    }
}

const App = {
    init() {
        const todos = FilteredTodos.getTodos();
        todos.forEach((todo) => DOM.addTodo(todo))
        document.querySelector('#items-left').innerHTML = `${todos.length} itens restantes.`
    },

    reload() {
        Todo.orderTodos();
        DOM.clearTodos();
        App.init()
    }
}

App.init()