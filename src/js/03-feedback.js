import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const user = {
  email: '',
  message: '',
};

pageStart();
function pageStart() {
  if (localStorage.getItem('feedback-form-state')) {
    const { email, message } = form.elements;
    const userParse = JSON.parse(localStorage.getItem('feedback-form-state'));
    email.value = userParse.email;
    message.value = userParse.message;
  } else {
    return;
  }
}

form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', handleSubmit);

function handleInput() {
  const { email, message } = form.elements;
  user.email = email.value;
  user.message = message.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(user));
}

function handleSubmit(event) {
  event.preventDefault();
  localStorage.clear();
  form.reset();
  console.log(user);
}
