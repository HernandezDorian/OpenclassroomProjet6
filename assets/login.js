let isAlreadyHeremail = false;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const submit = document.querySelector('#submit');

function validateEmail(str) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = regex.test(str); 
    return result;
  }

function incorrect(parent, message){
        const div = document.querySelector(parent);
        const error = document.createElement('p');
        error.classList.add('errormessage');
        error.textContent = message;
        div.appendChild(error);
        return isAlreadyHeremail = true; 
};

submit.addEventListener('click', (e) => {
    let validmail = false;
    let validpass = false;
    e.preventDefault();
    const errormessage = document.querySelectorAll(".errormessage")
    if(errormessage.length > 0){
        for (let index = 0; index < errormessage.length; index++) {
            errormessage[index].parentNode.removeChild(errormessage[index]);
        }
    } 
    
    // Vérifier la validité du champ email
    if (validateEmail(email.value)){
        validmail = true;
    }
    else {

        email.classList.add('errorform');
        incorrect("#maildiv","L'email n'est pas conforme")
        sleep(500).then(() => { email.classList.remove('errorform'); });
        console.log("erreur dans l'email");
        validmail = false;
    }

    if (password.value != ""){
        validpass = true;
    }
    else {

        password.classList.add('errorform');
        incorrect("#passdiv","Le mot de passe est vide")
        sleep(500).then(() => { password.classList.remove('errorform'); });
        console.log("erreur dans le mot de passe");
        validpass = false;
    }

    if (validmail && validpass) {
        console.log(email.value + " " + password.value);
    }
    
});
