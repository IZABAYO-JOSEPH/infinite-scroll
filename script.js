const imageContainer = document.getElementById("imageContainer");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
let count = 5;
const apiKey = "1fPYD48AUec1fXf7p1cDA6Gd1YrXW0zpw122u5AvYKE";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//check if images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded == totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

//  helper function to set attributes on the DOM
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// create elements for links, photos and them to the DOM
function displayPhoto() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // run function for each object in the array
  photosArray.forEach((photo) => {
    //  create <a> to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for a photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // check if each image is fininshed loading
    img.addEventListener("load", imageLoaded);
    // put <img>  inside <a>, then put both inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash url

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhoto();
  } catch (error) {
    // catch error here
  }
}

// check to see if scrolling near bottom of the page,loads more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//  on load
getPhotos();
