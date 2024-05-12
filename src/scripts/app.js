"use strict";

let prev = document.querySelector(".slider__btn--prev");
let next = document.querySelector(".slider__btn--next");
let menuToggle = document.querySelector('.menu-toggle');
let burger = document.querySelector('.burger__menu');

if (burger) {
    burger.onclick = function(){
        document.body.classList.toggle("burger__open");
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        document.body.classList.toggle("menu--open");
    });
}





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
    // Associe chaque élément à sa modal correspondante
    const modals = {};
    modalTriggers.forEach(trigger => {
        const modalId = trigger.getAttribute('data-modal-id');
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) {
            const modalContent = modal.querySelector('.modal__content');
            modals[modalId] = { modal, modalContent };
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
                        otherModal.modal.classList.remove('modal__active');
                        otherModal.modal.classList.add('modal__close');
                        otherModal.modalContent.classList.remove('modal__content--active');
                        otherModal.modalContent.classList.add('modal__content--close');
                    }
                });

                // Gère l'état de la modal actuelle
                if (modal.classList.contains('modal__active')) {
                    modal.classList.remove('modal__active');
                    modal.classList.add('modal__close');
                    modalContent.classList.remove('modal__content--active');
                    modalContent.classList.add('modal__content--close');
                } else {
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
                    modal.classList.add('modal__close');
                    modal.classList.remove('modal__active');
                    modalContent.classList.remove('modal__content--active');
                    modalContent.classList.add('modal__content--close');
                }
            });
        });
    }
}


let button = document.querySelectorAll(".tab__btn")

for(let bouton of button){
    bouton.addEventListener('click', buttonTrigger)
}

function buttonTrigger (event){

    // Désactiver tous les liens actifs
    let list = event.currentTarget.closest("ul")
    let activeButtons = list.querySelectorAll(".tab--active");
    for(let activeButton of activeButtons){
        activeButton.classList.remove("tab--active")  
        activeButton.parentElement.classList.remove("tab__el--active")  // Ajouté
    }

    let btn = list.querySelectorAll(".tab__btn")
    for (let btnTab of btn){
        let btnId = btnTab.getAttribute('data-target');
        let btnElement = document.querySelector("#"+btnId);
        btnElement.classList.add('tab__content--hidden');
    }

    // Marquer le lien cliqué comme actif
    let clickedButton = event.currentTarget;
    clickedButton.classList.add("tab--active");
    clickedButton.parentElement.classList.add("tab__el--active");  // Ajouté

    let contentClass = clickedButton.getAttribute("data-target");
    let content = document.querySelector("#"+contentClass);
    content.classList.remove("tab__content--hidden");
}

window.addEventListener('DOMContentLoaded', (event) => {
    let tab1 = document.getElementById("tab--1");
    let tab2 = document.getElementById("tab--2");
    let tab3 = document.getElementById("tab--3");

    let height = tab1.offsetHeight;

    tab2.style.height = height + "px";
    tab3.style.height = height + "px";
});
