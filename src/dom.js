class DomManager {
    content = document.querySelector('#content');
    projectSelector = document.querySelector('#project-selector');

    newProjDialog = document.querySelector('.newProjectForm');
    newProjConfirm = document.querySelector('.confirm-proj-name');
    newProjButton = document.querySelector('.create-proj');

    newItemDialog = document.querySelector('.newItemDialog');
    newItemButton = document.querySelector('.newItemButton');
    newItemConfirm = this.newItemDialog.querySelector('button');

    constructor() {
        this.newProjButton.addEventListener('click', () => {this.newProjForm()});
        this.newItemButton.addEventListener('click', () => {this.newItemForm()});
    }

    showProject(project) {
        this.content.innerHTML = ''
        
        const h2 = document.createElement('h2');
        h2.textContent = `${project.title}`
        const ol = document.createElement('ol');
        for (let item in project.toDoList) {
            let li = document.createElement('li');
            li.textContent = `${item}  Due Date:${project.toDoList[item].dueDate}`;
            li.setAttribute('data-name', item);
            li.setAttribute('data-clicked', false);
            ol.appendChild(li);
        }
        ol.addEventListener('click', (e) => {
            if (e.target.nodeName === 'LI') {
                if (e.target.dataset.clicked === 'false') {
                    e.target.innerHTML += `<br> Description: ${project.toDoList[e.target.dataset.name].description}`;
                    e.target.dataset.clicked = 'true';
                }
                else {
                    e.target.textContent = `${e.target.dataset.name}  Due Date:${project.toDoList[e.target.dataset.name].dueDate}`;
                    e.target.dataset.clicked = 'false';
                }
            }
        });
        this.content.appendChild(h2);
        this.content.appendChild(ol);
    }

    addProject(projectTitle) {
        const option = document.createElement('option');
        option.value = projectTitle;
        option.textContent = projectTitle;
        this.projectSelector.appendChild(option);
    }

    newProjForm() {
        this.newProjDialog.showModal();
        this.newProjConfirm.addEventListener('click', () => {
            this.newProjDialog.close()
        })
    }

    newItemForm() {
        this.newItemDialog.showModal();
        this.newItemConfirm.addEventListener('click', () => {
            this.newItemDialog.close()
        })
    }
}

export {DomManager};