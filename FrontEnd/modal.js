/***************Modal 1 *************/
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
  let modal1 = document.getElementById("modal1");
  let btn = document.getElementById("modifierBtn");
  let closeBtn = document.querySelector(".close");
  let modalElement = document.querySelector(".modalElement");
  let modal2 = document.getElementById("modal2")
  let AddPicture = document.querySelector(".addpicture");
  const token = localStorage.token;

  
  // Ouvrir la modal lors du clic sur le bouton "Modifier"
  document.getElementById("modifierBtn").addEventListener("click", function() {
    modal1.style.display = "block";
    fetchWorks()
      .then(data => {
     /*   data.forEach(jsonWork => {
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
*/


          data.forEach(element => {
            // console.log(element.imageUrl, element.title);
            const figure = `<figure class="image-container">
                   <i class="fa-solid fa-trash-can logobin" id="${element.id}"></i> 
            <img class="image-container" src=${element.imageUrl} alt=${element.title}>
            <figcaption>éditer</figcaption>
          </figure>`
    
          modalElement.innerHTML += figure ;

        });

           // Suppression des images 

    const deleteTrash = document.querySelectorAll(".logobin");
    // console.log(deleteTrash)
    deleteTrash.forEach(element => {
      element.addEventListener("click", (event) => {
        FetchDeleteWorks(event.target.id);
        event.preventDefault();
      });
    });
    
      });
  });

  async function FetchDeleteWorks(id) {
    console.log(id);
    const response = await fetch("http://" + window.location.hostname + `:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`
        }
    });
}
  




// Ecouteur d'évenements 


  // Fermer la modal1 lors du clic sur la croix
  closeBtn.addEventListener("click", function() {
    modal1.style.display = "none";
    //Supprime les éléments dans la modale
    modalElement.innerHTML = "";
  });
  
  // Fermer la modal1 lors du clic en dehors de la modal
window.addEventListener("mousedown", function(event) {
    if (!modal1.contains(event.target) && event.target !== btn) {
      modal1.style.display = "none";
       //Supprime les éléments dans la modale
      modalElement.innerHTML = "";
    }
  });
  // Fermer la modal2 lors du clic en dehors de la modal
window.addEventListener("mousedown", function(event) {
    if (!modal2.contains(event.target) && event.target !== btn) {
      modal2.style.display = "none";

    }
  });
    // Fermer la modal2 lors du clic sur la croix
    closeBtn.addEventListener("click", function() {
      modal2.style.display = "none";

    });
  // btn ajouter des photos 
  AddPicture.addEventListener("click", () => {
    modal2.style.display = "block";
    modal1.style.display = "none";

});
  
