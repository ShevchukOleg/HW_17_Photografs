/**
 * UserUI - класс отображения информации пользователя
 * 
 */
class UserUI {
    /**
     * конструктор определяющий елементы интерфкйса для вывода информации пользователя
     */
    constructor() {
        this._cover = document.querySelector(".user-cover");
        this._userAvatar = document.querySelector(".user-ava");
        this._userName = document.querySelector(".user-name");
    }
    /**
     * renderUserInfo - метод принимающий ответ сервера, разделяет на компонентыинформацию
     * для дальнейшей обработки
     * @param {string} avatar - зашифрованное изображение
     * @param {file} cover - фон
     * @param {string} full_name - имя пользователя
     */
    renderUserInfo({avatar, cover, full_name}) {
        this.setCover(cover);
        this.setAvatar(avatar);
        this.setName(full_name);
    }

    /**
     * setCover - метод замены фона
     * @param {*} url - путь к изображению (откуда?)
     */
    setCover(url) {
        this._cover.style.background = `url("${url}") no-repeat center / cover`;
    }

    /**
     * setAvatar - метод который изменяет аватар, создает место для отображения
     * @param {*} url - путь к изображению
     */

    setAvatar(url) {
        const template = `<img src="${url}" alt="">`;
        this._userAvatar.innerHTML = "";
        this._userAvatar.insertAdjacentHTML("afterbegin", template);
    }

    /**
     * setName -  вставка имени пользователя на страницу
     * @param {String} name - имя пользователя
     */

    setName(name) {
        this._userName.textContent = name;
    }
}