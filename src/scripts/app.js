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
    let spanElement = h2Element.querySelector('span');
    let spanText = spanElement.textContent.toLowerCase();
    let slider = document.querySelector(".slider");
    activeSlideEL.classList.remove("slider__el--show");
    newSlideEl.classList.add("slider__el--show");

    slider.classList.remove(...Array.from(slider.classList).filter(cls => cls.startsWith("slider--")));

    slider.classList.add("slider--" + spanText);
}




const modalTriggers = document.querySelectorAll('.modal__trigger');
const scrollNav = document.querySelector('.scrollnav');

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
                    if (scrollNav) scrollNav.classList.remove('scrollnav--hide'); // Afficher la nav
                } else {
                    modalContent.classList.remove('modal__content--close');
                    modal.classList.remove('modal__close');
                    modal.classList.add('modal__active');
                    if (modal.classList.contains('modal__default-state')) {
                        modal.classList.remove('modal__default-state');
                    }
                    modalContent.classList.add('modal__content--active');
                    if (scrollNav) scrollNav.classList.add('scrollnav--hide'); // Cacher la nav
                }
            }
        });
    });

    const closeModal = (modal, modalContent) => {
        modalContent.classList.add('modal__content--close');
        modal.classList.add('modal__close');
        modal.classList.remove('modal__active');
        modalContent.classList.remove('modal__content--active');
        if (scrollNav) scrollNav.classList.remove('scrollnav--hide'); // Afficher la nav
    };

    const closeButtons = document.querySelectorAll('.modal__close-button');
    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.closest('.modal').getAttribute('id').replace('modal-', '');
                const { modal, modalContent } = modals[modalId];
                if (modal && modalContent) {
                    closeModal(modal, modalContent);
                }
            });
        });
    }

    Object.values(modals).forEach(({ modal, modalContent }) => {
        if (modal) {
            modal.addEventListener('click', (event) => {
                if (!modalContent.contains(event.target)) {
                    closeModal(modal, modalContent);
                }
            });
        }
    });

    // Écouteur global pour la touche Échap
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            Object.values(modals).forEach(({ modal, modalContent }) => {
                if (modal.classList.contains('modal__active')) {
                    closeModal(modal, modalContent);
                }
            });
        }
    });
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




if (scrollNav) {
    let lastScrollTop = 0;
    const delta = 5;
    const navbarHeight = scrollNav.offsetHeight;
    const navList = document.querySelector('.nav__list');

    const centerActiveNavEl = () => {
        const activeEl = document.querySelector('.nav__el--active');
        if (activeEl) {
            const elLeft = activeEl.offsetLeft;
            const elWidth = activeEl.offsetWidth;
            const navWidth = navList.offsetWidth;
            const scrollAmount = elLeft - (navWidth / 2) + (elWidth / 2);
            navList.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(lastScrollTop - scrollTop) <= delta) {
            return;
        }

        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            // Scroll vers le bas
            scrollNav.classList.add('scrollnav--hide');
        } else {
            // Scroll vers le haut
            scrollNav.classList.remove('scrollnav--hide');
        }

        // Si l'utilisateur est en bas de la page, afficher la nav
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            scrollNav.classList.remove('scrollnav--hide');
        }

        lastScrollTop = scrollTop;
    });

    // Call centerActiveNavEl whenever the active element might change
    const observer = new MutationObserver(centerActiveNavEl);
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(navList, config);

    // Initial call to center the active element
    centerActiveNavEl();
}
