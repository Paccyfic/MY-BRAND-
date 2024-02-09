const form = document.querySelector('#admin-login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm();
    console.log(isFormValid());
    if (isFormValid() === true) {
     form.submit();
    }
}

);

function isFormValid() {
    const inputContainers = form.querySelectorAll('.input-group');
    let result = true;
    inputContainers.forEach((container) => {
        if (container.classList.contains('error')) {
            result = false;
        }
    });
    return result;
}
function validateForm() {
    //EMAIL
    if (emailInput.value.trim() == '') {
        setError(emailInput, 'Provide email address');
    } else if (isEmailValid(emailInput.value) && emailInput.value === 'ndahiropacific@gmail.com') {
        setSuccess(emailInput);
    } else {
        setError(emailInput, '');
    }

    //PASSWORD
    if (passwordInput.value.trim() == '') {
        setError(passwordInput, 'Password can not be empty');
    } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20 ) {
        setError(passwordInput, 'Password min 6 max 20 charecters');
    } else if ( passwordInput.value !== 'Pacific@123' ){
        setError(passwordInput, 'Email or Password is incorrect!');
    } 
    else {
        setSuccess(passwordInput);
    }
}

function setError(element, errorMessage) {
    const parent = element.parentElement;
    if (parent.classList.contains('success')) {
        parent.classList.remove('success');
    }
    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

function setSuccess(element) {
    const parent = element.parentElement;
    if (parent.classList.contains('error')) {
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

function isEmailValid(email) {
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    return reg.test(email);
}
