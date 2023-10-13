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

export async function postLogin(data){
    const resp = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
      })
        const dataGet = await resp.json();
        localStorage.setItem("loginData", JSON.stringify(dataGet));
        return resp;

};