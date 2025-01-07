const id = new URLSearchParams(window.location.search).get('id')
const topcontent = document.getElementById('detail');
const buttonsup = document.querySelector('.suppr');
const buttonmodif = document.querySelector('.modif');
// console.log(buttonmodif);

// console.log(topcontent);
const renderDetail = async () => {
    const url = 'http://localhost:3000/posts/';
    const res = await fetch(url + id);

    const post = await res.json();

    // console.log(post);

    const l = create('h2', topcontent, 'titre', post.title);
    
    // -----div content text article
    const k = create('p', topcontent, 'text', post.Body);
    // console.log(h2);

    buttonsup.addEventListener('click', async () => {
        const resuppr = await fetch(url + id, {
            method: 'DELETE'
        });
        window.location.replace('/index.html');
    })

    buttonmodif.addEventListener('click', async () => {
        // modification text
        let modiftext = prompt('Mettez vos modifications.\nNB: Si vous ecrivez un mot cela va remplacer le texte deja ecrit.');

        const resmodif = await fetch(url + id, {
            // Changez 'UPDATE' en 'PUT' pour corriger la méthode HTTP
            method: 'PUT',
    
            // Définit le type de contenu comme JSON
            body: JSON.stringify({...post, Body: modiftext }),
            headers: { 'Content-Type': 'application/json' }
        })
        // Redirige vers la page d'accueil
        window.location.replace('/index.html');
    })
}


window.addEventListener('DOMContentLoaded', () => renderDetail());