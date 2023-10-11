import { getWorks } from "./requests.js";

let works = await getWorks();

console.log(works);

function setProjets(){

    for (let index = 0; index < works.length; index++) {
        console.log(works[index].id);
        const gallery = document.querySelector('.gallery');
        const figureElement = document.createElement('figure');

        const imageElement = document.createElement('img');
        imageElement.src = works[index].imageUrl;

        const figCaptionElement = document.createElement('figcaption');
        figCaptionElement.textContent = works[index].title;

        gallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figCaptionElement);
        // gallery.innerHTML += `<figure><img src="${works[index].imageUrl}"><figcaption>${works[index].title}</figcaption></figure>`
        
    }

};

setProjets();