// main.js
const app = require('./firebaseConfig');
const { getAuth, RecaptchaVerifier, signInWithPhoneNumber } = require('firebase/auth');

const auth = getAuth(app);
auth.useDeviceLanguage();

// Set up reCAPTCHA
const recaptchaVerifier = new RecaptchaVerifier("send-otp", {
  'size': 'invisible',
  'callback': response => {
    // reCAPTCHA resolved, allow user to continue
  }
}, auth);

document.getElementById("send-otp").addEventListener("click", () => {
  const phoneNumber = document.getElementById("phone-number").value;

  signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to enter the OTP
      window.confirmationResult = confirmationResult;
      document.getElementById("otp-container").style.display = "block";
      alert("OTP has been sent!");
    })
    .catch((error) => {
      console.error("SMS not sent", error);
    });
});

document.getElementById("verify-otp").addEventListener("click", () => {
  const otp = document.getElementById("otp").value;

  window.confirmationResult.confirm(otp)
    .then((result) => {
      const user = result.user;
      alert("Phone number verified!");
      console.log("User verified:", user);
    })
    .catch((error) => {
      alert("Verification failed. Please try again.");
      console.error("Error verifying OTP:", error);
    });
});
