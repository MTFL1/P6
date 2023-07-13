/****************************FETCH & FONCTIONS DE LA GALLERIE******************************************/

// Fonction pour récupérer les projets via l'API
function fetchWorks() {
  return fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .catch(error => {
      console.log("Erreur lors de la récupération des projets :", error);
    });
}

// Fonction pour afficher les projets sur la page d'accueil
function fetchWorksDisplayGallery(targetElement) {
  return fetchWorks()
    .then(data => {
      const galleryElement = document.querySelector(targetElement);
      data.forEach(jsonWork => {
        const figure = document.createElement('figure');
        figure.classList.add('work');
        figure.dataset.category = jsonWork.categoryId;

        const img = document.createElement('img');
        img.src = jsonWork.imageUrl;
        img.alt = 'image du projet';
        figure.appendChild(img);

        const title = document.createElement('figcaption');
        title.innerText = jsonWork.title; // Ajout du titre du projet
        figure.appendChild(title);

        galleryElement.appendChild(figure);
      });
    });
}

/****************************FILTRES DE LA GALLERIE******************************************/

// Sélection des éléments nécessaires dans le DOM
const galleryElement = document.querySelector(".gallery");
const filterObjetsButton = document.getElementById("filter-objets");
const filterAppartementsButton = document.getElementById("filter-appartements");
const filterHotelsRestaurantsButton = document.getElementById("filter-hotels-restaurants");
const filterTousButton = document.getElementById("filter-tous");

// Variable pour stocker les données des projets
let projectsData = [];

// Fonction pour afficher les projets dans la galerie en fonction du filtre
function displayProjectsInGallery(filter = null) {
  galleryElement.innerHTML = ''; // Effacer le contenu de la galerie

  projectsData.forEach(jsonWork => {
    if (filter && jsonWork.category.name !== filter) {
      return; // Ignorer les projets qui ne correspondent pas au filtre
    }

    const figure = document.createElement('figure');
    figure.classList.add('work');
    figure.dataset.category = jsonWork.categoryId;

    const img = document.createElement('img');
    img.src = jsonWork.imageUrl;
    img.alt = 'image du projet';
    figure.appendChild(img);

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = jsonWork.title;
    figure.appendChild(figcaption);

    galleryElement.appendChild(figure);
  });
}

// Récupérer les données des projets et afficher tous les projets par défaut
fetchWorksDisplayGallery(".gallery");

// Récupérer les données des projets et les stocker dans la variable projectsData
fetchWorks().then(data => {
  projectsData = data;
});

// Ajouter des écouteurs d'événements pour les boutons de filtre

filterTousButton.addEventListener("click", () => {
  displayProjectsInGallery();
});

filterObjetsButton.addEventListener("click", () => {
  displayProjectsInGallery("Objets");
});

filterAppartementsButton.addEventListener("click", () => {
  displayProjectsInGallery("Appartements");
});

filterHotelsRestaurantsButton.addEventListener("click", () => {
  displayProjectsInGallery("Hotels & restaurants");
});



