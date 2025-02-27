import './style.css'

const todos = []

const DisplayTodos = () => {
    let ulList = document.getElementById("todos-list")
    ulList.innerHTML = ""
    document.getElementById("counter").innerText = todos.length + " Left"

    for (let i = 0; i < todos.length; i++) {
        let li = document.createElement('li')
        li.id = 'li' + i

        // Remove for each li

        let newRemove = document.createElement('button')
        newRemove.id = 'remove-' + i
        newRemove.addEventListener('click', Remove)
        newRemove.innerHTML = 'X'

        // Toggle for each li

        let toggleButton = document.createElement('input')
        toggleButton.type = 'checkbox'
        toggleButton.id = 'toggle-' + i
        toggleButton.addEventListener('click', Toggle)

        if (todos[i].completed) {
            toggleButton.checked = true
            li.className = "crossed both"
        } else {
            toggleButton.checked = false
            li.className = "not-crossed both"
        }

        let span = document.createElement('span');
        span.innerText = todos[i].todo
        span.id = 'edit-' + i
        span.addEventListener('dblclick', (event) => {
            Edit(event)
        })

        li.appendChild(toggleButton)
        li.appendChild(span)
        li.appendChild(newRemove)

        ulList.appendChild(li)
    }
}

const Add = () => {
    let input = document.getElementById("input-todo");
    if (input.value !== undefined && input.value !== null && input.value !== '') {
        todos.push({ todo: input.value, completed: false })
        input.value = ''
    }

    saveStorage()
    DisplayTodos()
}

const Remove = (event) => {
    let index = event.target.id
    index = index.slice(7)

    todos.splice(index, 1)

    saveStorage()
    DisplayTodos()
}

const Toggle = (event) => {
    let index = event.target.id
    index = index.slice(7)

    todos[index].completed = todos[index].completed ? false : true

    saveStorage()
    DisplayTodos()
}

const ToggleAll = () => {
    for (let i = 0; i < todos.length; i++) {
        if (!todos[i].completed) {
            for (let j = 0; j < todos.length; j++) {
                todos[j].completed = true
            }
            saveStorage()
            DisplayTodos()
            return
        }
    }
    for (let i = 0; i < todos.length; i++) {
        todos[i].completed = false
    }

    saveStorage()
    DisplayTodos()
}

const Edit = (event) => {
    index = event.target.id
    index = index.slice(5)

    let li = document.getElementById(event.target.id)
    let input = document.createElement('input')
    input.id = 'input-d'

    input.value = li.innerText.slice(0, li.innerText.length)

    li.replaceWith(input)

    input.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            if (input.value !== '' && input.value !== null && input.value !== undefined && input.value !== ' ') {
                todos[index].todo = input.value
                saveStorage()
                DisplayTodos()
            } else {
                window.alert("Please Don't Leave This Blank")
            }
        }
    })

    window.addEventListener('click', (event) => {
        if (event.target !== document.getElementById('input-d')) {
            saveStorage()
            DisplayTodos()
        }
    })
}

const saveStorage = () => {
    let savedArray = []
    for (let i = 0; i < todos.length; i++) {
        savedArray.push(todos[i]);
        console.log(savedArray)
    }
    localStorage.setItem("array", JSON.stringify(savedArray))
}

const loadStorage = () => {
    const loadArray = JSON.parse(localStorage.getItem("array"))
    console.log(loadArray)

    for (let i = 0; i < loadArray.length; i++) {
        todos.push(loadArray[i])
    }
}

const DeleteAll = () => {
    todos.splice(0, todos.length)
    saveStorage()
    DisplayTodos()
}

const DeleteCompleted = () => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed === true) {
            todos.splice(i, 1)
            i -= 1
        }
    }
    saveStorage()
    DisplayTodos()
}

let addButton = document.getElementById("add-todo-button")
addButton.addEventListener('click', Add)

let toggleAllButton = document.getElementById("toggle-all-button")
toggleAllButton.addEventListener('click', ToggleAll)

let deleteAllButton = document.getElementById("delete-all-button")
deleteAllButton.addEventListener('click', DeleteAll)

let deleteAllCompleted = document.getElementById("delete-completed-button")
deleteAllCompleted.addEventListener('click', DeleteCompleted)

let addInput = document.getElementById("input-todo")
addInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        Add()
    }
})

loadStorage()
DisplayTodos()