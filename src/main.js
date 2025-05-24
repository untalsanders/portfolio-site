class ProjectList extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
    }

    render() {
        const template = document.querySelector('#project-list-template').content
        const clone = document.importNode(template, true)
        this.shadowRoot.appendChild(clone)
    }
}

customElements.define('project-list', ProjectList)