import {Project, ToDoItem} from './project.js';
import { DomManager } from './dom.js';
import { StorageManager } from './storage.js';
import './styles.css';

class Manager {
    projects = {};
    domManager = new DomManager();
    storageManager = new StorageManager();
    curProj = null;
    projectSelector = document.querySelector('#project-selector')
    newProjName = document.querySelector('.proj-name');
    newProjConfirm = document.querySelector('.confirm-proj-name');
    newItemForm = document.querySelector('#newItemForm');

    constructor() {
        if (this.storageManager.storageAvailable() && this.storageManager.dataStored()) {
            this.loadProjects(this.storageManager.loadData());
        }
        else {
            this.projects['Default'] = new Project('Default');
            this.domManager.addProject('Default');
        }
        this.domManager.showProject(this.projects['Default']);
        this.curProj = 'Default';
        this.projectSelector.addEventListener('change', (e) => {
            this.domManager.showProject(this.projects[this.projectSelector.value]);
            this.curProj = this.projectSelector.value;
        });
        this.newProjConfirm.addEventListener('click', () => {this.createNewProject(this.newProjName.value)});
        this.newItemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let data = new FormData(this.newItemForm);
            this.addItem(data.get('title'), data.get('description'), data.get('dueDate'), data.get('priority'));
            this.newItemForm.reset();
        });
    }

    createNewProject(title) {
        const newProj = new Project(title);
        this.projects[title] = newProj;
        this.domManager.addProject(title);
    }

    addItem(title, description, dueDate, priority) {
        let item = new ToDoItem(title, description, dueDate, priority);
        this.projects[this.curProj].addItem(item);
        this.domManager.showProject(this.projects[this.curProj]);
    }

    loadProjects(projObj) {
        for (let proj in projObj) {
            this.projects[proj] = new Project(proj);
            this.domManager.addProject(proj);
            for (let item of projObj[proj]) {
                let newItem = new ToDoItem(
                    item.title,
                    item.description,
                    item.dueDate,
                    item.priority,
                )
                this.projects[proj].addItem(newItem);
            }
        }
    }
}

const manager = new Manager();

window.addEventListener("beforeunload", () => {
    manager.storageManager.storeData(manager.projects);
});