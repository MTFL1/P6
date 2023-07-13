/*******************LOG IN ********************************************************/
const submit = document.querySelector('input[type="submit"]');

submit.addEventListener("click", function (e) {
    e.preventDefault()
    FetchUserLogin()
});



async function FetchUserLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.querySelector(".erreur-msg");
   
    try {
        const response = await fetch("http://"+ window.location.hostname +":5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        });

        if (response.ok) {
            window.location.href = "./index.html";
             // Token d'autentification
            const dataUser = await response.json();
            // console.log(dataUser)
            // Enregistrement du token d'authentification et du login dans le stockage local
            localStorage.setItem("token", dataUser.token)
            localStorage.setItem("login", true)
        }

        else {
            localStorage.setItem("token", undefined)
            localStorage.setItem("login", undefined)
            errorMsg.innerText = "Erreur dans l’identifiant ou le mot de passe";
            console.log("Connexion Impossible : Erreur Identifiant ou Mot de passe")
        }
    }

    catch (e) {
        console.log(e);
    }
};


// Mode edition si login 

const log = document.querySelector("#log");
const modifierBtn = document.querySelector(".btnModifier");
const banner = document.querySelector(".banner")

function editMode() {
  if (localStorage.login) {
    log.innerText = "logout";
    modifierBtn.style.display = "block"; // Afficher le bouton "Modifier"
    banner.style.display = "block"
    console.log("Vous êtes connecté !");
  } else {
    log.innerText = "login";
    modifierBtn.style.display = "none"; // Masquer le bouton "Modifier"
    console.log("Vous n'êtes pas connecté !");
  }
}

editMode();

// Désactiver le mode avec logout
log.addEventListener("click", () => {
  localStorage.removeItem("login");
  localStorage.removeItem("token");
  banner.style.display = "none"

  editMode();

  localStorage.clear();
});

  