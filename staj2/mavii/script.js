document.getElementById('hamburger-menu').onclick = function(event) {
    closeAllDropdowns();
    var dropMenu = document.getElementById('dropMenu');

    
    if (dropMenu.style.display === "none" || dropMenu.style.display === "") {
        dropMenu.style.display = "block"; 
    } else {
        dropMenu.style.display = "none"; 
    }
    

};

var elements = document.querySelectorAll('.mobile-menu-item-js');
elements.forEach(element => {
    element.addEventListener('click', function(event) {
        console.log(event.target.querySelector('ul'));
        
        event.target.querySelector('ul').classList.add('active')
    })
})
document.getElementById('closebutton').onclick = function(event) {
    var dropMenu = document.getElementById('dropMenu');

    
    if (dropMenu.style.display === "none" || dropMenu.style.display === "") {
        dropMenu.style.display = "block"; 
    } else {
        dropMenu.style.display = "none"; 
    }
    
    
};

function closeAllDropdowns() {
    var dropdowns = document.getElementsByClassName('drop-content');
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove('active');
    }
}


$(document).ready(function() {
    $.getJSON("products.json", function(datas) {
        let containerHTML = '';

        
        datas.forEach((data, index) => {
            let slidesHTML = '';
            if (Array.isArray(data.images) && data.images.length > 0) {
             
                data.images.forEach((image) => {
                    slidesHTML += `
                      <div class="swiper-slide">
                        <img src="${image}" alt="${data.name}">
                      </div>
                    `;
                });
            } else {
                console.error(`Images not found for product: ${data.name}`);
            }

         
            containerHTML += `
              <div class="product-item">
                <div class="swiper-container swiper-container-${index}">
                  <div class="swiper-wrapper">
                    ${slidesHTML}  
                  </div>
                </div>

                <p>${data.name}</p>
                <p class="subtitle">${data.subtitle}</p>
                <p>${data.price}</p>

                <div class="overlay" style="display: none;">
                  <button class="add-to-cart">Sepete Ekle</button>
                </div>

                <div class="sizes-container" style="display: none;">
                
                </div>
                

              </div>
            `;
        });

       
        $('#product-container').html(containerHTML);

        
        datas.forEach((data, index) => {

            const swiperInstance = new Swiper(`.swiper-container-${index}`, {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                navigation: false,
                pagination: {
                    el: `.swiper-pagination-${index}`,
                    clickable: true,
                },
                on: {
                    init: function() {
                        this.wrapperEl.style.display = 'flex';
                    }
                }
            });

            const productItem = document.querySelector(`.product-item:nth-child(${index + 1})`);
            const overlay = productItem.querySelector('.overlay');

            
            productItem.addEventListener('mouseenter', function() {
                overlay.style.display = 'flex';
            });
            productItem.addEventListener('mouseleave', function() {
                overlay.style.display = 'none';
            });

         
            const addToCartButton = overlay.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', function() {
                const sizesContainer = productItem.querySelector('.sizes-container');
                sizesContainer.style.display = 'flex';
                sizesContainer.innerHTML = ''; 

               
                if (data.sizes) {
                    Object.values(data.sizes).forEach(size => {
                        sizesContainer.innerHTML += `
                            
                            <button class="size-button">${size}</button>
                            
                            <button class="add-to-cart-black">Sepete Ekle</button>
                        
                            `;
                    });
                }
            });

            
            const swiperContainer = document.querySelector(`.swiper-container-${index}`);
            swiperContainer.addEventListener('mousemove', function(event) {
               
                const containerWidth = swiperContainer.offsetWidth;
                const mouseX = event.clientX - swiperContainer.getBoundingClientRect().left;

               
                const part1 = containerWidth / 4; 
                const part2 = part1 * 2;
                const part3 = part1 * 3; 

    
              if (mouseX < part1) {
                    swiperInstance.slideTo(0); 
                } else if (mouseX >= part1 && mouseX < part2) {
                    swiperInstance.slideTo(1); 
                } else if (mouseX >= part2 && mouseX < part3) {
                    swiperInstance.slideTo(2); 
                } else if (mouseX >= part3) {
                    swiperInstance.slideTo(3);
                }
            });
        });
    });
});

