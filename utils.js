
//Store data
class Data {
    static saveList(listId, list){
        let listString = JSON.stringify(list);
        localStorage.setItem(listId, listString);
    }
    static getList(listId){
        let list = localStorage.getItem(listId);
        return JSON.parse(list);
    }
    static removeList(listId){
        localStorage.removeItem(listId);
    }
}

var listMaster;
var listContainer;
var taskContainer;

function loadContainers() {
    listContainer = $('#listContainer');
    taskContainer = $('#taskContainer');
}

function loadLists() {
    if(Data.getList(0) != null) {
        listMaster = Data.getList(0);
    } else {
        listMaster = [];
    }

    reloadLists();
}

function unloadLists() {
    Data.saveList(0, listMaster);
}

function reloadLists() {
    $('#listContainer').children('div').remove();
    for(let i in listMaster){
        addList(i, listMaster[i].title);
    }
}

function reloadTasks() {
    $('#taskContainer').children('div').remove();
    for(let i in listMaster[selectedList].tasks) {
        addTask(i, listMaster[selectedList].tasks[i].name, listMaster[selectedList].tasks[i].state);
    }
    selectedTask = undefined;
}

function addList(index, title) {
    listContainer.append(`<div id="LO${listMaster[index].id}" class="listObject"><span onclick="taskTab(${index})">${title}</span> <i class="material-icons" onclick="rmList(${index})">delete</i></div>`);
}

function addTask(index, name, state) {
    let value;
    if(state){
        value = "check_box";
    } else {
        value = "check_box_outline_blank";
    }
    taskContainer.append(`<div id="T${index}" class="task"><span onclick="selectTask(${index})">${name}</span><i class="material-icons" onclick="checked(${index})">${value}</i></div>`);
}