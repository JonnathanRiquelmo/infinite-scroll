const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const count = 30;
const apiKey = '-DNDR9GHTn_qfbDpjFzjAOGUix5ASZ-AXwvCmaius64'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded() {
    // console.log('image loaded');
    imagesLoaded++;
    console.log(imageLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);
    }
}

// Helper Function to Set Attributtes on DOM Elements
function setAttributes(element, attributtes){
    for (const key in attributtes) {
        element.setAttribute(key, attributtes[key]);
    }
}


// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images: ', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create a <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html); 
        // item.setAttribute('target', '_blank');
        setAttributes(item, { 
            href:photo.links.html, 
            target: '_blank', 
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.location.title);
        setAttributes(img, { 
            src:photo.urls.regular,
            alt: photo.alt_description,
            title: photo.location.title, 
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here
        console.log(error)
    }
}

// Check to see if scrolling near botton of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        console.log('Load more photos!');
    }
});

// On Load
getPhotos();