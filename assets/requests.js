export async function getWorks(){
    const repWorks = await fetch('http://localhost:5678/api/works')
    let works = await repWorks.json();
    console.log(works);
}