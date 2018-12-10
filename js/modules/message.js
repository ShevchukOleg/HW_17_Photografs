class Message {
    constructor() {
        this._messageContainer;
    }

    init() {
        this._setContainer();
    }

    show({text, error}) {
        const template = Message._createMessageTemplate(text, error);
        this._messageContainer.insertAdjacentHTML("afterbegin", template);
    }

    _setContainer() {
        const template = "<div class='message-container'></div>";
        document.body.insertAdjacentHTML("afterbegin", template);
        this._messageContainer = document.querySelector(".message-container");
    }

    static _createMessageTemplate(text, error) {
        return `
            <div class="alert ${error ? 'alert-danger' : 'alert-success'}">${text}</div>
        `;
    }
}