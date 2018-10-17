
var selectedList;
var selectedTask;

function newList() {
    let listName = document.getElementById('listName').value;

    if(listName.length > 0) {
        listMaster.push({id: listMaster.length, title: listName});
        addList(listMaster.length - 1, listName);
    }

    document.getElementById('listName').value = "";
}

function rmList(index) {
    listMaster.splice(index, 1);

    reloadLists();
}

$('#listName').on('keydown', function(e) {
    if(e.which == 13) {
        newList();
    }
});

$('#taskName').on('keydown', function(e) {
    if(e.which == 13) {
        newTask();
    }
});

function taskTab(index) {
    document.getElementById('tab-link-2').click();
    selectedList = index;
    $('#listTitle').html(listMaster[index].title);
    reloadTasks();
}

function newTask() {
    let taskName = document.getElementById('taskName').value;

    if(taskName.length > 0) {
        if(listMaster[selectedList].tasks == undefined) {
            listMaster[selectedList].tasks = [];
        }
        listMaster[selectedList].tasks.push({id: listMaster[selectedList].tasks.length, name: taskName, state: false});
        addTask(listMaster[selectedList].tasks.length - 1, taskName);
    }

    document.getElementById('taskName').value = "";
}

function rmTask() {
    if(selectedTask != undefined) {
        listMaster[selectedList].tasks.splice(selectedTask, 1);
        selectedTask = undefined;
        $('#taskSelection').html('Selected: None');
        reloadTasks();
    }
}

function selectTask(index) {
    if(($('#T'+index).attr('class')).search('taskSelected') == -1) {
        $('#T'+index).addClass('taskSelected');
        if(selectedTask != undefined) {
            $('#T'+selectedTask).removeClass('taskSelected');
        }
        selectedTask = index;
        $('#taskSelection').html('Selected: ' + listMaster[selectedList].tasks[selectedTask].name);
    }
}