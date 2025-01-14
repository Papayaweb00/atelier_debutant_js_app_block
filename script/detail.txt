const id = new URLSearchParams(window.location.search).get('id')
const topcontent = document.getElementById('detail');
const buttonsup = document.querySelector('.suppr');
const buttonmodif = document.querySelector('.modif');
const formmodif = document.querySelector('#modif');
const modif_text = document.querySelector('#modif_text');
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
    
    // Button permettant de supprimer l'article
    buttonsup.addEventListener('click', async () => {
        const resuppr = await fetch(url + id, {
            method: 'DELETE'
        });
        window.location.replace('/index.html');
    })

    buttonmodif.addEventListener('click', () => {
        formmodif.classList.add('active');
        modif_text.textContent = post.Body;
        formmodif.addEventListener('submit', (e) => {
            if (modif_text.value.trim() === '') {
                e.preventDefault();
                modif_text.classList.add('erreur'); // Ajoute une classe d'erreur si le champ est vide
            } else {
                modif_text.classList.remove('erreur'); // Retire la classe d'erreur si le champ n'est pas vide
                (async function modifyTextFunc() {
                    const resmodif = await fetch(url + id, {
                        method: 'PUT', // Changez 'UPDATE' en 'PUT' pour corriger la méthode HTTP
                        body: JSON.stringify({ ...post, Body: modif_text.value }), // Envoie le texte modifié dans le corps de la requête en conservant les autres champs
                        headers: { 'Content-Type': 'application/json' } // Définit le type de contenu comme JSON
                    });
                })();
                // Redirige vers la page d'accueil
                window.open('../index.html');
            }
            // window.location.replace('/index.html'); // Redirige vers la page d'accueil
        });
    })
}


window.addEventListener('DOMContentLoaded', () => renderDetail());