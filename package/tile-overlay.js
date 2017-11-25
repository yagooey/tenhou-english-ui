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
                    resolve(reader.result);
                });

                reader.addEventListener('error', (err) => {
                    reject(err);
                });

                reader.readAsDataURL(blob);
            });
        });
}

// disable webworkers (ww), as Firefox 57 thinks a cross-origin request is taking place
const resizer = pica({ features: ['js', 'wasm',] });

function resizeImage(dataURL, width) {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const reader = new FileReader();

    img.src = dataURL;

    return new Promise((resolve, reject) => {
        img.onload = () => {
            resolve();
        }
    })
        .then(() => {
            canvas.width = width;
            canvas.height = 4 * Math.round(img.height * width / img.width / 4);
            return resizer.resize(img, canvas, {
                quality: 2,
                alpha: true,
            });
        })
        .then((result) => {
            return resizer.toBlob(result, 'image/png');
        })
        .then((blob) => {
            return new Promise((resolve, reject) => {
                reader.addEventListener('load', () => {
                    resolve({ redirectUrl: reader.result });
                });

                reader.addEventListener('error', (err) => {
                    reject(err);
                });

                reader.readAsDataURL(blob);
            });
        })
}
