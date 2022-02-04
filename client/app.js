const loginForm = document.getElementById('welcome-form');
const messageSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login = (event) => {
  event.preventDefault();
  if(userNameInput.value){
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messageSection.classList.add('show');
  } else {
    alert('Please type your login.');
  }
};

const sendMessage = (event) => {
  event.preventDefault();
  if(!messageContentInput.value){
    alert('Please type your message.');
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === username){
    message.classList.add('message--self');
  };
  message.innerHTML = `
    <h3 class="message__author">${author === userName ? 'You' : author}</h3>
    <div class="message__content">${content}</div>
  `;
  messagesList.appendChild(message);
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
