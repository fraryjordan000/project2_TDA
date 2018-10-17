
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
    document.getElementById('tab-link-2').style.pointerEvents = "auto";
    document.getElementById('tab-link-2').style.cursor = "pointer";
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
        document.getElementsByClassName('editTask')[0].style.visibility = "visible";
    } else {
        $('#T'+index).removeClass('taskSelected');
        selectedTask = undefined;
        document.getElementsByClassName('editTask')[0].style.visibility = "hidden";
    }
}

function checked(index) {
    listMaster[selectedList].tasks[index].state = !(listMaster[selectedList].tasks[index].state);
    reloadTasks();
}

//Due to a strange error, multiple passes must be made to remove all marked tasks
function removeChecks() {
    let done = false;
    while(done == false) {
        if(listMaster[selectedList].tasks.length > 1) {
            for(let i in listMaster[selectedList].tasks) {
                if(listMaster[selectedList].tasks[i].state){
                    listMaster[selectedList].tasks.splice(i, 1);
                }
            }
            reloadTasks();
            for(let i in listMaster[selectedList].tasks) {
                if(listMaster[selectedList].tasks[i].state == false){
                    done = true;
                } else {
                    done = false;
                    break;
                }
            }
        } else {
            listMaster[selectedList].tasks = [];
            done = true;
        }
    }
    
    reloadTasks();
}

function editName() {
    let newName = document.getElementById('newTaskName').value;

    listMaster[selectedList].tasks[selectedTask].name = newName;
    document.getElementById('newTaskName').value = "";
    reloadTasks();
}