export async function getWorks(){
    try {
        const repWorks = await fetch('http://localhost:5678/api/works')
        let reponse = await repWorks.json();
        return reponse;
    } catch (error) {
        console.error("Erreur dans le getWorks: " + error);
    }
    
}

export async function getCategories(){
    try {
        const repCategories = await fetch('http://localhost:5678/api/categories')
        let reponse = await repCategories.json();
        return reponse;
    } catch (error) {
        console.error("Erreur dans le getCategories: " + error);
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
        console.error("Erreur dans le postLogin: " + error);
    }
    
};

export async function postWorks(data){
    try {
        let loginData = localStorage.getItem('loginData');
        loginData = JSON.parse(loginData);
        // console.log (JSON.stringify(data))

    //     const formData = new FormData();
    // formData.append('image', data.image);
    // formData.append('title', data.title);
    // formData.append('category', data.category);

    // for (const pair of formData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    //   }

        // const boundary = '--------------------------' + Math.random().toString(36).substr(2, 15);
        // const contentTypeHeader = `multipart/form-data; boundary=${boundary}`;

        const resp = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
                //   'accept': 'application/json',
                //   'Authorization': `Bearer ${loginData.token}`,
                //   'Content-Type': 'multipart/form-data' 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginData.token}`
                
                }, 
        body: JSON.stringify(data)
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

        const resp = await fetch('http://localhost:5678/api/works/'+data, { method: 'DELETE',
        headers: {'Authorization': `Bearer ${loginData.token}`}
    })
    } catch (error) {
        console.error("Erreur dans le delWorks: " +error);
    }

};