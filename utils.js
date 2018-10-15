
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
let listContainer = document.getElementById('listContainer');

function loadLists() {
    if(Data.getList(0) != null) {
        listMaster = Data.getList(0);
    } else {
        listMaster = [];
    }

    for(let i in listMaster){
        addList(i, listMaster[i].title);
    }
}

function unloadLists() {
    Data.saveList(0, listMaster);
}

function addList(index, title) {
    listContainer.innerHTML += `<div id="LO${listContainer[index].id}" class="listObject"><span onclick="console.log('Go to List View')">${title}</span> <i class="material-icons" onclick="console.log('delete')">delete</i></div>`;
}