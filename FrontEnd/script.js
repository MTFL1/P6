/****************************FETCH & FONCTIONS DE LA GALLERIE******************************************/


// Fonction pour récupérer les projets via l'API
function fetchWorks() {
    return fetch("http://localhost:5678/api/works")
      .then(data => data.json());           
  }

//Fonction pour afficher les projets sur la page d'accueil
function fetchWorksDisplayGallery(targetElement) {
    return fetchWorks()
  .then(dataWork => {    
    // Permets de selectionner un élément dans la gallerie
    const galleryElement = document.querySelector(targetElement);

    dataWork.forEach(jsonWork => {
        // Créer l'élement figure pour représenter le projet
        const figure = document.createElement('figure');
        figure.classList.add('work');
        figure.dataset.category = jsonWork.categoryId;
  
        // Créer l'image du projet a afficher 
        const img = document.createElement('img');
        img.src = jsonWork.imageUrl;
        img.alt = 'image du projet';
        figure.appendChild(img);

        //Si l'élément ciblé est la galerie, créer l'élément figcaption avec le titre du projet
        if (targetElement === '.gallery') {
          const figcaption = document.createElement('figcaption');
          figcaption.textContent = jsonWork.title;
          figure.appendChild(figcaption);
        }
        galleryElement.appendChild(figure);
})
})
}

/****************************FILTRES DE LA GALLERIE******************************************/



  // Récupérer tous les éléments nécessaires
const galleryElement = document.querySelector(".gallery");
const filterObjetsButton = document.getElementById("filter-objets");
const filterAppartementsButton = document.getElementById("filter-appartements");
const filterHotelsRestaurantsButton = document.getElementById("filter-hotels-restaurants");
const filterTousButton = document.getElementById("filter-tous");

// Variable pour stocker les données des projets
let projectsData = [];

// Fonction pour récupérer les projets via l'API
function fetchWorks() {
  return fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      projectsData = data; // Stocker les données des projets
      return data;
    })
    .catch(error => {
      console.log("Erreur lors de la récupération des projets :", error);
    });
}


// Fonction pour afficher les projets sur la page d'accueil
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
fetchWorks().then(() => {
  displayProjectsInGallery();
});

// Écouteurs d'événements pour les boutons de filtre
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
