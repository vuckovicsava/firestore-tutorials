// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

// initialize auth service
const auth = firebase.auth();

// initialize firestore database service
const db = firebase.firestore();

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // firebase signup
  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(cred);

      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
  e.preventDefault();

  // firebase signout
  auth.signOut()
    .then(() => console.log('User logged out'));
});