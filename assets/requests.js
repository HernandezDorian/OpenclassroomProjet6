const API = 'http://localhost:5678/api' // Mettre l'adresse de l'API ici

export async function getWorks(){
    try {
        const repWorks = await fetch(API+'/works')
        let reponse = await repWorks.json();
        return reponse;
    } catch (error) {
        console.error("Erreur dans le getWorks: " + error);
    }
    
}

export async function getCategories(){
    try {
        const repCategories = await fetch(API+'/categories')
        let reponse = await repCategories.json();
        return reponse;
    } catch (error) {
        console.error("Erreur dans le getCategories: " + error);
    }
    
}

export async function postLogin(data){
    try {
        const resp = await fetch(API+'/users/login', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
      })

        const dataGet = await resp.json();

        localStorage.setItem("loginData", JSON.stringify(dataGet));

        return resp;
        
    } catch (error) {
        console.error("Erreur dans le postLogin: " + error);
    }
    
};

export async function postWorks(data){
    try {
        let loginData = localStorage.getItem('loginData');
        loginData = JSON.parse(loginData);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('image', data.image);
        const resp = await fetch(API+'/works', {
        method: "POST",
        headers: {
                'Authorization': `Bearer ${loginData.token}`
                }, 
        body: formData
      })
        return resp;
    } catch (error) {
        console.error("Erreur dans le postWorks: " +error);
    }
};

export async function delWorks(data){

    try {
        let loginData = localStorage.getItem('loginData');
        loginData = JSON.parse(loginData);

        const resp = await fetch(API+'/works/'+data, 
        { 
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${loginData.token}`}
    })
    return resp;
    } catch (error) {
        console.error("Erreur dans le delWorks: " +error);
    }

};