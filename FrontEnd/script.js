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

  // Récupère les données de l'API Works
  fetchWorks()
  .then(dataWork => {
// Affiche le projet dans la gallerie
fetchWorksDisplayGallery(".gallery");
  })
