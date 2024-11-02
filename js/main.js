import {
  EXTERIOR_IMAGES,
  INTERIOR_IMAGES,
  PERFORMANCE_WHEEL_IMAGES,
} from './constants.js';

// # Selectors
const topBar = document.getElementById('top-bar');
const exteriorColorDiv = document.getElementById('exterior-buttons');
const interiorColorDiv = document.getElementById('interior-buttons');
const exteriorImage = document.getElementById('exterior-image');
const interiorImage = document.getElementById('interior-image');
const wheeButtonsDiv = document.getElementById('wheel-buttons');
const performanceBtn = document.getElementById('performance-btn');

// # Global States
let selectedExteriorColor = 'Stealth Grey';
const performanceOptions = {
  isPerformanceWheelSelected: false,
};

// # Functions
// - Handle top bar on scroll
const handleTopBar = () => {
  const isTop = window.scrollY === 0;
  topBar.classList.toggle('visible-top-bar', isTop);
  topBar.classList.toggle('hidden-top-bar', !isTop);
};

// - Update exterior image based on the selected color and wheel
const updateExteriorImage = () => {
  exteriorImage.src = performanceOptions.isPerformanceWheelSelected
    ? PERFORMANCE_WHEEL_IMAGES[selectedExteriorColor]
    : EXTERIOR_IMAGES[selectedExteriorColor];
};

// - Handle color selection
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
    selectedExteriorColor = clickedColor;
    updateExteriorImage();
  }

  // Change interior image
  if (event.currentTarget === interiorColorDiv) {
    const clickedColor = clickedBtn.querySelector('img').alt;
    interiorImage.src = INTERIOR_IMAGES[clickedColor];
  }
};

// - Handle wheel selection
const handleWheelButtonClick = (event) => {
  if (!event.target.tagName === 'BUTTON') return;

  // Highlight the selected button
  const allButtons = event.currentTarget.querySelectorAll('button');
  allButtons.forEach((btn) => {
    btn.classList.remove('bg-gray-700', 'text-white');
    btn.classList.add('bg-gray-200');
  });
  event.target.classList.add('bg-gray-700', 'text-white');

  // Change wheel image
  performanceOptions.isPerformanceWheelSelected =
    event.target.textContent.includes('Performance');
  updateExteriorImage();
};

// - Handle performance package selection
const handlePerformanceButtonClick = () => {
  performanceBtn.classList.toggle('bg-gray-700');
  performanceBtn.classList.toggle('text-white');
  performanceBtn.classList.toggle('scale-95');
  setTimeout(() => performanceBtn.classList.toggle('scale-95'), 100);
};

// # Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleTopBar)); // save resources and improve performance
exteriorColorDiv.addEventListener('click', handleColorButtonClick);
interiorColorDiv.addEventListener('click', handleColorButtonClick);
wheeButtonsDiv.addEventListener('click', handleWheelButtonClick);
performanceBtn.addEventListener('click', handlePerformanceButtonClick);
