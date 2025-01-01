localStorage.setItem('blogContent', JSON.stringify(blogContent));
// Selection div #blog
const blog = document.querySelector("#blog");

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

// boucle pour afficher les elements
for (let i = 0; i < blogContent.length; i++) {
    // Creation des div
    // -----div container
    const div = create('div', blog, `div_content`);

    // -----div remplace image
    const div2 = create('div', div, `form_img`);

    // -----div content text
    const div3 = create('div', div, `div_content_v`);

    // ____titre article
    const h2 = create('h2', div3, `titre`, blogContent[i].name);
    // ____paragraphe article
    const p = create('p', div3, 'text', blogContent[i].body);
    // ____date article
    const date = create('h3', div3, 'date', blogContent[i].date);
    // ____div content btn
    const contentbtn = create('div', div3, 'content_btn');
    // _______btn modifier article_______
    const btn = create('button', contentbtn, 'modif', 'Modifier');
    // _______btn suppr article
    const btn2 = create('button', contentbtn, 'suppr', 'Supprimer');

    // ecouteur d'evenement pour supprimer
    btn2.addEventListener('click', (e) => {
        // accés à l'élément DOM 
        // qui a déclenché un événement
        const clickedButton = e.target;
        //acces a l'ancêtre le plus proche de l'élément
        const clickedDivContent = clickedButton.closest('.div_content');
        // Ajout class
        clickedDivContent.classList.add('supprimer');
        // sauvegarde avec localStorage()
        localStorage.setItem(`btn2-${i}`, 'supprimer');
    })

    // fonction pour regler sauvegarde de suppression
    function supprdiv_content(a, b, index) {
        //recuperation de la valeur stocke
        const savebtn = localStorage.getItem(`btn2-${index}`);

        // condition sauvegarde
        if (savebtn === 'supprimer') {
            // ajout class
            a.classList.add(b);
        } else {
            // supprime class
            a.classList.remove(b);
        }
        return a;
    }
    // Appel fonction
    supprdiv_content(div, 'supprimer', i);

    // ecouteur d'evenement pour modifier le text
    btn.addEventListener('click', (e) => {
        // accés à l'élément DOM 
        // qui a déclenché un événement
        const click = e.target;
        //acces a l'ancêtre le plus proche de l'élément
        const clickdiv = click.closest('.div_content');
        // modification text
        let modiftext = prompt('Mettez vos modifications.\nNB: Si vous ecrivez un mot cela va remplacer le texte deja ecrit.');
        // Ajout text et class
        if (modiftext) {
            // Ajout text
            p.innerText = modiftext;
            // Ajout class
            p.classList.add('modifier');
            // Sauvegarde
            localStorage.setItem(`modiftext${i}`, modiftext)
            localStorage.setItem(`btn-${i}`, 'modifier');
        }
    })

    // fonction pour regler sauvegarde de modification
    function modif_divContent(r, t, index2) {
        //recuperation de la valeur stocke
        const modif = localStorage.getItem(`btn-${index2}`);

        // condition sauvegarde
        if (modif === 'modifier') {
            // Ajout class
            r.classList.add(t);
            //recuperation de la deuxieme valeur stocke
            const savedtext = localStorage.getItem(`modiftext${index2}`);
            // Ajout text
            if (savedtext) {
                r.innerText = savedtext;
            }
        } else {
            // supprime class
            r.classList.remove(t);
        }
        return r;
    }

    // Appel function de sauvgarde modif
    modif_divContent(p, 'modifier', i);
}