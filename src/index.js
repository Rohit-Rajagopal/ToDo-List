import {Project, ToDoItem} from './project.js';


class Manager {
    projects = [];

    constructor() {
        this.projects.push(new Project('default'));
    }
}