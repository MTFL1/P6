/***************Modal 1 *************/

// Fonction pour récupérer les données des travaux à partir d'une source externe (API)

function fetchWorks() {
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
  let btn = document.querySelector(".btnModifier");
  let closeBtn = document.querySelector(".close");
  let modalElement = document.querySelector(".modalElement");
  let modal2 = document.getElementById("modal2")
  let AddPicture = document.querySelector(".addpicture");
  const token = localStorage.token;

  
  // Ouvrir la modal lors du clic sur le bouton "Modifier"
  document.querySelector(".btnModifier").addEventListener("click", function() {
    modal1.style.display = "block";
    fetchWorks()
      .then(data => {

    //créer une div image+mot "éditer"
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
  




  
/***************Modal 2 *************/

  // Récupération des éléments de la page

const AddPicModal = document.querySelector(".input-addpic")
const previewImg = document.querySelector(".import-pictures")
const AddTitle = document.querySelector(".title")
const AddCategorie = document.querySelector(".category")
const Submit = document.querySelector(".valider")
const msgError = document.getElementById("msg-error")
const form = document.querySelector(".formmodal2")
console.log(form);


function addImage() {
    // Ajout images
    AddPicModal.addEventListener("input", (e) => {

      const img = URL.createObjectURL(AddPicModal.files[0]);
      previewImg.src = img;
      previewImg.style.setProperty("visibility", "visible");
      const file = e.target.files[0];
      const maxSize = 4 * 1024 * 1024; // 4 Mo
  
      if (file.size > maxSize) {
        // Affiche une erreur si la taille de l'image dépasse 4 Mo
        msgError.innerText = "La taille de l'image ne doit pas dépasser 4 Mo.";
        msgError.style.color = "red";
        return;
      }
      console.log(AddPicModal.files[0]);
      imgPreview = e.target.files[0];
     
      // console.log(img)
    });

    //Titre
    AddTitle.addEventListener("input", (e) => {
        inputTitle = e.target.value;
        console.log(inputTitle)

    });
    //Catégories
    AddCategorie.addEventListener("input", (e) => {
        inputCategory = e.target.selectedIndex;
        console.log(inputCategory)
    });

    // Si tout les elements sont remplies alors changements couleurs boutons !== (strictement different)
    form.addEventListener("change", () => {
        if (imgPreview !== "" && inputTitle !== "" && inputCategory !== "") {
            Submit.style.background = "#1D6154";
            Submit.style.cursor = "pointer";
        }
        else {
            Submit.style.backgroundColor = ''; // Réinitialise la couleur par défaut du bouton
        }
    });


    //Submit
    Submit.addEventListener("click", (e) => {
        e.preventDefault();
        if (imgPreview && inputTitle && inputCategory) {
            const formData = new FormData();
            console.log(imgPreview, inputTitle, inputCategory);
            formData.append("image", imgPreview);
            formData.append("title", inputTitle);
            formData.append("category", inputCategory);
            console.log(formData);
        
            fetchDataSubmit()

            async function fetchDataSubmit() {
                try {
                    // Fetch ajout des travaux
                    const response = await fetch("http://" + window.location.hostname + ":5678/api/works", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    });
                    const dataresponse = await response.json()
                    console.log(dataresponse);
                    msgError.style.color = "#1D6154";
                    Submit.style.background = "#1D6154"

                    //Clear les galleries
                    gallery.innerHTML = "";
                    fetchDataWorks();
                    previewImg.style.setProperty("visibility", "hidden");
                    imgContainer.style.setProperty("display", "flex");
                    setTimeout(() => {
                        msgError.innerText = "";
                    }, 4000);
                }
                catch (error) {
                    console.log("Il y a eu une erreur sur le Fetch: " + error)
                }
            }
          } else {
            msgError.innerText = "Veuillez remplir tous les champs.";
            msgError.style.color = "red";
            setTimeout(() => {
                msgError.innerText = "";
            }, 4000);
            console.log("Tous les champs ne sont pas remplis !");
        }
       
    });
}



addImage();




// Ecouteur d'évenements 

/*A CORRIGER
const arrowBack = document.querySelector('.arrowback');

arrowBack.addEventListener('click', () => {
  const modal2 = document.getElementById('modal2');
  const modal1 = document.getElementById('modal1');
  const modalElement = document.querySelector(".modalElement");

  modal2.style.display = 'none';
  modal1.style.display = "block";
  modalElement.style.display = "block";

});*/



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
      previewImg.innerHTML = "";
    }
  });
    // Fermer la modal2 lors du clic sur la croix
    closeBtn.addEventListener("click", function() {
      modal2.style.display = "none";
      previewImg.innerHTML = "";
    });
  // btn ajouter des photos 
  AddPicture.addEventListener("click", () => {
    modal2.style.display = "block";
    modal1.style.display = "none";

});