"use strict";

let prev = document.querySelector(".slider__btn--prev");
let next = document.querySelector(".slider__btn--next");

if (document.querySelector(".slider__list")) {
    prev.addEventListener("click", prevSlide);
    next.addEventListener("click", nextSlide);

    document.addEventListener("keydown", keyboardListener);
}

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

const modalTriggers = document.querySelectorAll('.modal__trigger');

if (modalTriggers.length > 0) {
    // Associez chaque déclencheur à sa modal correspondante
    const modals = {};
    modalTriggers.forEach(trigger => {
        const modalId = trigger.getAttribute('data-modal-id');
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) {
            const modalBackground = modal.querySelector('.modal__background');
            const modalContent = modal.querySelector('.modal__content');
            modals[modalId] = { modal, modalBackground, modalContent };
        }
    });

    // Ajoute un écouteur de clic à chaque élément
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-id');
            const { modal, modalContent } = modals[modalId];

            if (modal && modalContent) {
                // Ferme toutes les autres modales
                Object.values(modals).forEach(otherModal => {
                    if (otherModal.modal !== modal) {
                        otherModal.modalContent.classList.add('modal__content--close');                        
                        otherModal.modal.classList.add('modal__close');
                        otherModal.modal.classList.remove('modal__active');
                        otherModal.modalContent.classList.remove('modal__content--active');
                        
                    }
                });

                // Gère l'état de la modal actuelle
                if (modal.classList.contains('modal__active')) {
                    modal.classList.remove('modal__active');
                    modalContent.classList.add('modal__content--close');
                    modal.classList.add('modal__close');
                    modalContent.classList.remove('modal__content--active');
                } else {
                    modalContent.classList.remove('modal__content--close');
                    modal.classList.remove('modal__close');
                    modal.classList.add('modal__active');
                    if (modal.classList.contains('modal__default-state')) {
                        modal.classList.remove('modal__default-state');
                    }
                    modalContent.classList.add('modal__content--active');
                }
            }
        });
    });

    const closeButtons = document.querySelectorAll('.modal__close-button');
    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.closest('.modal').getAttribute('id').replace('modal-', '');
                const { modal, modalContent } = modals[modalId];
                if (modal && modalContent) {
                    modalContent.classList.add('modal__content--close');
                    modal.classList.add('modal__close');
                    modal.classList.remove('modal__active');
                    modalContent.classList.remove('modal__content--active');

                }
            });
        });
    }
}
var acc = document.getElementsByClassName("accordion__btn");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var accordion = this.nextElementSibling;
    if (accordion.style.maxHeight){
      accordion.style.maxHeight = null;
    } else {
      accordion.style.maxHeight = accordion.scrollHeight + "px";
      // Faire défiler jusqu'à l'élément actif après l'ouverture du accordion
      accordion.scrollIntoView({behavior: "smooth", block: "nearest"});
    } 
  });
}

document.addEventListener('DOMContentLoaded', function () {
    var scrollnav = document.querySelector('.scrollnav');
    var oldScrollY = 0;
    var timer;

    window.addEventListener('scroll', function () {
        clearTimeout(timer);

        if (oldScrollY > window.scrollY || isBottomReached()) {
            scrollnav.classList.remove('scrollnav--hide');
        } else {
            scrollnav.classList.add('scrollnav--hide');
        }

        timer = setTimeout(function () {
            if (isBottomReached()) {
                scrollnav.classList.remove('scrollnav--hide');
            }
        }, 3000);

        oldScrollY = window.scrollY;
    });

    function isBottomReached() {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight;
    }
});
