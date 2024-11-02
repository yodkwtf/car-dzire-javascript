// # Selectors
const topBar = document.getElementById('top-bar');
const exteriorColorWrapper = document.getElementById('exterior-buttons');
const interiorColorWrapper = document.getElementById('interior-buttons');
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

  const allButtons = event.currentTarget.querySelectorAll('button');
  allButtons.forEach((btn) => btn.classList.remove('btn-selected'));
  clickedBtn.classList.add('btn-selected');
};

// # Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleTopBar)); // save resources and improve performance
exteriorColorWrapper.addEventListener('click', handleColorButtonClick);
interiorColorWrapper.addEventListener('click', handleColorButtonClick);
