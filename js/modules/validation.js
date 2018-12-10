class Validation {
    constructor(form) {
        this._form = form;
        this._inputs = this._form.querySelectorAll("[data-pattern]");
    }

    init() {
        this._setEvents();
    }

    check() {
        let state = true;

        this._inputs.forEach((input) => {
            const regExp = new RegExp(input.dataset.pattern);
            if (!regExp.test(input.value)) {
                input.classList.add("is-invalid");
                state = false;
            }
        });

        return state;
    }

    _setEvents() {
        this._inputs.forEach((input) => input.addEventListener("focus", (e) => this._onFocusHandler(e)));
    }

    _onFocusHandler(e) {
        e.target.classList.remove("is-invalid");
    }
}