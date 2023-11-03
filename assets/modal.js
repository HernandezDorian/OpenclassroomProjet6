import { getWorks, getCategories, delWorks, postWorks } from "./requests.js";
import { refreshDOM } from "./index.js";
let works = ''
let categories = ''
async function get(){
works = await getWorks();
categories = await getCategories();
}
get();
export async function refreshModal() {
    works = await getWorks();
    refreshDOM();
};

const body = document.querySelector('body');
let file = ''
let errormsg = false

async function listElemModal(works) {
    for (let index = 0; index < works.length; index++) {
        const element = works[index];
        const modalListElement = document.querySelector('.modal__list');

        const photoElement = document.createElement('div');
        photoElement.classList.add(`modalElem_${element.id}`);
        photoElement.classList.add('photoElement');
        modalListElement.appendChild(photoElement);
        photoElement.setAttribute('style', `background-image: url(${element.imageUrl})`);
        const divtrash = document.createElement('div');
        divtrash.classList.add('divtrash');
        const trash = document.createElement('img');
        trash.classList.add('trash');
        trash.src = "assets/icons/trash.svg";

        photoElement.appendChild(divtrash);
        divtrash.appendChild(trash);

    }

}

export function openModal() { // Ouvrir le popup
    try {
        const bgmodal = document.createElement('div');
        bgmodal.classList.add('bgmodal');
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalmenuElement = document.createElement('div');
        modalmenuElement.classList.add('modalmenu');

        const arrowElement = document.createElement('div');
        arrowElement.src = "assets/icons/arrow.svg";

        const crossElement = document.createElement('img');
        crossElement.src = "assets/icons/xmark.svg";
        crossElement.classList.add('modal__cross');

        const modalTitleElement = document.createElement('h1');
        modalTitleElement.innerText = "Galerie photo";
        modalTitleElement.classList.add('modal__title');

        const modalListElement = document.createElement('div');
        modalListElement.classList.add('modal__list');

        const buttonAddPictureElement = document.createElement('input');
        buttonAddPictureElement.type = 'submit';
        buttonAddPictureElement.value = 'Ajouter une photo'
        buttonAddPictureElement.classList.add('PostPicture')

        body.appendChild(bgmodal);
        body.appendChild(modal);
        modal.innerHTML = "";
        modalTitleElement.innerText = "Galerie photo"
        modal.appendChild(modalmenuElement);
        modalmenuElement.appendChild(arrowElement);
        modalmenuElement.appendChild(crossElement);
        modal.appendChild(modalTitleElement);
        modal.appendChild(modalListElement);
        modal.appendChild(buttonAddPictureElement);

        listElemModal(works);
    } catch (error) {
        console.log("Erreur dans openModal() : " + error)
    }
}

export function closeModal() { // Fermer le popup
    const modal = document.querySelector('.modal');
    modal.parentNode.removeChild(modal);
    const bgmodal = document.querySelector('.bgmodal');
    bgmodal.parentNode.removeChild(bgmodal);
    errormsg = false
}

