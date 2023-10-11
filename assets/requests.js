export async function getWorks(){
    const repWorks = await fetch('http://localhost:5678/api/works')
    let reponse = await repWorks.json();
    return reponse;
}

export async function getCategories(){
    const repCategories = await fetch('http://localhost:5678/api/categories')
    let reponse = await repCategories.json();
    return reponse;
}