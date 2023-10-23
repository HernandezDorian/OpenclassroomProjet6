import { getWorks, getCategories, delWorks, postWorks } from "./requests.js";

let works = await getWorks();
let categories = await getCategories();

export function openModal() {
    
}