const formDOM = document.querySelector('.form');
const inputParentDOM = document.querySelector('.login_input');
const usernameInputDOM = document.querySelector('#name');
const resultDOM = document.querySelector('.result');
const tokenDOM = document.querySelector('.token');

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = usernameInputDOM.value;
  if (inputParentDOM.childNodes.length > 1) {
    const errorWarning = document.querySelector('.error_warning');
    const errorMessage = document.querySelector('.error_message');
    errorWarning.remove();
    errorMessage.remove();
  };

  try {
    const { data } = await axios.post('/api/v1/logon', { name });
    usernameInputDOM.value = '';
    const token = data.token;
    resultDOM.innerHTML = '';
    tokenDOM.textContent = 'Correct token is present';
    tokenDOM.classList.add('text-success');

    try {
      const { data } = await axios.get('/api/v1/hello', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      resultDOM.innerHTML = `<h2 class="main_message">${data.message}</h2>`;
    } catch (error) {
      resultDOM.innerHTML = `<p>Cannot decode ${error.response.data.message}</p>`;
    };
  } catch (error) {
    resultDOM.innerHTML = `<h2 class="main_message">No name. ${error.response.data.message}</h2>`;
    tokenDOM.textContent = 'No token present';
    tokenDOM.classList.remove('text-success');

    const createErrorWarning = document.createElement('div');
    createErrorWarning.classList.add('error_warning');
    createErrorWarning.innerHTML = '<img class="error_warning_icon img" src="files/errorWarning.png" alt="" width="20" height="20">';
    inputParentDOM.appendChild(createErrorWarning);

    const createErrorMessage = document.createElement('div');
    createErrorMessage.classList.add('error_message');
    createErrorMessage.innerHTML = `Please enter your name`;
    inputParentDOM.appendChild(createErrorMessage);
  };
});
