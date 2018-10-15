
function newList() {
    let listName = document.getElementById('listName').value;

    if(listName.length > 0) {
        listMaster.push({id: listMaster.length, title: listName});
        addList(listMaster.length - 1, listName);
    }

    document.getElementById('listName').value = "";
}

function rmList(index) {
    if(index > 0){
        listMaster.splice(index-1, index);
    } else {
        listMaster = [];
    }

    reloadLists();
}