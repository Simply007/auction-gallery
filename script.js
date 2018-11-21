const projectId = 'eb750cab-6c73-0133-668a-3a00b7fbbb14';

window.onload = function () {
    renderGallery()
}

function renderGallery() {
    getGalleryCloudJson()
        .then(data => {
            const artworks = getClientModel(data);
            artworks.map(artwork => renderOneArtwork(artwork))
        })

}

function renderOneArtwork(artwork) {
    const gallery = document.getElementById('gallery-content');
    gallery.innerHTML += `
    <div class="artwork-item">
        <h2 class="artwork-title">${artwork.title}</h2>
        <a href=${artwork.modelUrl} rel="ar">
            <img class="artwork-thumbnail" src=${artwork.thumbnailUrl} alt="" width="250" height="250" data-hires-status="pending">
        </a>
    </div>
    `;
}

function getClientModel(data) {
    let artworks = [];
    const artworkNames = data.item.elements.artworks.value;
    artworkNames.map(artworkName => {
        const artworkCloudModel = data.modular_content[artworkName];
        const title = artworkCloudModel.elements.title.value;
        const thumbnailUrl = artworkCloudModel.elements.thumbnail.value[0].url;
        const modelUrl = artworkCloudModel.elements.model.value[0].url;
        const artwork = {
            'title': title,
            'thumbnailUrl': thumbnailUrl,
            'modelUrl': modelUrl,
        }
        artworks.push(artwork);
    });

    return artworks;
}

function getGalleryCloudJson() {
    return new Promise(function (resolve, reject) {
        const galleryItemUrl = `https://deliver.kenticocloud.com/${projectId}/items/auction_gallery`;
        const requestParams = {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        };

        fetch(galleryItemUrl, requestParams)
            .then(response => {
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.error('Error:', error)
            });
    });
}