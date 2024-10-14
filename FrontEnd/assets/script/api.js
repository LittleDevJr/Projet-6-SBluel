//Creation fonction pour récupérer les images et description puis filtrer

async function recupWork() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const donnee = await reponse.json();
    afficheGallerie(donnee);
    prepaFiltre(donnee);
}

function afficheGallerie(objets) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    objets.forEach(objet => {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const titreImage = document.createElement('p');

        img.src = objet.imageUrl;
        img.alt = objet.title;
        titreImage.textContent = objet.title;

        article.appendChild(img);
        article.appendChild(titreImage);
        gallery.appendChild(article);
    });
}

function prepaFiltre(donnee) {
    const ensembleFiltre = document.querySelector('.boutonFiltre');

    const navigateur = document.createElement('nav');
    const ensembleListe = document.createElement('ul');
    ensembleListe.className = "ensembleListe";

    const filtres = [
        { name: 'Tous', categoryId: null },
        { name: 'Objets', categoryId: 1 },
        { name: 'Appartements', categoryId: 2 },
        { name: 'Hotels & Restaurants', categoryId: 3 }
    ];

    filtres.forEach(filtre => {
        const liste = document.createElement('li');
        const bouton = document.createElement('button');
        bouton.innerText = filtre.name;
        bouton.className = "filtreBouton";

        bouton.addEventListener('click', () => {
            if (filtre.categoryId === null) {
                afficheGallerie(donnee);
            } else {
                const donneeFiltre = donnee.filter(objet => objet.categoryId === filtre.categoryId);
                afficheGallerie(donneeFiltre);
            }
        });

        liste.appendChild(bouton);
        ensembleListe.appendChild(liste);
    });

    navigateur.appendChild(ensembleListe);
    ensembleFiltre.appendChild(navigateur);
}



recupWork();

//Création fonction affichage photo pour modale1

async function photoModale() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const donnee = await reponse.json();
    affichePhoto(donnee);
}

function affichePhoto(objets) {
    const galleriePhoto = document.querySelector('.galleriePhoto');
    galleriePhoto.innerHTML = '';

    objets.forEach(objet => {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const iconeSuppression = document.createElement('i')


        img.src = objet.imageUrl;
        img.alt = objet.title;

        iconeSuppression.className = 'fas fa-trash iconePoubelle';
        iconeSuppression.addEventListener('click', () => {
            supprimerImage(objet.id, article);
        });

        article.appendChild(img);
        article.appendChild(iconeSuppression);
        galleriePhoto.appendChild(article);
    });
}
photoModale();

async function supprimerImage(imageId, articleElement) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        articleElement.remove();
        alert('Image supprimée avec succès!');
    } else {
        alert('Erreur lors de la suppression de l\'image.');
    }
}

//Envoi du formulaire ajout photo

const boutonValidation = document.querySelector(".boutonValidation");
const formTitre = document.getElementById("formTitre");
const categorie = document.getElementById("category");
const inputPhotos = document.getElementById("inputPhoto");

function checkFormCompletion() {
    if (formTitre.value && inputPhotos.files[0] && categorie.value) {
        boutonValidation.style.backgroundColor = "#1D6154";
    } else {
        boutonValidation.style.backgroundColor = ""; // Remet la couleur par défaut
    }
}

formTitre.addEventListener("input", checkFormCompletion);  
categorie.addEventListener("change", checkFormCompletion); 
inputPhotos.addEventListener("change", checkFormCompletion);


boutonValidation.addEventListener("click", async function (event) {
    event.preventDefault();

    if (!formTitre.value || !inputPhotos.files[0] || !categorie.value) {
        alert("Veuillez remplir tout les champs du formulaire sans oublier la photo");
        return;
    } 

    const categorysId = categorie.value;

    const formData = new FormData();
    formData.append("title", formTitre.value);
    formData.append("category", categorysId);
    formData.append("image", inputPhotos.files[0]);

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: formData
        });

        if (response.ok) {
            alert("Projet ajouté avec succès.");
            const data = await response.json();

            recupWork();
            modale2.style.display = 'none';
            sousModale.style.display = "none";
        } else {
            alert("Erreur lors de l'envoi du formulaire.");
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi du projet", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
})

