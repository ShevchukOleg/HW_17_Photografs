
/**
 *  класс обратотки изображений
 */
class ImageUI {
    constructor() {
        this._imagesContainer = document.querySelector(".images-wrap .row");
    }

    /**
     * вставка изображения в разметку
     * @param {file} image - изображение 
     */
    addImage(image) {
        const template = ImageUI._imageTemplate(image);
        this._imagesContainer.insertAdjacentHTML("afterbegin", template);
    }

    removeImage(id) {
        // home task
    }

    /**
     * очистка разметки
     */
    clearContainer() {
        this._imagesContainer.innerHTML = "";
    }

    /**
     * создание разметки для дальнейшего вывода изображения
     * @param {string} url -адресс
     * @param {object} views - количество просмотров
     * @param {object} likes количество лайков
     * @param {string} _id идентификатор  
     */
    static _imageTemplate({url, views, likes, _id}) {
        return `
        <div class="col-4 col">
            <div class="img-wrap" data-img-id="${_id}">
                <img src="${url}" alt="">
                <div class="on-hover d-flex flex-column justify-content-between">
                    <div class="remove-wrap d-flex">
                        <i class="fas fa-trash-alt ml-auto"></i>
                    </div>

                    <div class="img-info d-flex align-items-center">
                        <span class="views-count d-flex align-items-center">
                            <i class="fas fa-eye"></i>
                            ${views.length}
                        </span>
                        <span class="likes-count d-flex align-items-center ml-5">
                            <i class="fas fa-thumbs-up"></i>
                            ${likes.length}
                        </span>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- /.col-4 col -->
        `;
    }
}