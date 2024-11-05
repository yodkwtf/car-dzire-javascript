import {
  EXTERIOR_IMAGES,
  INTERIOR_IMAGES,
  CUSTOMIZED_WHEELS_IMAGES,
  PRICING,
  LOAN_BREAKUP,
} from './constants.js';

// # Selectors
const topBar = document.getElementById('top-bar');
const exteriorColorDiv = document.getElementById('exterior-buttons');
const interiorColorDiv = document.getElementById('interior-buttons');
const exteriorImage = document.getElementById('exterior-image');
const interiorImage = document.getElementById('interior-image');
const wheeButtonsDiv = document.getElementById('wheel-buttons');
const selfDrivingCheckbox = document.getElementById('self-driving-checkbox');
const performanceBtn = document.getElementById('performance-btn');
const accessoryCheckboxes = document.querySelectorAll('.accessory-checkbox');
const totalPriceElement = document.getElementById('total-price');
const downPaymentElement = document.getElementById('down-payment');
const monthlyPaymentElement = document.getElementById('monthly-payment');

// # Global States
let selectedExteriorColor = 'Stealth Grey';
const modifyOptions = {
  isCustomizedWheels: false,
  isPerformancePackage: false,
  isFullSelfDriving: false,
};

let totalPrice = PRICING.BASE_PRICE;

// # Functions
// - Update total price in UI
const updateTotalPrice = () => {
  // reset the total price
  totalPrice = PRICING.BASE_PRICE;

  // Update price based on modifications
  if (modifyOptions.isCustomizedWheels) {
    totalPrice += PRICING.CUSTOMIZED_WHEELS;
  }
  if (modifyOptions.isFullSelfDriving) {
    totalPrice += PRICING.FULL_SELF_DRIVING;
  }
  if (modifyOptions.isPerformancePackage) {
    totalPrice += PRICING.PERFORMANCE_PACKAGE;
  }
  accessoryCheckboxes.forEach((checkbox) => {
    // extract accessory label
    const accessory = checkbox
      .closest('label')
      .querySelector('span')
      .textContent.trim();

    // add accessory price if checked
    if (checkbox.checked) {
      totalPrice += PRICING.ACCESSORIES[accessory];
    }
  });

  // Update price in UI
  totalPriceElement.textContent = totalPrice.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  // Update price breakdown
  updatePriceBreakdown();
};

// - Update down payment and monthly payment
const updatePriceBreakdown = () => {
  // calculate down payment
  const downPayment = totalPrice * LOAN_BREAKUP.DOWN_PAYMENT_PERCENTAGE;
  downPaymentElement.textContent = downPayment.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  // calculate monthly payment (assuming 5% interest rate for 5 years)
  const loanAmount = totalPrice - downPayment;
  const monthlyInterestRate = LOAN_BREAKUP.INTEREST_RATE / 12;
  const numberOfPayments = LOAN_BREAKUP.TENURE_YEARS * 12;

  // formula for monthly payment -> P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyPayment =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  monthlyPaymentElement.textContent = monthlyPayment.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
};

// - Handle top bar on scroll
const handleTopBar = () => {
  const isTop = window.scrollY === 0;
  topBar.classList.toggle('visible-top-bar', isTop);
  topBar.classList.toggle('hidden-top-bar', !isTop);
};

// - Update exterior image based on the selected color and wheel
const updateExteriorImage = () => {
  exteriorImage.src = modifyOptions.isCustomizedWheels
    ? CUSTOMIZED_WHEELS_IMAGES[selectedExteriorColor]
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
    btn.classList.remove('bg-pink-700', 'text-white');
    btn.classList.add('bg-pink-200');
  });
  event.target.classList.add('bg-pink-700', 'text-white');

  // Change wheel image
  modifyOptions.isCustomizedWheels =
    event.target.textContent.includes('Customized');
  updateExteriorImage();

  // Update total price
  updateTotalPrice();
};

// - Handle full self driving selection
const handleSelfDrivingCheckbox = () => {
  // Toggle the full self driving option
  modifyOptions.isFullSelfDriving = !modifyOptions.isFullSelfDriving;

  // Update total price
  updateTotalPrice();
};

// - Handle performance package selection
const handlePerformanceButtonClick = () => {
  // Toggle the button styles
  performanceBtn.classList.toggle('bg-pink-700');
  performanceBtn.classList.toggle('text-white');
  performanceBtn.classList.toggle('scale-95');
  setTimeout(() => performanceBtn.classList.toggle('scale-95'), 100);

  // Toggle the performance package
  modifyOptions.isPerformancePackage = !modifyOptions.isPerformancePackage;

  // Update total price
  updateTotalPrice();
};

// # Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleTopBar)); // save resources and improve performance
exteriorColorDiv.addEventListener('click', handleColorButtonClick);
interiorColorDiv.addEventListener('click', handleColorButtonClick);
wheeButtonsDiv.addEventListener('click', handleWheelButtonClick);
selfDrivingCheckbox.addEventListener('change', handleSelfDrivingCheckbox);
performanceBtn.addEventListener('click', handlePerformanceButtonClick);

accessoryCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener('change', updateTotalPrice)
);

// # Initializations
updateTotalPrice();
