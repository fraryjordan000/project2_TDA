
function newList() {
    let listName = document.getElementById('listName').value;

    if(listName.length > 0) {
        listMaster.push({id: listMaster.length, title: listName.title});
        addList(listMaster.length, listName);
    }
}