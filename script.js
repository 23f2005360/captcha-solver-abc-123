// Mocked captcha images and solutions
const captchaData = [
  { src: 'captcha-image.png', solution: 'AB12C' },
  { src: 'captcha-image2.png', solution: 'X9Y8Z' },
  { src: 'captcha-image3.png', solution: '7G6H5' }
];
let currentCaptchaIndex = 0;

// Function to load captcha based on current index
function loadCaptcha() {
  const captcha = captchaData[currentCaptchaIndex];
  document.getElementById('captcha-image').src = captcha.src;
}

// Function to reload captcha to a new random one
function reloadCaptcha() {
  let newIndex = currentCaptchaIndex;
  while (newIndex === currentCaptchaIndex) {
    newIndex = Math.floor(Math.random() * captchaData.length);
  }
  currentCaptchaIndex = newIndex;
  loadCaptcha();
  document.getElementById('result-message').textContent = '';
  document.getElementById('captcha-input').value = '';
}

// Event listener for reload button
document.getElementById('reload-captcha').addEventListener('click', function() {
  reloadCaptcha();
});

// Event listener for form submission
document.getElementById('captcha-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const userInput = document.getElementById('captcha-input').value.trim();
  const actualSolution = captchaData[currentCaptchaIndex].solution;
  const messageDiv = document.getElementById('result-message');
  if (userInput === actualSolution) {
    messageDiv.textContent = 'Correct! You solved the captcha.';
    messageDiv.style.color = 'green';
  } else {
    messageDiv.textContent = 'Incorrect. Please try again.';
    messageDiv.style.color = 'red';
  }
});

// Initialize with first captcha
window.onload = function() {
  loadCaptcha();
};