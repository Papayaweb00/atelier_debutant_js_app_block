// localStorage.setItem('blogContent', JSON.stringify(blogContent));
// Selection div #blog
const blog = document.querySelector("#blog");
const search = document.querySelector('#search');

// Fonction qui permet de creer des elements et les ajouter sur la page
const create = (a, b, c, d = '') => {
    // Creation element
    let element = document.createElement(a);
    // ajout class a l'element
    element.classList.add(c);
    // ajout du contenu
    if (d) {
        element.innerText = d;
    }
    // ajout de l'element sur la page
    b.append(element);
    return element;
}

// Fonction qui permet de recuperer les elements de blog
const renderPosts = async () => {
    // lien qui permet de recuperer les fichiers json
    const url = 'http://localhost:3000/posts?_sort=date&_order=desc';

    const res = await fetch(url);
    const posts = await res.json();
    // sauvegarde des donnees dans le localeStorage
    localStorage.setItem('div', JSON.stringify(posts))


    // let template = '';
    posts.forEach((post) => {
        // Creation des div
        // -----div container
        const div_content = create('div', blog, 'div_content');
        // -----div container titre, text ...
        // -----div content titre
        const h2 = create('h2', div_content, 'titre', post.title);
        // -----div content likes
        const p1 = create('p', div_content, 'like', `${post.likes} Likes`);
         // -----div content text article
        const p2 = create('p', div_content, 'text', post.Body.slice(0, 75));
        // _____Styliser le paragraphe_____
        p2.style.display = 'flex';
        p2.style.flexDirection = 'column';
        // ------div content affichage complete text
        const a = create('a', div_content, 'link', 'Voir plus....');
        a.href = `../detail.html?id=${post.id}`;
         // -----div content date article
        const p3 = create('p', div_content, 'date', post.date);
    });
}

window.addEventListener('DOMContentLoaded', () => renderPosts());