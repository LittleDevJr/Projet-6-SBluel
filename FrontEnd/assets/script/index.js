
const token = localStorage.getItem('authToken');
const login = document.getElementById('login');
const filtre = document.querySelector(".boutonFiltre");
const modifier = document.querySelector(".modifier");

if (token) {
    login.innerHTML = 'logout';
    filtre.style.display = 'none';
    modifier.style.display = 'flex';

} else {
    login.innerHTML = "login";
}

login.addEventListener("click", () => {
    if (login.innerHTML === 'login') {
        window.location.href = "login.html";
    } else {
        localStorage.removeItem('authToken');
        login.innerHTML = "login";
        filtre.style.display = 'block';
        modifier.style.display = 'none';
    }
});

//Gestion de la modale

document.addEventListener('DOMContentLoaded', function () {

    const modifierButton = document.querySelector('.modifier');
    const modale = document.getElementById('modale');
    const sousModale = document.getElementById('sousModale');
    const fermeModale = document.getElementById('fermeModale');

    modifierButton.addEventListener('click', function () {
        modale.style.display = 'block';
        sousModale.style.display = 'block';
    });

    fermeModale.addEventListener('click', function () {
        modale.style.display = 'none';
        sousModale.style.display = 'none';
    });

    sousModale.addEventListener('click', function () {
        modale.style.display = 'none';
        sousModale.style.display = 'none';
    });
});

//Gestion de la modale2

const versModale2 = document.querySelector('.ajoutPhoto');
const modale2 = document.querySelector('.modale2');
const fermeModale2 = document.getElementById("fermerModale2");
const flecheRetour = document.getElementById("flecheRetour");

versModale2.addEventListener("click", function () {
    modale.style.display = 'none';
    modale2.style.display = 'block';
    sousModale.style.display = 'block';
});

fermeModale2.addEventListener('click', function () {
    modale2.style.display = 'none';
    sousModale.style.display = 'none';
});

sousModale.addEventListener('click', function () {
    modale2.style.display = 'none';
    sousModale.style.display = 'none';
});

flecheRetour.addEventListener('click', function () {
    modale2.style.display = 'none';
    modale.style.display = 'block';
});

//Gestion de recuperation photo Modale 2


const boutonPhoto = document.querySelector('.boutonPhoto');
const inputPhoto = document.getElementById('inputPhoto');
const iconePhoto = document.getElementById('image');
const typePhoto = document.querySelector(".typePhoto");



boutonPhoto.addEventListener('click', function () {
    inputPhoto.click();
});

inputPhoto.addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const cheminImg = new FileReader();

        cheminImg.onload = function (e) {
            iconePhoto.style.display = 'none';
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.style.maxWidth = '170px';
            imgElement.style.maxHeight = '180px';
            iconePhoto.parentNode.appendChild(imgElement);
            boutonPhoto.style.display = "none";
            typePhoto.style.display = "none";
            const encadrement = document.querySelector(".encadrement");
            encadrement.style.padding = "0 155px"
        }

        cheminImg.readAsDataURL(file);
    }
});

