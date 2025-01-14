// Change color in form
function changeFormColor(pop, color, colorb) {
    pop.style.backgroundColor = color;
    setTimeout(() => {
        pop.style.backgroundColor = colorb;
    }, 1000);
}
// Confirm form
function isFormInvalid() {
    return content.value.trim() === '' || title.value.trim() === '';
};

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

/* fonction qui permet d'appeler 
    les elements dans le localStorage*/
const afficheblogcontent = (con) => {
    let identifiant = con.id;
    const div_content = create('div', blog, 'div_content');
    div_content.id = `user${identifiant}`;
    // Enregitrer la variable dans une variable
    let textType = `${con.body}`;
    // Creation du titre de l'article dans le bloc
    const h2 = create('h2', div_content, 'titre', con.name);
    // Creation du text de l'article dans le bloc
    const p = create('p', div_content, 'text', `${textType.slice(0, 70)}....`);
    // btn affichant tout le text
    const btnplus = create('button', div_content, 'plus', 'Voir plus');
    // Creation du date de creation de l'article dans le bloc
    const h3 = create('h3', div_content, 'date', con.date);
    const contentBtn = create('div', div_content, 'content_btn');
    const btnmodif = create('button', contentBtn, 'modif', 'Modifier');
    // gestion du button de modification
    btnmodif.addEventListener('click', (e) => {
        blog.style.display = 'none';
        form.style.display = 'none';
        // Montre le button clicke
        const click = e.target;

        // Recupere le div clicke
        const clickdiv = click.closest('.div_content');
        const b = click.closest('.div_content p');

        // Recupere le div par son id en remplacant user
        const idSimple = clickdiv.id;
        const id = clickdiv.id.replace('user', '');

        // Champ pour saisir le text a modifier
        // let textChanger = prompt('Mettez vos modifications.\nNB: Si vous ecrivez un mot cela va remplacer le texte deja ecrit.');
        // Condition pour mettre en place les modification
        formmodif.classList.add('active');
        contentmodif.textContent = textType;

        modifForm.addEventListener('click', (e) => {
            if (contentmodif.value.trim() === '') {
                e.preventDefault();
                changeFormColor(formmodif, 'red', 'aqua');
            } else {
                changeFormColor(formmodif, 'green', 'aqua');
                textType.innerText = contentmodif.value;

                // Update the localStorage 
                contentBlog = contentBlog.map(blogCon => blogCon.id == id ? {
                    ...blogCon, body: contentmodif.value
                } : blogCon);
                // Enregistrement des donnees de bloc dans localStorage 
                localStorage.setItem('content', JSON.stringify(contentBlog)) || [];
            }
        })
    });
    // gestion du button de suppression
    const btnsupp = create('button', contentBtn, 'suppr', 'Supprimer');
    btnsupp.addEventListener('click', (e) => {
        // Montre le button clicke
        const click = e.target;
        // selectionne le parent de l'element selectionner
        const clickdiv = click.closest('.div_content');
        // Recupere l'identifiant du parent
        const id_select = clickdiv.id.replace('user', '');

        // Fais la suppression en filtre
        contentBlog = contentBlog.filter(pop => pop.id != id_select);

        localStorage.setItem('content', JSON.stringify(contentBlog));
        // clickdiv.remove();
    });

    btnplus.addEventListener('click', function () {
        // Seletion du texte en le siblant
        let text = this.previousElementSibling;
        // console.log(text);

        // Condition d'affichage
        if (text.classList.toggle('tout')) {
            // changement d'affichage en supprimant slice
            text.textContent = textType;
            // changement text-content
            btnplus.textContent = 'Voir moin';
        } else {
            // changement d'affichage en ajoutant slice
            text.textContent = textType.slice(0, 70) + '....';
            // changement text-content
            btnplus.textContent = 'Voir plus';
        }
    })
}

let contentBlog = JSON.parse(localStorage.getItem('content')) || [];
contentBlog.forEach(blogcon => {
    // Appelle fonction afficheblogcontent() 
    afficheblogcontent(blogcon);
});



