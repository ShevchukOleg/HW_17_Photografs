/**
 * UserService - контроллер обратотки информации пользователя
 * @class 
 * 
 */

class UserService {

    /**
     * Запрос на получение данных о пользователе
     * @return {Object} обэект сперсенный из JSON
     */
    getInfo() {
        return new Promise((resolve, reject) => {
            const id = localStorage.getItem("social_user_id");

            fetch(`${env.apiUrl}/public/users/get-info/${id}`)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
    /**
     * uploadCover - метод отправки файла для изменения фона, через Form Data создаем материал для
     * отправки на сервер, добавляем в него файл и присваиваем эму имя через formData.append("coverImg", file)
     * достаем данные о реестации из локаьного хранилища и отправляем POST  запрос на сервер с файлом
     * и хедером "x-access-token": token
     * @param {File} file - загружаемое изображение 
     */
    uploadCover(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("coverImg", file);

            // Get token
            const token = localStorage.getItem("social_user_token");
            // Get user id
            const id = localStorage.getItem("social_user_id");

            if (!token || !id) return reject("Error. Unauthorized.");

            fetch(`${env.apiUrl}/public/users/upload-cover/${id}`, {
                method: "POST",
                body: formData,
                headers: {
                    "x-access-token": token
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
    /**
     * loadPhoto - метод отправки пользовательских изображений на сервер, через fetch POST FormData
     * @param {File} photo - загружаемое изображение
     */
    loadPhoto(photo){
        return new Promise((resolve, reject) => {
            const formData = new FormData();

            formData.append("userPhotos", photo);

            const token = localStorage.getItem("social_user_token");
            const id = localStorage.getItem("social_user_id");

            if (!token || !id) return reject("Error. User  did not authorize.");
            
            fetch(`${env.apiUrl}/public/users/upload-photos/${id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    "x-access-token": token
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (!data.error) {console.log("User photos updated success!")}
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }

    /**
     * deletePhoto -  метод удаления фотографий с запросом к серверу
     * @param {String} photoId  -  идентефикатор изображения в разметке
     * @param {String} urlParametr - часть идентефикатора изображения на сервере
     */
    deletePhoto(photoId, urlParametr) {
        return new Promise((resolve, reject) => {
            const id = localStorage.getItem("social_user_id");
            const token = localStorage.getItem("social_user_token");
            fetch(`${env.apiUrl}/public/users/remove-photo/${id}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    image_id: `${photoId}`,
                    image_url: `users-photos/userPhotos-${urlParametr}`
                    }),
                headers: {
                    "x-access-token": token,
                    "Content-type": "application/json"
                }
            })
            .then((data) => data.json())
            .then((data) => {
                if (!data.error) {console.log(data.message)}
                return data;
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error.message));
        });
    }
}