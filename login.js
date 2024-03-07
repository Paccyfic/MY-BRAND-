const form = document.querySelector('#sign-up-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  validateForm();

  if (isFormValid()) {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: usernameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        // Successful login
        alert('Login successful!');

      // Save token or perform any other actions after successful login
        window.location.href = 'index.html';
      } else {
        // Handle login errors
        alert(result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
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
  } else if (usernameInput.value !== usernameExists) {
      setError(usernameInput, 'User doesn`t exist!');
  } 
  else {
      setSuccess(usernameInput);
  }
  //EMAIL
  if (emailInput.value.trim() == '') {
      setError(emailInput, 'Provide email address');
      
  } 
  else if (emailInput.value === emailExists) {
      setSuccess(emailInput);
  }
  else {
      setError(emailInput, 'Incorrect email or Password!');
  }
  //PASSWORD
  if (passwordInput.value.trim() == '') {
      setError(passwordInput, 'Password can not be empty');
  } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
      setError(passwordInput, 'Password min 6 max 20 charecters');
  } 
  else if (passwordInput.value === passwordExists){
      setSuccess(passwordInput);
  }
  else  {
      setError(passwordInput,'Incorrect email or password!');
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

// ... (rest of the validation functions remain the same)







/*const form = document.querySelector('#sign-up-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm();
    console.log(isFormValid());
    if (isFormValid() == true) {
        const emailExists = localStorage.getItem('email');
        const passwordExists = localStorage.getItem('password');
        const usernameExists = localStorage.getItem('username');
        if (emailExists === emailInput.value ) {
            setSuccess(emailInput);
        } 
        else if (passwordExists === passwordInput.value ){
            setSuccess(passwordInput);
        } else if (usernameExists === usernameInput.value){
            setSuccess(usernameInput);
        }
        else {
            setError( );
            // localStorage.setItem('email', emailInput.value)
            //localStorage.setItem('username', usernam          //  localStorage.setItem('password', passwordInput.value) 
            alert("Welcome to my Portfolio!");
           
        } form.submit();
    } 
   
    
})

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
    const emailExists = localStorage.getItem('email');
    const passwordExists = localStorage.getItem('password');
    const usernameExists = localStorage.getItem('username');
    if (usernameInput.value.trim() === '') {
        setError(usernameInput, 'Name is required!');
    } else if (usernameInput.value.trim().length < 5 || usernameInput.value.trim().length > 15) {
        setError(usernameInput, 'Name must be min 5 and max 15 charecters');
    } else if (usernameInput.value !== usernameExists) {
        setError(usernameInput, 'User doesn`t exist!');
    } 
    else {
        setSuccess(usernameInput);
    }
    //EMAIL
    if (emailInput.value.trim() == '') {
        setError(emailInput, 'Provide email address');
        
    } 
    else if (emailInput.value === emailExists) {
        setSuccess(emailInput);
    }
    else {
        setError(emailInput, 'Incorrect email or Password!');
    }
    //PASSWORD
    if (passwordInput.value.trim() == '') {
        setError(passwordInput, 'Password can not be empty');
    } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
        setError(passwordInput, 'Password min 6 max 20 charecters');
    } 
    else if (passwordInput.value === passwordExists){
        setSuccess(passwordInput);
    }
    else  {
        setError(passwordInput,'Incorrect email or password!');
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