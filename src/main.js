import './styles.css'
import data from './data.json'

class ProjectList extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
    }

    render() {
        const template = document.querySelector('#project-list-template')
        const templateContent = template.content

        const projectItemTemplate = document.querySelector('#project-item-template').content
        const img = projectItemTemplate.querySelector('img')
        img.src = data.projects[0].image
        img.alt = 'Project Image'

        console.log(img)


        this.shadowRoot.appendChild(templateContent.cloneNode(true))
    }
}

class ProjectItem extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const id = this.id
        const name = this.name
        const description = this.description
        const repository = this.repository
        const image = this.image
        const url = this.url

        this.render()
    }

    render() {
        const template = document.querySelector('#project-item-template')
        const templateContent = template.content

        const titleProject = templateContent.querySelector('.project-card__title')
        titleProject.textContent = this.name
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

class EditableList extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })

        const editableListContainer = document.createElement('div')

        const title = this.title
        const addItemText = this.addItemText
        const listItems = this.items

        editableListContainer.classList.add('editable-list')

        editableListContainer.innerHTML = /*html*/`
            <style>
                li, div > div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .icon {
                    background-color: #fff;
                    border: none;
                    cursor: pointer;
                    float: right;
                    font-size: 1.8rem;
                }
            </style>

            <h2>${title}</h2>
            <ul class="item-list">
                ${listItems.map(item => /*html*/`
                    <li>
                        ${item}
                        <button class="editable-list-remove-item icon">&ominus;</button>
                    </li>
                `).join('')}
            </ul>
            <div>
                <label>${addItemText}</label>
                <input class="add-new-list-item-input" type="text">
                <button class="editable-list-add-item icon">&oplus;</button>
            </div>
        `

        this.addListItem = this.addListItem.bind(this)
        this.handleRemoveItemListener = this.handleRemoveItemListener.bind(this)
        this.removeListItem = this.removeListItem.bind(this)

        shadow.appendChild(editableListContainer)
    }

    get title() {
        return this.getAttribute('title') || ''
    }

    get items() {
        const items = []

        Array.from(this.attributes).forEach(attr => {
            if (attr.name.includes('list-item')) {
                items.push(attr.value)
            }
        })

        return items
    }

    get addItemText() {
        return this.getAttribute('add-item-text') || ''
    }

    connectedCallback() {
        const removeElementButtons = [...this.shadowRoot.querySelectorAll('.editable-list-remove-item')]
        const addElementButton = this.shadowRoot.querySelector('.editable-list-add-item')

        this.itemList = this.shadowRoot.querySelector('.item-list')

        this.handleRemoveItemListener(removeElementButtons)
        addElementButton.addEventListener('click', this.addListItem, false)
    }

    addListItem(e) {
        const textInput = this.shadowRoot.querySelector('.add-new-list-item-input')

        if (textInput.value) {
            const li = document.createElement('li')
            const button = document.createElement('button')
            const childrenLength = this.itemList.children.length

            li.textContent = textInput.value
            button.classList.add('editable-list-remove-item', 'icon')
            button.innerHTML = '&ominus;'

            this.itemList.appendChild(li)
            this.itemList.children[childrenLength].appendChild(button)

            this.handleRemoveItemListener([button])

            textInput.value = ''
        }
    }

    handleRemoveItemListener(arrayOfElements) {
        arrayOfElements.forEach(element => element.addEventListener('click', this.removeListItem, false))
    }

    removeListItem(e) {
        e.target.parentNode.remove()
    }
}

customElements.define('editable-list', EditableList)
customElements.define('project-list', ProjectList)
customElements.define('project-item', ProjectItem)






















// const pageContainer = document.querySelector('.page__container')
// const projectListTemplate = document.querySelector('#project-list-template')
// pageContainer.appendChild(projectListTemplate.content.cloneNode(true))

// const { projects } = data

// projects.forEach(project => {
//     const projectItem = document.createElement('project-item')
//     projectItem.setAttribute('name', project.name)
//     projectItem.setAttribute('description', project.description)
//     projectItem.setAttribute('repository', project.repository)
//     projectItem.setAttribute('image', project.image)
//     projectItem.setAttribute('url', project.url)
// })

// const shadowRoot = document.querySelector('project-list').shadowRoot
// console.log(shadowRoot)