import { getWorks, getCategories } from "./requests.js";

let works = await getWorks();

let categories = await getCategories();

console.log(works);
console.log(categories);

function setFilter(){
    for (let index = 0; index < categories.length; index++) {
        console.log(categories[index].name)
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



function filterSelecRm(id){
    id.classList.remove("filter-selec");
};

function setProjets(){

    for (let index = 0; index < works.length; index++) {
        const gallery = document.querySelector('.gallery');
        const figureElement = document.createElement('figure');

        const imageElement = document.createElement('img');
        try {
            imageElement.src = works[index].imageUrl;
        } catch (error) {
            console.log("Erreur dans l'url des images de projets dans l'API");
        }
        

        const figCaptionElement = document.createElement('figcaption');
        
        try {
            figCaptionElement.textContent = works[index].title;
        } catch (error) {
            console.log("Erreur dans la nomination des titres de projets dans l'API");
        }

        gallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figCaptionElement);

        // gallery.innerHTML += `<figure><img src="${works[index].imageUrl}"><figcaption>${works[index].title}</figcaption></figure>`
        
    }

};

setFilter();
setProjets();