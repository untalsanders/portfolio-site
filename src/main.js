class ProjectList extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
    }

    connectedCallback() {
        console.log('ProjectList component added to the DOM')
    }

    disconnectedCallback() {
        console.log('ProjectList component removed from the DOM')
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`)
    }

    render() {
        const template = document.querySelector('#project-list-template')
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

customElements.define('project-list', ProjectList)