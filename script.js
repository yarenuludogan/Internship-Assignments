const images = {
    white: [
        "https://m.media-amazon.com/images/I/61KRugjd02L._AC_SX679_.jpg",
        "https://m.media-amazon.com/images/I/51x9uyPMLCL._AC_SX679_.jpg",
        "https://m.media-amazon.com/images/I/51NwUCqYeyL._AC_SX679_.jpg"
    ],
    red: [
        "https://images-eu.ssl-images-amazon.com/images/I/41Jdrwk91LL._AC_UL165_SR165,165_.jpg",
        "https://m.media-amazon.com/images/I/41uLL87TeeL._AC_SX466_.jpg",
        "https://m.media-amazon.com/images/I/41i+QBYBosL._AC_SX466_.jpg"
    ]

};

let currentColor = 'white'; 
let currentIndex = 0; 

function changeColor(color) {

    if (currentColor !== color) {

        currentColor = color;
        currentIndex = 0; 
        changeMainImage(images[currentColor][currentIndex]); 
        updateSideImages();
    }
}

function updateSideImages() {
    document.getElementById('top').src = images[currentColor][0];
    document.getElementById('middle').src = images[currentColor][1];
    document.getElementById('bottom').src = images[currentColor][2];
}


function changeImage(direction) {
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = images[currentColor].length - 1;
    } else if (currentIndex >= images[currentColor].length) {
        currentIndex = 0;

    }

    changeMainImage(images[currentColor][currentIndex]);
    
}

function changeMainImage(newSrc) {
    document.getElementById('main-image').src = newSrc;
}

function openModal() {


    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    

    modal.style.display = "block"; 
    modalImage.src = document.getElementById("main-image").src; 
    
}

function closeModal() {
    const modal = document.getElementById("image-modal");
    modal.style.display = "none"; 
}

let count = 0;

function increaseCount() {
    count++; 
    updateDisplay(); 
}

function decreaseCount() {
    if (count > 0) { 
        count--;
    }
    updateDisplay(); 

}

function updateDisplay() {
    document.getElementById('count-display').innerText = count; 
}


function toggleFavorite() {

    const favButton = document.querySelector('.fav-btn');
    favButton.classList.toggle('filled');
    const icon = favButton.querySelector('.fa-heart');


    if (favButton.classList.contains('filled')) {
        icon.classList.remove('far'); 
        icon.classList.add('fas'); 
    } else {
        icon.classList.remove('fas'); 
        icon.classList.add('far'); 
    }

}


function showAlert() {
    const alertMessage = document.getElementById('alert-message');
    alertMessage.style.display = 'block'; 
   

    setTimeout(function() {
        alertMessage.style.display = 'none';
    }, 3000);
    
}
