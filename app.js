// Sélectionne les éléments du DOM nécessaires pour la gestion de la liste de tâches
const todoForm = document.querySelector('form'); // Sélectionne le formulaire des tâches
const todoInput = document.getElementById('todo-input'); // Sélectionne le champ de saisie des nouvelles tâches
const todoListUL = document.getElementById('todo-list'); // Sélectionne l'élément UL où les tâches seront affichées

// Initialise la liste des tâches en récupérant les tâches sauvegardées depuis le stockage local
let allTodos = getTodos();
// Met à jour l'affichage de la liste des tâches
updateTodoList();

// Ajoute un gestionnaire d'événements pour l'envoi du formulaire
todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
    addTodo(); // Ajoute une nouvelle tâche
});

// Fonction pour ajouter une nouvelle tâche
function addTodo(){
    const todoText = todoInput.value.trim(); // Récupère et nettoie la saisie de l'utilisateur
    if (todoText.length > 0){
        allTodos.push(todoText); // Ajoute la tâche à la liste
        updateTodoList(); // Met à jour l'affichage de la liste des tâches
        saveTodos(); // Sauvegarde les tâches dans le stockage local
        todoInput.value = ""; // Vide le champ de saisie
    }
}

// Fonction pour mettre à jour l'affichage de la liste des tâches
function updateTodoList(){
    todoListUL.innerHTML = ""; // Vide l'élément UL
    allTodos.forEach((todo, todoIndex) => { // Parcourt chaque tâche de la liste
        const todoItem = createTodoItem(todo, todoIndex); // Crée un élément de tâche
        todoListUL.append(todoItem); // Ajoute l'élément de tâche à l'UL
    });
}

// Fonction pour créer un élément de tâche
function createTodoItem(todo, todoIndex){
    const todoId = "todo-" + todoIndex; // Génère un identifiant unique pour la tâche
    const todoLI = document.createElement("li"); // Crée un élément LI
    todoLI.className = "todo"; // Ajoute une classe CSS à l'élément LI
    todoLI.innerHTML = 
    `<input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>
                <label for="${todoId}" class="todo-text"> ${todo} </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>`;

    const deleteButton = todoLI.querySelector(".delete-button"); // Sélectionne le bouton de suppression de la tâche
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex); // Ajoute un gestionnaire d'événements pour supprimer la tâche lorsqu'on clique sur le bouton
    })
    return todoLI; // Retourne l'élément de tâche
}

// Fonction pour supprimer une tâche de la liste
function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex); // Filtre la liste pour exclure la tâche à supprimer
    saveTodos(); // Sauvegarde la liste mise à jour dans le stockage local
    updateTodoList(); // Met à jour l'affichage de la liste des tâches
}

// Fonction pour sauvegarder les tâches dans le stockage local
function saveTodos() {
    const todosJson = JSON.stringify(allTodos); // Convertit la liste des tâches en JSON
    localStorage.setItem("todos", todosJson); // Sauvegarde les tâches dans le stockage local
}

// Fonction pour récupérer les tâches depuis le stockage local
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]"; // Récupère les tâches ou une liste vide si aucune tâche n'est sauvegardée
    return JSON.parse(todos); // Convertit le JSON en objet JavaScript
}
