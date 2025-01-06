
// Appel des elements avec le DOM
let titreArticle = document.querySelector('#titre');

let contenteArticle = document.querySelector('#content');

let formulaire = document.querySelector('#form');
let btnsubmit = document.querySelector('#submit');

// Ajout des messages d'erreurs
function showerror(input, message) {
    const errorSpan = document.createElement('span');
    errorSpan.className = 'error';
    errorSpan.innerText = message;
    input.parentElement.appendChild(errorSpan);
}

// Suppression des messages d'erreurs
function clearerror() {
    const errorSpans = document.querySelectorAll('.error');
    errorSpans.forEach(span => span.remove());
}

// div qui regle le contenue du blog
function blogcreate(titre, content) {
    const divform = create('div', blog, `div_content`);
    // console.log(divform);
    localStorage.setItem('form', JSON.stringify(divform));
    const imgform = create('div', divform, `form_img`);
    const titreform = create('h2', divform, 'titre', titre);
    const contentform = create('p', divform, 'text', content);
    // date
    const datecre = new Date();
    const dateform = datecre.toLocaleDateString();
    // enregitre
    const date = create('h3', divform, 'date', dateform);

    // ____div content btn
    const contentbtnform = create('div', divform, 'content_btn');
    // _______btn modifier article_______
    const btnform = create('button', contentbtnform, 'modif', 'Modifier');
    // _______btn suppr article
    const btnform2 = create('button', contentbtnform, 'suppr', 'Supprimer');
    // ecouteur d'evenement pour supprimer
    btnform2.addEventListener('click', (e) => {
        localStorage.removeItem('form');
        localStorage.removeItem('titre');
        localStorage.removeItem('content');
        // accés à l'élément DOM 
        // qui a déclenché un événement
        const clickedButton = e.target;
        //acces a l'ancêtre le plus proche de l'élément
        const clickedDivContent = clickedButton.closest('.div_content');
        // Ajout class
        clickedDivContent.classList.add('supprimer');
        // sauvegarde avec localStorage()
        localStorage.setItem(`btnform2`, 'supprimer');
    })


    // fonction pour regler sauvegarde de suppression
    function supprdiv_content2(a, b, index) {
        //recuperation de la valeur stocke
        const savebtnform = localStorage.getItem(`btnform2-${index}`);
        // condition sauvegarde
        if (savebtnform === 'supprimer') {
            // ajout class
            a.classList.add(b);
        } else {
            // supprime class
            a.classList.remove(b);
        }
        return a;
    }

    supprdiv_content2(divform, 'supprimer');

    btnform.addEventListener('click', (e) => {
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
            contentform.innerText = modiftext;
            // Ajout class
            contentform.classList.add('modifier');
            // Sauvegarde
            localStorage.setItem(`modiftext`, modiftext)
            localStorage.setItem(`btnform`, 'modifier');
        }
    })

    function modif_divContent2(r, t, index2) {
        //recuperation de la valeur stocke
        const modiform = localStorage.getItem(`btnform-${index2}`);
        // condition sauvegarde
        if (modiform === 'modifier') {
            // Ajout class
            r.classList.add(t);
            //recuperation de la deuxieme valeur stocke
            const savedtextform = localStorage.getItem(`modiftext`);
            // Ajout text
            if (savedtextform) {
                r.innerText = savedtextform;
            }
        } else {
            // supprime class
            r.classList.remove(t);
        }
        return r;
    }

    modif_divContent2(contentform, 'modifier');
}

formulaire.addEventListener('submit', (e) => {
    clearerror();

    let isvalid = true;

    if (titreArticle.value.trim() === '') {
        isvalid = false;
        showerror(titreArticle, 'Champ obligatoire');
        titreArticle.style.border = '1px solid red';
        titreArticle.style.boxShadow = "3px 3px 9px red";
    } else {
        titreArticle.style.border = '1px solid green';
        titreArticle.style.boxShadow = "3px 3px 9px green";
        console.log(titreArticle.value);
    }

    if (contenteArticle.value.trim() === '') {
        isvalid = false;
        showerror(contenteArticle, 'Champ obligatoire');
        contenteArticle.style.border = '1px solid red';
        contenteArticle.style.boxShadow = "3px 3px 9px red";
    } else {
        contenteArticle.style.border = '1px solid green';
        contenteArticle.style.boxShadow = "3px 3px 9px green";
        console.log(contenteArticle.value);
    }
    const titre = titreArticle.value;
    const content = contenteArticle.value;

    if (!isvalid) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        const divform = blogcreate(titreArticle.value, contenteArticle.value);

        console.log(`Titre: ${titre}\nText: ${content}`);
        let i = 0;

        if (isvalid) {
            i++;
            localStorage.setItem('titre', titreArticle.value);
            localStorage.setItem('content', contenteArticle.value);
        }

        contenteArticle.style.border = 'none';
        contenteArticle.style.boxShadow = "none";
        titreArticle.style.border = 'none';
        titreArticle.style.boxShadow = "none";
    }
})

function sauvegarde() {
    const locform = JSON.parse(localStorage.getItem('form'));

    const recup = {
        titrerecup: localStorage.getItem('titre'),
        contentrecup: localStorage.getItem('content'),
    }

    if (locform != null) {
        blogcreate(recup.titrerecup, recup.contentrecup);
    }
}

sauvegarde()


