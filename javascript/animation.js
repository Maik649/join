/** * Animation for login page and select field.
 */
/**
 * Go to signup.
 */
function goToSignup() {
  window.location.href = "./regist.html";
}
function goToSignupFromStart() {
  window.location.href = "./subpages/regist.html";
}

function goToLogin() {
  window.location.href = "./subpages/login.html";
}

function goToRequest() {
  window.location.href = "./subpages/welcom_request.html";
}

function goToHome() {
  window.location.href = "../index.html";
}
/**
 * Select animate.
 */
function selectAnimate() {
  const wrapper = document.querySelector(".select-wrapper");
  wrapper.classList.toggle("open");
}