export function uploadPhoto() { // Se rendre dans la fenêtre d'upload

    const bgmodal = document.querySelector('.bgmodal');
    const modal = document.querySelector('.modal');
    const modalmenuElement = document.querySelector('.modalmenu');
    const modalTitleElement = document.querySelector('.modal__title');
    const crossElement = document.querySelector('.modal__cross');

    modalmenuElement.innerHTML = "";
    modal.innerHTML = "";
    modal.appendChild(modalmenuElement);
    modal.appendChild(modalTitleElement);
    modalTitleElement.innerText = "Ajout photo"
    const modalArrowBack = document.createElement('img');
    modalArrowBack.src = "assets/icons/arrow.svg"
    modalArrowBack.classList.add('modal__arrow');

    const divPictureElem = document.createElement('div');
    divPictureElem.classList.add('modal__divpicture');

    const pictureElem = document.createElement('img');
    pictureElem.classList.add('modal__picture');
    pictureElem.src = 'assets/icons/picture.svg';
    pictureElem.style.maxWidth = '420px';
    pictureElem.style.maxHeight = '169px';

    const inputPictureElem = document.createElement('input');
    inputPictureElem.type = 'file';
    inputPictureElem.textContent = '';
    inputPictureElem.accept = '.jpg,.png';
    inputPictureElem.style.display = 'none';

    let loadFile = (event) => {
        if (event.target.files[0].size > 4000000) {
            alert(`Fichier trop lourd max 4mo`);

        } else {
            pictureElem.src = URL.createObjectURL(event.target.files[0]);
            file = event.target.files[0]
            buttonPictureElem.style.display = 'none';
            infoPictureElem.style.display = 'none';
        }
    };

    inputPictureElem.addEventListener('change', loadFile);



    const buttonPictureElem = document.createElement('button');
    buttonPictureElem.classList.add('btnUpload');
    buttonPictureElem.innerText = '+ Ajouter photo';
    buttonPictureElem.addEventListener('click', (e) => {
        inputPictureElem.click();
    });

    const infoPictureElem = document.createElement('p');
    infoPictureElem.classList.add('infoUpload');
    infoPictureElem.innerText = `jpg, png : 4mo max`;

    const formPictureElem = document.createElement('form');
    formPictureElem.classList.add('formPicture')

    const titleLabelPictureElem = document.createElement('h3');
    titleLabelPictureElem.innerHTML = 'Titre';

    const titleFormPictureElem = document.createElement('input');
    titleFormPictureElem.type = 'text';
    titleFormPictureElem.classList.add('inputPicutreElem');

    const catLabelPictureElem = document.createElement('h3');
    catLabelPictureElem.innerHTML = 'Catégorie';

    const catFormPictureElem = document.createElement('select');
    catFormPictureElem.classList.add('inputPicutreElem');
    catFormPictureElem.classList.add('inputPicutreElemCat');

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    catFormPictureElem.appendChild(defaultOption);

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.text = category.name;
        catFormPictureElem.appendChild(option);

    });

    const validPictureButtonElem = document.createElement('input');
    validPictureButtonElem.type = 'submit';
    validPictureButtonElem.classList.add('PostPicture');

    modalmenuElement.appendChild(modalArrowBack);
    modalmenuElement.appendChild(crossElement);
    modal.appendChild(divPictureElem);
    divPictureElem.appendChild(pictureElem);
    divPictureElem.appendChild(inputPictureElem);
    divPictureElem.appendChild(buttonPictureElem);
    divPictureElem.appendChild(infoPictureElem);
    modal.appendChild(formPictureElem);
    formPictureElem.appendChild(titleLabelPictureElem);
    formPictureElem.appendChild(titleFormPictureElem);
    formPictureElem.appendChild(catLabelPictureElem);
    formPictureElem.appendChild(catFormPictureElem);
    modal.appendChild(validPictureButtonElem);
}

export function postImage() {
    const catFormPictureElem = document.querySelector('.inputPicutreElemCat');
    const titleFormPictureElem = document.querySelector('.inputPicutreElem');
    let loginData = window.localStorage.getItem('loginData')
    loginData = JSON.parse(loginData);
    let uploadImageData = {
        'title': titleFormPictureElem.value.trim(),
        'image': file,
        'category': parseInt(catFormPictureElem.value)
    }

    if (uploadImageData.title && uploadImageData.image && uploadImageData.category) {
        postWorks(uploadImageData).then(resp => {
            // window.location = window.location.href; // Rafraichir la page après avoir posté un élément ce qui permet de fermer le popup et d'afficher le nouvel élément 
            refreshDOM();
            refreshModal();
            closeModal();

        })
    } else {
        const errorMessage = document.createElement('p');
        if (!errormsg) {
            console.log("tous les info")
            const modal = document.querySelector('.modal');
            const errorMessage = document.createElement('p');
            errorMessage.innerText = "Veuillez rentrer toutes les informations";
            errorMessage.classList.add('animeerror');
            modal.appendChild(errorMessage);
            errormsg = true
        }
    }

};