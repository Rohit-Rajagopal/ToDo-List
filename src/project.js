class Project {
    toDoList = {};

    constructor(title) {
        this.title = title;
    }

    addItem(toDoItem) {
        this.toDoList[toDoItem.title] = toDoItem;
    }
}

class ToDoItem {
    constructor(title, description = '', dueDate = '', priority = '0') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export {Project, ToDoItem};