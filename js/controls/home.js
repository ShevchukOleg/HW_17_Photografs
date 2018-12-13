// Init User Service
const user = new UserService();
//Image Servise
const imageService = new ImageService();
// Init User UI
const userUI = new UserUI();
// Init Image UI
const imageUI = new ImageUI();
// Init Image Modal
const imageModal = new ImageModal();
// UI elements
const inputCover = document.getElementById("coverImg");
const inputUserPhotos = document.getElementById("userPhotos");
const imgWrapper = document.querySelector("div.images-wrap");
const modal = document.querySelector("div.modal-body");

/**
 * onLoad - обработчик события звгрузки страницы, активирует методы экземпляра объекта UserService
 * данные полученные в ответе сервера отправляются в метод UserUI.renderUserInfo который сепарирует данные
 * для отображения на странице, очищается темплейт, и вставляются изображения
 * @param {*} e 
 */
function onLoad(e) {
    user.getInfo()
        .then((data) => {
            userUI.renderUserInfo(data);
            return data;
        })
        .then((data) => {
            imageUI.clearContainer();
            data.my_images.forEach((img) => imageUI.addImage(img));
        })
        .catch((error) => {
            console.log(error);
        });
}
/**
 * onCoverUpload - обработчик на событие загрузки файла спроверкой состояния, и передачей на
 * user.uploadCover он запрашивает обновленную информацию, распарсивает ее и устанавливает новый
 * фон
 * @param {*} e 
 */
function onCoverUpload(e) {
    if (inputCover.files.length) {
        const [newCover] = inputCover.files;
        user.uploadCover(newCover)
            .then(user.getInfo)
            .then((data) => userUI.setCover(data.cover))
            .catch((error) => {
                console.log(error);
            });
    }
}
/**
 * onPhotosUpload -  обработчик отправки пользовательских изображаний с выводом изображения
 * @param {Event} e 
 */
function onPhotosUpload(e){
    e.stopPropagation;
    
    if(inputUserPhotos.files.length){
        const userPhoto =  inputUserPhotos.files;
        const arrFiles = [];
        for(let kay in userPhoto){
            if(isFinite(kay)){ 
                arrFiles.push(userPhoto[kay]);
            }
        }
        arrFiles.forEach((photo) => {
            user.loadPhoto(photo)
                .then(user.getInfo)
                .then((data) => {
                    userUI.renderUserInfo(data);
                    return data;
                })
                .then((data) => {
                    imageUI.clearContainer();
                    data.my_images.forEach((img) => imageUI.addImage(img));
                })
                //Нужно обнулить состояние инпута, не знаю как
        })
    }
}
/**
 * imageOpertion  - обработчик оперций с картинками пользователя
 * @param {Event} e  - клик по полю в котором размещены изображения пользователя
 */
function imageOpertion(e){
    e.stopPropagation;
    
    if(e.target.classList.contains("fa-trash-alt")) {
        const imgId = e.target.closest("[data-img-id]").dataset.imgId;
        const imgUrlParametr = e.target.closest("[data-img-id]").querySelector("img").src.slice(80);
        const confirmation = confirm(`Действительно удалить изображение № ${imgId}?`);
        if(confirmation){
            user.deletePhoto(imgId, imgUrlParametr)
            .then(user.getInfo)
            .then((data) => {
                userUI.renderUserInfo(data);
                return data;
            })
            .then((data) => {
                imageUI.clearContainer();
                data.my_images.forEach((img) => imageUI.addImage(img));
            })
        }
    };

    if (e.target.classList.contains("on-hover")) {
        const id = e.target.closest("[data-img-id]").dataset.imgId;
        $('#imageModal').modal('toggle');

        imageService.getInfo(id)
            .then((data) => imageModal.renderInfo(data))
            .catch((error) => {
                console.log(error);
            });
    };

}

function modalOperations(e) {
    e.stopPropagation;
    e.preventDefault();

    if (e.target.classList.contains("btn-primary")) {
        const imgID = e.target.closest("div.modal-body").querySelector("[data-id]").dataset.id;
        const form = e.target.closest("form");
        
        user.sendNewComment(imgID, form)
            // .then(
            //     imageService.getInfo(imgID)
            //     .then((data) => imageModal.renderInfo(data))
            //     .catch((error) => {
            //     console.log(error);
            //     })
            // )
            //Затык с модаьным окном как эго закрыть вместе с прелодером $('#imageModal').modal('toggle');
    } else if (e.target.classList.contains("fa-trash-alt")){
        const comId = e.target.closest("div.comment-item-details").dataset.commentId;
        const pictureId = e.target.closest("div.modal-body").querySelector("[data-id]").dataset.id;
        user.deleteComment(comId, pictureId);
    }
}



// Events
window.addEventListener("load", onLoad);

/**
 * присвоения события на загрузщик фона
 */
inputCover.addEventListener("change", onCoverUpload);
/**
 * присвоение события отправи пользовательского изображения
 */
inputUserPhotos.addEventListener("change", onPhotosUpload);

/**
 * присвоение события клика по галерее изображений
 */
imgWrapper.addEventListener("click", imageOpertion);

/**
 * присвоение клика на модальное окно
 */
modal.addEventListener("click", modalOperations);


// Remove loader
$('#imageModal').on('hidden.bs.modal', (e) => imageModal.loaderToggle());