const formDOM = document.querySelector('.form');
const usernameInputDOM = document.querySelector('#name');
const usernameInputParentDOM = usernameInputDOM.parentElement;
const passwordInputDOM = document.querySelector('#pass');
const passwordInputParentDOM = passwordInputDOM.parentElement;
const resultDOM = document.querySelector('.result');
const tokenDOM = document.querySelector('.token');
const usernameErrorMessage = `Please enter your name`;
const passwordErrorMessage = `Please enter your password`;
const usernameErrorSelector = `#name`;
const passwordErrorSelector = `#pass`;


function addWarning(element, message) {
  const createLoginErrorWarning = document.createElement('div');
  createLoginErrorWarning.classList.add('error_warning');
  createLoginErrorWarning.innerHTML = '<img class="error_warning_icon img" src="files/errorWarning.png" alt="" width="20" height="20">';
  element.appendChild(createLoginErrorWarning);

  const createLoginErrorMessage = document.createElement('div');
  createLoginErrorMessage.classList.add('error_message');
  createLoginErrorMessage.innerHTML = message;
  element.appendChild(createLoginErrorMessage);
};

function removeWarning(selector) {
  const errorWarning = document.querySelector(`${selector}~.error_warning`);
  const errorMessage = document.querySelector(`${selector}~.error_message`);
  errorWarning.remove();
  errorMessage.remove();
};

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = usernameInputDOM.value;
  const password = passwordInputDOM.value;
  if (usernameInputParentDOM.childNodes.length > 1) {
    removeWarning(usernameErrorSelector)
  };

  if (passwordInputParentDOM.childNodes.length > 1) {
    removeWarning(passwordErrorSelector)
  };

  try {
    const { data } = await axios.post('/api/v1/logon', { name, password });
    usernameInputDOM.value = '';
    passwordInputDOM.value = '';
    const token = data.token;
    resultDOM.innerHTML = '';

    try {
      const { data } = await axios.get('/api/v1/hello', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      tokenDOM.textContent = 'Correct token is present';
      tokenDOM.classList.add('text-success');
      localStorage.setItem('token', data.token);
      resultDOM.innerHTML = `<h2 class="main_message">${data.message}</h2>`;
    } catch (error) {
      resultDOM.innerHTML = `<p>Cannot decode. ${error.response.data.message}</p>`;
    };
  } catch (error) {
    tokenDOM.textContent = 'No token present';
    tokenDOM.classList.remove('text-success');
    localStorage.removeItem('token');
    if (!name && !name.trim()) {
      addWarning(usernameInputParentDOM, usernameErrorMessage);
      resultDOM.innerHTML = `<h2 class="main_message">No name. ${error.response.data.message}</h2>`;
    };
    if (!password) {
      addWarning(passwordInputParentDOM, passwordErrorMessage);
      resultDOM.innerHTML = `<h2 class="main_message">No password. ${error.response.data.message}</h2>`;
    };
  };
});
