import {Project, ToDoItem} from './project.js';
import { DomManager } from './dom.js';


class Manager {
    projects = {};
    domManager = new DomManager();
    curProj = null;
    projectSelector = document.querySelector('#project-selector')
    newProjName = document.querySelector('.proj-name');
    newProjConfirm = document.querySelector('.confirm-proj-name');

    constructor() {
        this.projects['Default'] = new Project('Default');
        this.domManager.addProject('Default');
        this.domManager.showProject(this.projects['Default'])
        this.curProj = 'Default';
        this.projectSelector.addEventListener('change', (e) => {
            this.domManager.showProject(this.projects[this.projectSelector.value]);
            this.curProj = this.projectSelector.value;
        });
        this.newProjConfirm.addEventListener('click', () => {this.createNewProject(this.newProjName.value)});
    }

    createNewProject(title) {
        const newProj = new Project(title);
        this.projects[title] = newProj;
        this.domManager.addProject(title);
    }
}

const manager = new Manager();