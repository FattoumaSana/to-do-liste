// Sélection des éléments du DOM
var addTaskBtn = document.getElementById('addTaskBtn');
var taskInput = document.getElementById('taskInput');
var taskList = document.getElementById('taskList');

// Fonction pour mettre la première lettre en majuscule
function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Fonction pour ajouter une tâche
function addTask() {
    var taskText = taskInput.value.trim();

    // Vérification si le champ de saisie est vide
    if (taskText === "") {
        alert("Veuillez entrer une tâche.");
        return;
    }

    // Mettre la première lettre en majuscule
    taskText = capitalizeFirstLetter(taskText);

    // Génération d'un identifiant unique pour chaque tâche
    var taskId = 'task-' + Date.now();

    // Création d'un élément de tâche
    var li = document.createElement('li');
    li.id = taskId;
    li.classList.add('task-item');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete">Supprimer</button>
    `;

    // Ajout de la tâche à la liste
    taskList.appendChild(li);

    // Réinitialisation de l'input
    taskInput.value = "";

    // Mettre à jour les événements pour la nouvelle tâche
    updateTaskEvents();
}

// Fonction pour marquer la tâche comme terminée
function toggleTaskCompletion(event) {
    event.target.classList.toggle('completed');
}

// Fonction pour supprimer la tâche
function deleteTask(event) {
    event.stopPropagation();  // Empêche l'événement de se propager au parent (li)
    var li = event.target.closest('li'); // Trouver le parent li
    li.remove(); // Supprimer l'élément
    updateTaskEvents();  // Mettre à jour les événements après suppression
}

// Fonction pour mettre à jour les événements liés aux tâches
function updateTaskEvents() {
    // Sélectionner tous les éléments li avec la classe 'task-item'
    var taskItems = Array.from(document.getElementsByClassName('task-item'));
    var deleteButtons = Array.from(document.getElementsByClassName('delete'));

    // Ajouter des événements pour marquer comme terminé
    for (var i = 0; i < taskItems.length; i++) {
        taskItems[i].addEventListener('click', toggleTaskCompletion);
    }

    // Ajouter des événements pour supprimer les tâches
    for (var j = 0; j < deleteButtons.length; j++) {
        deleteButtons[j].addEventListener('click', deleteTask);
    }
}

// Gestionnaire de clic pour le bouton "Ajouter"
addTaskBtn.addEventListener('click', addTask);

// Gestionnaire pour appuyer sur "Entrée" dans l'input
taskInput.addEventListener('keypress', function (event) {
    if (event.key === "Enter") { // Vérifie si la touche pressée est "Entrée"
        addTask();
    }
});

// Initialiser les événements au chargement de la page
updateTaskEvents();
