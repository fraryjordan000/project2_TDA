
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

function loadContainer() {
    listContainer = $('#listContainer');
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
    for(let i in listMaster){
        addList(i, listMaster[i].title);
    }
}

function addList(index, title) {
    listContainer.append(`<div id="LO${listMaster[index].id}" class="listObject"><span onclick="">${title}</span> <i class="material-icons" onclick="rmList(${index})">delete</i></div>`);
}