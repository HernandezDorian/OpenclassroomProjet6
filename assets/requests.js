export async function getWorks(){
    try {
        const repWorks = await fetch('http://localhost:5678/api/works')
        let reponse = await repWorks.json();
        return reponse;
    } catch (error) {
        console.error("Erreur dans le getWorks");
    }
    
}

export async function getCategories(){
    try {
        const repCategories = await fetch('http://localhost:5678/api/categories')
        let reponse = await repCategories.json();
        return reponse;
    } catch (error) {
        console.error("Erreur dans le getCategories");
    }
    
}

export async function postLogin(data){
    try {
        const resp = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
      })

        const dataGet = await resp.json();

        localStorage.setItem("loginData", JSON.stringify(dataGet));

        return resp;
        
    } catch (error) {
        console.error("Erreur dans le postLogin");
    }
    
};

export async function postWorks(data){
    try {
        let loginData = localStorage.getItem('loginData');
        loginData = JSON.parse(loginData);
        console.log(loginData.token);

        const resp = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {'accept': 'application/json',
                  'Authorization': `Bearer ${loginData.token}`,
                  'Content-Type': 'multipart/form-data' }, 
        body: JSON.stringify(data)
      })

        const dataGet = await resp.json();
        
        return resp;

    } catch (error) {
        console.error("Erreur dans le postWorks: " +error);
    }
    
};