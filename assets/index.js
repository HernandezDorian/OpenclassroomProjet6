import { getWorks, getCategories, delWorks, postWorks } from "./requests.js";
import { openModal, closeModal, uploadPhoto, postImage } from "./modal.js";


let works = await getWorks();
let categories = await getCategories();




function setFilter(){ 
    for (let index = 0; index < categories.length; index++) {
        const filtersec = document.querySelector('.filter-sec');
        
        const filterElement = document.createElement('button');
        filterElement.classList.add('filter');
        filterElement.id = "filtre_"+categories[index].id;
        try {
            filterElement.textContent = categories[index].name;
            filtersec.appendChild(filterElement);
        } catch (error) {
            console.log("Erreur dans la nomination des éléments filtres dans l'API");
        }
    }
}

function filterSelec(){
    let actualselect = "filtre_0"
    let filter_0 = works
    let filter_1 = works.filter(item => item.category.id === 1);
    let filter_2 = works.filter(item => item.category.id === 2);
    let filter_3 = works.filter(item => item.category.id === 3);
    for (let index = 0; index < categories.length + 1; index++) {
        document.getElementById(`filtre_${index}`).addEventListener('click', function(){
            document.getElementById(`filtre_${index}`).classList.add("filter-selec");
            document.getElementById(actualselect).classList.remove("filter-selec");
            actualselect = `filtre_${index}`
            document.querySelector(".gallery").innerHTML = "";
            
            switch (actualselect) {
                case "filtre_0":
                    setProjets(filter_0);
                    break;
            
                case "filtre_1":
                    setProjets(filter_1);
                    break;
                    
                case "filtre_2":
                    setProjets(filter_2);
                    break;
                    
                case "filtre_3":
                    setProjets(filter_3);
                    break;
            }
            
        });
    }

};

// function filterSelecRm(id){
//     id.classList.remove("filter-selec");
// };

function setProjets(listeProjets){
    // switch (key) {
    //     case 0:
            for (let index = 0; index < listeProjets.length; index++) {
                const gallery = document.querySelector('.gallery');
                const figureElement = document.createElement('figure');
                const imageElement = document.createElement('img');
                try {
                    imageElement.src = listeProjets[index].imageUrl;
                } catch (error) {
                    console.log("Erreur dans l'url des images de projets dans l'API");
                }
                const figCaptionElement = document.createElement('figcaption');
                try {
                    figCaptionElement.textContent = listeProjets[index].title;
                } catch (error) {
                    console.log("Erreur dans la nomination des titres de projets dans l'API");
                }
                gallery.appendChild(figureElement);
                figureElement.appendChild(imageElement);
                figureElement.appendChild(figCaptionElement);
            }
            // gallery.innerHTML += `<figure><img src="${works[index].imageUrl}"><figcaption>${works[index].title}</figcaption></figure>`
    //     break;
    
        
    // }

};

setFilter();
setProjets(works);
filterSelec();

    let loginData = ''
    loginData = localStorage.getItem('loginData');
    loginData = JSON.parse(loginData);

  
try {
        if(loginData){
        const edit = document.querySelector('.edit');
        edit.style.display = "flex";

        const loginBtn = document.querySelector('.loginBtn');
        loginBtn.href="";
        loginBtn.innerText="logout";

        loginBtn.addEventListener('click', (e) => {
            loginData = '';
            localStorage.removeItem('loginData');
        })

        const editImg = document.createElement('img');
        editImg.classList.add('editImg');
        editImg.src = "assets/icons/whitemodif.svg"

        const editTxt = document.createElement('p');
        editTxt.classList.add('editTxt');
        editTxt.innerText = "Mode édition"

        edit.appendChild(editImg);
        edit.appendChild(editTxt);

        const modif = document.querySelector('.modif');

        const textElement = document.createElement('p');
        textElement.innerText = "modifier"

        const imgElement = document.createElement('img');
        imgElement.src = "assets/icons/modif.svg"

        modif.appendChild(textElement);
        modif.appendChild(imgElement);
        
        modif.addEventListener('click', (e) => { // Le bouton modifier sur la page
       
            openModal(); // Ouvrir le popup

            // Ajouter ça en fonction
            const trash = document.querySelectorAll(".divtrash");
            for (let index = 0; index < trash.length+1; index++) {
                    const element = trash[index];
                    if (index < works.length) {
                        
                        trash[index].addEventListener('click', (e) => {
                            
                            delWorks(works[index].id).then(resp => {
                                window.location = window.location.href; // Rafraichir la page après avoir supprimé un élément
                            })
                            
                        })
                    }
            }
            
            const cross = document.querySelector(".modal__cross");
            
            cross.addEventListener('click', (e) => {
                const modal = document.querySelector('.modal');
                closeModal(modal); // Fermer le popup
            })

            const postPicture = document.querySelector(".PostPicture") // Accès a la fenêtre d'upload
            postPicture.addEventListener('click', (e) => {
                e.preventDefault();
                uploadPhoto(); // Se rendre dans la fenêtre d'upload
                
                cross.addEventListener('click', (e) => { // La croix pour refermer le  popup
                    const modal = document.querySelector('.modal');
                    closeModal(modal); // Fermer le popup
                })
                const arrrowBack = document.querySelector(".modal__arrow") 
                    arrrowBack.addEventListener('click', (e) => {
                        cross.click();
                        modif.click();
                })
                
                const validPictureButtonElem = document.querySelector(".PostPicture");
                validPictureButtonElem.addEventListener('click', (e)=>{
                    e.preventDefault();
                    postImage(); // Envoie d'image à l'API
                    
                });

            })

        })
            
    }
} catch (error) {
    console.log("Non authentifié : " + error)
}
