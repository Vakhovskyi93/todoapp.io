



let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// создание элемента
let ul = document.querySelector(".list-group");//получаем <ul> с классом .list-group
let form = document.forms['addTodoItem']; //получаем формус классом .addTodoItem
let inputText = form.elements['todoText']; // получения инпута в форме
let notificationAlert = document.querySelector('.notification-alert')

let bD = document.getElementById('button')

function listTemplate(task) {
    let li = document.createElement('li'); //Создает новый элемент с  тегом li

    li.className = 'list-group-item d-flex aligh-items-center'; // присваиваем класс
    li.setAttribute('data-id', task.id);
    let span = document.createElement('span');
    span.textContent = task.text; // + текст
    let iDelete = document.createElement('i'); //Создает новый элемент с  тегом i
    iDelete.className = 'fas fa-trash-alt delete-item ml-4'; // присваиваем класс

    let iEdit = document.createElement('i'); //Создает новый элемент с  тегом i
    iEdit.className = 'fas fa-edit edit-item ml-auto'; // присваиваем класс


    li.appendChild(span);
    li.appendChild(iEdit);
    li.appendChild(iDelete); //Добавляет iDelete в конец элемента li

    return li;
}

// generate id

function generateId() {
    let id = '';
    let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLXCVBNM';
    for (let i = 0; i < 15; i++) {
       let position = Math.floor(Math.random() * words.length);
       id += words[position]
    }
return id
}

function clearList() {
    ul.innerHTML = ''; //чистая строка в ul
    

}

function generateList(tasksArray) {       // создание масива тасков

    clearList(); //очистка тасков


    for (let i = 0; i < tasksArray.length; i++) {
        let li = listTemplate(tasksArray[i]);
        
        ul.appendChild(li)
    }

}
function addList(list) { // добавление в лист
    let newTask = {
        id:generateId(),
        text:list

    };
    tasks.unshift(newTask)
    ul.insertAdjacentElement('afterbegin', listTemplate(newTask));
    

    localStorage.setItem('tasks', JSON.stringify(tasks));

    // generateList(tasks);

}

function deleteListItem(id) {
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        }
    }
    remoweTask()
    emptyList()
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

bD.addEventListener('click', function () {   //Удаление всего списка
    tasks.length = 0;
    while (ul.lastChild) {
        ul.removeChild(ul.lastChild);
    }
    localStorage.setItem('tasks', JSON.stringify(''))
});

function message(settings) {
    notificationAlert.classList.add(settings.cssClass);
    notificationAlert.textContent = settings.text;
    notificationAlert.classList.add('show');
    setTimeout(function () {
        notificationAlert.classList.remove('show');

    }, settings.timeout);

}

function editListItem(id, newValue){
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].text = newValue;
            break;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    message({
        text: "Task updated success",
        cssClass: 'alert-success',
        timeout: 4000
    });



}

ul.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-item') ){
        let parent = e.target.closest('li');// поиск родителя li
        let id = parent.dataset.id;
        deleteListItem(id);
        parent.remove()
    } else if ( e.target.classList.contains('edit-item')){
        e.target.classList.toggle('fa-save');

        let id = e.target.closest('li').dataset.id;
        let span = e.target.closest('li').querySelector('span');

        span.setAttribute('contenteditable',true);
        span.focus();
        if (e.target.classList.contains('fa-save')) {
            span.setAttribute('contenteditable',true);
            span.focus()
        } else {
            span.setAttribute('contenteditable',false);
            span.blur();
            editListItem(id, span.textContent);
        }
    }

});
form.addEventListener('submit', function (e) {
    e.preventDefault(); //предотвращает действие браузера

    if (!inputText.value) {            //Проверка на наличие текста в импуте
    inputText.classList.add('is-invalid');  // если нет, присвоить класс...
        let AddId = document.getElementById('add').style.display='none';

    } else {
        inputText.classList.remove('is-invalid');
        addList(inputText.value);
        newTaskAddedShow()
        form.reset();
    }
});




generateList(tasks);

function newTaskAddedShow() {

let AddId = document.getElementById('add').style.display='block'; // Отображаем div при добавлении таска
}

function remoweTask() {
    let removeId = document.getElementById('remowe-task').style.display='block';

}

function emptyList() {

        if (!tasks.length){
            let emptyList = document.getElementById('emptyList').style.display='block';
            let removeId = document.getElementById('remowe-task').style.display='none';
        }

    }


























