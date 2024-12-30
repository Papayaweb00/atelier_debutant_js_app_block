
let titreArticle = document.querySelector('#titre');
let contenteArticle = document.querySelector('#content');
let formulaire = document.querySelector('#form');
let btnsubmit = document.querySelector('#submit');

function showerror(input, message) {
    const errorSpan = document.createElement('span');
    errorSpan.className = 'error';
    errorSpan.innerText = message;
    input.parentElement.appendChild(errorSpan);
}

function clearerror() {
    const errorSpans = document.querySelectorAll('.error');
    errorSpans.forEach(span => span.remove());
}

formulaire.addEventListener('submit', (e) => {
    localStorage('divform', '')

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

    if (!isvalid) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        const divform = create('div', blog, `div_content`);
        divform.classList.add('bloc');
        localStorage.setItem('divform', 'bloc');

        const imgform = create('div', divform, `form_img`);
        const titreform = create('h2', divform, 'titre', titreArticle.value);
        const contentform = create('p', divform, 'text', contenteArticle.value);
        // ____div content btn
        const contentbtnform = create('div', divform, 'content_btn');
        // _______btn modifier article_______
        const btnform = create('button', contentbtnform, 'modif', 'Modifier');
        // _______btn suppr article
        const btnform2 = create('button', contentbtnform, 'suppr', 'Supprimer');
        formulaire.reset();
        // ecouteur d'evenement pour supprimer
        btnform2.addEventListener('click', (e) => {
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
                const savedtextform = localStorage.getItem(`modiftext${index2}`);
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

        let i = 0;
        modif_divContent2(contentform, 'modifier');

        contenteArticle.style.border = 'none';
        contenteArticle.style.boxShadow = "none";
        titreArticle.style.border = 'none';
        titreArticle.style.boxShadow = "none";

        // divform.classList.add('form');
    }

    // localStorage.setItem('formulaire', 'ajouter');
    function formlocal() {
        const locform = localStorage.getItem('divform');
        // const locform2 = localStorage.getItem('bloc');
        // const savedClass = localStorage.getItem('divformClass');

        if (locform) {
            divform.classList.add('locform2');
        }
    }

    formlocal();
})




