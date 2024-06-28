const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let ready = false;
let imagesLoaded=0;
let totalImages=0;
let photosArray = [];

const count=30;
const apiKey='7FgLq8_Pw-PWvaiI01wXglLZyzygauqlIlP8yvy5uZw';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all image were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
    }


}

// create elements to create link & photos , add to DOM
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    //run for each object in photoArray
    photosArray.forEach((photo)=>{
    //creating <a> to link to unplash
    const item = document.createElement('a');
    item.setAttribute('href' , photo.links.html);
    item.setAttribute('target', '_blank');

    //create image for photo
    const img=document.createElement('img');
    img.setAttribute('src',photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    
    //Event listener , check when each img is loaded
    img.addEventListener('load',imageLoaded);

    // put <img> inside <a> and put both on imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);

    });
} 

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
       // error message 
    }
}

window.addEventListener('scroll' ,()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready=false;
        getPhotos();
    }
})

//OnLoad
getPhotos();