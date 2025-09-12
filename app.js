// HTML Elements
const verificate = document.querySelector(".verificate");
const inputBox = document.querySelector("#password");
const upper = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const digit = document.querySelector("#digit");
const symbol = document.querySelector("#symbol");
const submitButton = document.querySelector("button[type='submit']");
const notif = document.querySelector(".notif");
const lengthCaracter = document.querySelector("#len");
const checkmarkIcon = document.querySelector("#len ion-icon");
const displayPassword = document.querySelector(".display-password");


// CARACTERES
const upperCase = /[A-Z]/;
const lowerCase = /[a-z]/;
const digitCase = /[\d]/;
const symbolCase = /[^a-zA-Z0-9]/;


// VARIABLES : BOOLEAN
let lowerCaseFound = false;
let upperCaseFound = false;
let digitCaseFound = false;
let symbolCaseFound = false;
let lengthCaracterFound = false;
let found = false;

// EVENTS : INPUT
inputBox.addEventListener("keyup", (e) => {

    // CONDITION POUR VERIFIER SI LE CHAMP EST VIDE
    if (e.target.value.trim() === "") {
        verificate.querySelectorAll("p").forEach((element) => {
            element.style.color = "red";
            element.querySelector("ion-icon").setAttribute("name", "close");
        })
        setTimeout(() => {
            verificate.style.display = "none";
        }, 400);
        return;
    }


    // DISPLAY PASSWORD
    displayPassword.style.display = "block";
    displayPassword.onclick = () => {
        displayPassword.innerHTML = `<ion-icon name="${inputBox.type === "password" ? "eye" : "eye-off"}"></ion-icon>`;
        displayPassword.style.color = inputBox.type === "password" ?  "#f95a6fff" : "#333";
        inputBox.type = inputBox.type === "password" ? "text" : "password";
    }

    // AFFICHAGE DE LA DIV VERIFICATE
    verificate.style.display = "block";


    // CONDITION POUR LA LONGUEUR DU MOT DE PASSE
    if (e.target.value.length >= 8) {
        lengthCaracterFound = true;
        checkmarkIcon.setAttribute("name", "checkmark-circle");
        lengthCaracter.style.color = "green";
    }
    else {
        lengthCaracterFound = false;
        checkmarkIcon.setAttribute("name", "close");
        lengthCaracter.style.color = "red";
    }


    // APPEL DE LA FONCTION DE VERIFICATION POUR CHAQUE CONDITION
    lowerCaseFound = verifyInput(e.target.value, lowerCase, lower);
    upperCaseFound = verifyInput(e.target.value, upperCase, upper);
    symbolCaseFound = verifyInput(e.target.value, symbolCase, symbol);
    digitCaseFound = verifyInput(e.target.value, digitCase, digit);



    // CONDITION POUR ACTIVER LE BUTTON SUBMIT
    if (lowerCaseFound && 
        upperCaseFound && 
        digitCaseFound && 
        symbolCaseFound && 
        lengthCaracterFound) {
        submitButton.classList.add("active");
        
        let onetime = false;
        // FONCTION APPELEE LORS DU CLICK OU DE LA TOUCHE ENTER
        function handleAction() {
            if (onetime) return;

            onetime = true;
            notif.style.display = "block";
            inputBox.value = "";
            verificate.style.display = "none";
            submitButton.classList.remove("active");
            inputBox.type = "password";
            displayPassword.innerHTML = `<ion-icon name="eye-off"></ion-icon>`;
            displayPassword.style.color = "#c4abae";
            setTimeout(() => {
                notif.style.display = "none";
            }, 5500)
            submitButton.onclick = null;
            document.onkeydown = null;  
        }
        // CAllBACKS POUR LES EVENTS
        function handleEnter(e) {
            if (e.key === "Enter") {
                handleAction();
            }
        }

        // CLICK OU ENTER EVENT SUBMIT
        submitButton.onclick = handleAction;
        document.onkeydown = handleEnter;
    }
    else {
        submitButton.classList.remove("active");
    }
})



// FONCTION DE VERIFICATION QUI RETOURNE TRUE OU FALSE
function verifyInput(text, cases, element) {
    if (cases.test(text)) {
        found = true;
        element.style.color = "green";
        element.querySelector("ion-icon").setAttribute("name", "checkmark-circle");
    }
    else {
        found = false;
        element.style.color = "red";
        element.querySelector("ion-icon").setAttribute("name", "close");
    }
    
    return found;
}