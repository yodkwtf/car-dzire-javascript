import { EXTERIOR_IMAGES, INTERIOR_IMAGES } from './constants.js';

// # Selectors
const topBar = document.getElementById('top-bar');
const exteriorColorDiv = document.getElementById('exterior-buttons');
const interiorColorDiv = document.getElementById('interior-buttons');
const exteriorImage = document.getElementById('exterior-image');
const interiorImage = document.getElementById('interior-image');

// # Functions
// Handle top bar on scroll
const handleTopBar = () => {
  const isTop = window.scrollY === 0;
  topBar.classList.toggle('visible-top-bar', isTop);
  topBar.classList.toggle('hidden-top-bar', !isTop);
};

// Handle color selection
const handleColorButtonClick = (event) => {
  let clickedBtn;

  if (event.target.tagName === 'IMG') {
    clickedBtn = event.target.closest('button');
  } else if (event.target.tagName === 'BUTTON') {
    clickedBtn = event.target;
  }

  // If no button is clicked, exit the function
  if (!clickedBtn) return;

  // Highlight the selected button
  const allButtons = event.currentTarget.querySelectorAll('button');
  allButtons.forEach((btn) => btn.classList.remove('btn-selected'));
  clickedBtn.classList.add('btn-selected');

  // Change exterior image
  if (event.currentTarget === exteriorColorDiv) {
    const clickedColor = clickedBtn.querySelector('img').alt;
    exteriorImage.src = EXTERIOR_IMAGES[clickedColor];
  }

  // Change interior image
  if (event.currentTarget === interiorColorDiv) {
    const clickedColor = clickedBtn.querySelector('img').alt;
    interiorImage.src = INTERIOR_IMAGES[clickedColor];
  }
};

// # Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleTopBar)); // save resources and improve performance
exteriorColorDiv.addEventListener('click', handleColorButtonClick);
interiorColorDiv.addEventListener('click', handleColorButtonClick);
