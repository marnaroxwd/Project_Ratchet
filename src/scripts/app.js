"use strict";

let prev = document.querySelector(".slider__btn--prev");
let next = document.querySelector(".slider__btn--next");

const menuToggle = document.querySelector('.menu-toggle');

menuToggle.addEventListener('click', menuOpen);

function menuOpen() {
    document.body.classList.toggle("menu--open");
}


prev.addEventListener("click", prevSlide);
next.addEventListener("click", nextSlide);



// Ajout du timer automatique

// Navigation au clavier
document.addEventListener("keydown", keyboardListener);
function keyboardListener(event){
    if(event.code == "ArrowLeft"){
        prevSlide();
    } else if(event.code == "ArrowRight"){
        nextSlide();
    }
}

function prevSlide(){
    let activeSlideEL = document.querySelector(".slider__el--show");

    let prevSlideEl = activeSlideEL.previousElementSibling;
    if(!prevSlideEl){
        prevSlideEl = activeSlideEL.parentNode.lastElementChild;
    }
    updateSlide(prevSlideEl);
}

function nextSlide(){
    let activeSlideEL = document.querySelector(".slider__el--show");

    let nextSlideEl = activeSlideEL.nextElementSibling;
    if(!nextSlideEl){
        nextSlideEl = activeSlideEL.parentNode.firstElementChild;
    }
    updateSlide(nextSlideEl);
}


// Mettre à jour la fonction updateSlide pour appeler updateIndicators
function updateSlide(newSlideEl){
    let activeSlideEL = document.querySelector(".slider__el--show");
    let h2Element = newSlideEl.querySelector("h2");
    let h2Text = h2Element.textContent.toLowerCase();
    let slider = document.querySelector(".slider");
    let exploreLink = document.querySelector(".slider__explore");
    let exploreURL = h2Text + ".html";
    activeSlideEL.classList.remove("slider__el--show");
    newSlideEl.classList.add("slider__el--show");

    slider.classList.remove(...Array.from(slider.classList).filter(cls => cls.startsWith("slider--")));

    slider.classList.add("slider--" + h2Text);

    exploreLink.setAttribute("href", exploreURL);
}

document.addEventListener('DOMContentLoaded', function() {
    const sliderDescription = document.querySelectorAll('.slider__description');

    // Function to trigger glitch effect on slider description
    function triggerGlitch() {
      sliderDescription.forEach(description => {
        description.classList.remove('glitch');
        void description.offsetWidth; // Trigger reflow to restart the animation
        description.classList.add('glitch');
      });
    }

    // Event listener for slide change
    const slider = document.querySelector('.slider__list');
    slider.addEventListener('transitionend', triggerGlitch);
  });




 
