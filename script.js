const todos = []

const DisplayTodos = () => {
    let ulList = document.getElementById("todos-list")
    ulList.innerHTML = ""
    for (let i = 0; i < todos.length; i++) {
        let li = document.createElement('li')
        li.innerText = ' ' + todos[i].todo
        li.id = 'edit-' + i

        li.addEventListener('dblclick', (event) => {
            (event.target.type !== "checkbox" && event.target.type !== "submit") && Edit(event)
        })

        // Button for each li

        let newButton = document.createElement('button')
        newButton.id = 'remove-' + i
        newButton.addEventListener('click', Remove)
        newButton.innerHTML = 'X'

        // Toggle for each li

        let toggleButton = document.createElement('input')
        toggleButton.type = 'checkbox'
        toggleButton.id = 'toggle-' + i
        toggleButton.addEventListener('click', Toggle)

        if (todos[i].completed) {
            toggleButton.checked = true
            li.className = "crossed"
        } else {
            toggleButton.checked = false
            li.className = "not-crossed"
        }


        li.appendChild(toggleButton)
        li.appendChild(newButton)

        ulList.appendChild(li)
    }
}

const Add = () => {
    let input = document.getElementById("input-todo");
    todos.push({ todo: input.value, completed: false })
    input.value = ''

    DisplayTodos()
}

const Remove = (event) => {
    let index = event.target.id
    index = index.slice(7)

    todos.splice(index, 1)

    DisplayTodos()
}

const Toggle = (event) => {
    let index = event.target.id
    index = index.slice(7)

    todos[index].completed = todos[index].completed ? false : true

    DisplayTodos()
}

const ToggleAll = () => {
    for (let i = 0; i < todos.length; i++) {
        if (!todos[i].completed) {
            for (let j = 0; j < todos.length; j++) {
                todos[j].completed = true
            }
            DisplayTodos()
            return
        }
    }
    for (let i = 0; i < todos.length; i++) {
        todos[i].completed = false
    }

    DisplayTodos()
}

const Edit = (event) => {
    index = event.target.id
    index = index.slice(5)

    let li = document.getElementById(event.target.id)
    let input = document.createElement('input')
    input.id = 'input-d'

    input.value = ' ' + li.innerText.slice(0, li.innerText.length - 1)

    li.replaceWith(input)

    input.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            todos[index].todo = input.value
            DisplayTodos()
        }
    })

    window.addEventListener('click', (event) => {
        if (event.target !== document.getElementById('input-d')) {
            DisplayTodos()
        }
    })
}

const DeleteAll = () => {
    todos.splice(0, todos.length)
    DisplayTodos()
}

let addButton = document.getElementById("add-todo-button")
addButton.addEventListener('click', Add)

let toggleAllButton = document.getElementById("toggle-all-button")
toggleAllButton.addEventListener('click', ToggleAll)

let deleteAllButton = document.getElementById("delete-all-button")
deleteAllButton.addEventListener('click', DeleteAll)

let addInput = document.getElementById("input-todo")
addInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        Add()
    }
})