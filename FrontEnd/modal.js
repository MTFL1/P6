/***************Modal1 *************/
// Fonction pour récupérer les données des travaux à partir d'une source externe (API)
function fetchWorks() {
    // Remplacez l'URL par l'URL réelle qui récupère les données des travaux via l'API
    return fetch("http://localhost:5678/api/works")
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des travaux:', error);
        return [];
      });
  }
  
  // Récupération des éléments de la page
  let modal = document.getElementById("myModal");
  let btn = document.getElementById("modifierBtn");
  let closeBtn = document.querySelector(".close");
  let modalElement = document.querySelector(".modalElement");
  
  // Ouvrir la modal lors du clic sur le bouton "Modifier"
  document.getElementById("modifierBtn").addEventListener("click", function() {
    modal.style.display = "block";
    fetchWorks()
      .then(data => {
        data.forEach(jsonWork => {
            //créer une div image+mot "éditer"
          const imgContainer = document.createElement('div');
          imgContainer.classList.add('image-container');
  
          const img = document.createElement('img');
          img.src = jsonWork.imageUrl;
          img.alt = 'image du projet';
  
          const editLabel = document.createElement('span');
          editLabel.textContent = 'éditer';
  
          imgContainer.appendChild(img);
          imgContainer.appendChild(editLabel);
          modalElement.appendChild(imgContainer);
        });
      });
  });
  
  // Fermer la modal lors du clic sur la croix
  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
    //Supprime les éléments dans la modale
    modalElement.innerHTML = "";
  });
  
  // Fermer la modal lors du clic en dehors de la modal
window.addEventListener("mousedown", function(event) {
    if (!modal.contains(event.target) && event.target !== btn) {
      modal.style.display = "none";
       //Supprime les éléments dans la modale
      modalElement.innerHTML = "";
    }
  });
  