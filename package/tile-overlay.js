// Fetches an image and converts to data URL format
function getImageDataURL(imageURL) {
    const reader = new FileReader();

    return fetch(imageURL)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            return new Promise((resolve, reject) => {
                reader.addEventListener('load', () => {
                    console.log(reader.result);

                    resolve(reader.result);
                });

                reader.addEventListener('error', (err) => {
                    reject(err);
                });

                reader.readAsDataURL(blob);
            });
        });
}
