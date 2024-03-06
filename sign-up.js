const form = document.querySelector('#sign-up-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  validateForm();

  if (isFormValid()) {
    try {
      const response = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          name: usernameInput.value, 
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      const result = await response.json();
      console.log (result);

      if (response.status === 201) {
        // Successful signup
        alert('Account created successfully!');
        // Redirect or perform any other actions after successful signup
        window.location.href = 'login.html';
      } else {
        // Handle signup errors
        alert(result.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again.');
    }
  }
});

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
  //USERNAME
 if (usernameInput.value.trim() === '') {
    setError(usernameInput, 'Name is required!');
 } else if (usernameInput.value.trim().length < 5 || usernameInput.value.trim().length > 15) {
    setError(usernameInput, 'Name must be min 5 and max 15 charecters');
 } else {
    setSuccess(usernameInput);
 }
 //EMAIL
 if (emailInput.value.trim() == '') {
    setError(emailInput, 'Provide email address');
 } else if (isEmailValid(emailInput.value)) {
    setSuccess(emailInput);
 } else {
    setError(emailInput, 'Provide a valid email address');
 }

 //PASSWORD
 if (passwordInput.value.trim() == '') {
    setError(passwordInput, 'Password can not be empty');
 } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
    setError(passwordInput, 'Password min 6 max 20 charecters');
 } else {
    setSuccess(passwordInput);
 }
 //CONFIRM PASSWORD
 if (confirmPasswordInput.value.trim() == '') {
    setError(confirmPasswordInput, 'This field can not be empty');
 } else if (confirmPasswordInput.value !== passwordInput.value) {
    setError(confirmPasswordInput, 'Password does not match');
 } else {
    setSuccess(confirmPasswordInput);
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
  











/* const form = document.querySelector('#sign-up-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm();

    if (isFormValid()) {
        const usersData = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the user with the same email already exists
        const existingUser = usersData.find(user => user.email === emailInput.value);

        if (existingUser) {
            setError(emailInput, 'Conflict. Email already exists');
        } else {
            const newUser = {
                username: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                blocked: false // New property to track blocked status
            };

            usersData.push(newUser);
            localStorage.setItem('users', JSON.stringify(usersData));

            form.submit();
            alert("Account created successfully!");
        }
    }
});

// ... (rest of the validation functions remain the same)

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
    //USERNAME
    if (usernameInput.value.trim() === '') {
        setError(usernameInput, 'Name is required!');
    } else if (usernameInput.value.trim().length < 5 || usernameInput.value.trim().length > 15) {
        setError(usernameInput, 'Name must be min 5 and max 15 charecters');
    } else {
        setSuccess(usernameInput);
    }
    //EMAIL
    if (emailInput.value.trim() == '') {
        setError(emailInput, 'Provide email address');
    } else if (isEmailValid(emailInput.value)) {
        setSuccess(emailInput);
    } else {
        setError(emailInput, 'Provide a valid email address');
    }

    //PASSWORD
    if (passwordInput.value.trim() == '') {
        setError(passwordInput, 'Password can not be empty');
    } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
        setError(passwordInput, 'Password min 6 max 20 charecters');
    } else {
        setSuccess(passwordInput);
    }
    //CONFIRM PASSWORD
    if (confirmPasswordInput.value.trim() == '') {
        setError(confirmPasswordInput, 'This field can not be empty');
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        setError(confirmPasswordInput, 'Password does not match');
    } else {
        setSuccess(confirmPasswordInput);
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
*/