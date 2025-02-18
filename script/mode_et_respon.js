//variable selection class
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const body = document.body;

// function gestionnaire d'evenement
function mode(s, m, b) {
    s.addEventListener('click', () => {
        // Ajout class
        s.classList.add('active');
        // suppression class
        s.classList.remove('no');
        // Ajout class
        m.classList.add('no');
        // suppression class
        m.classList.remove('active');
        b.classList.remove('moon');
        // Sauvegarde du mode
        return localStorage.setItem('mode', 'sun');
    });
    m.addEventListener('click', () => {
         // Ajout class
        m.classList.add('active');
        m.classList.remove('no');
         // Ajout class
        s.classList.add('no');
         // Suppression class
        s.classList.remove('active');
         // Ajout class
        b.classList.add('moon');
        // Sauvegarde du mode
        return localStorage.setItem('mode', 'moon');
    });
};

// Sauvegarde mode clair/sombre avec localStorage()
function initStorage() {
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'moon') {
        mode(sun, moon, body);
        sun.classList.remove('active');
        sun.classList.add('no');
        body.classList.add('moon');
    } else {
        mode(sun, moon, body);
        body.classList.remove('moon');
    }
}

// appel function
initStorage();


// Menu burger
const ul = document.querySelector('#nav_ul');
const toggle = document.querySelector('.toggle');
const cacher = document.querySelector('.cache');
const list = document.querySelectorAll('#nav_ul li');

const menuBurger = (a, b, c, d, e)=>{
    a.addEventListener('click', ()=>{
        b.classList.add(c);
    });
    d.addEventListener('click', ()=>{
        b.classList.remove(c);
    });
    e.forEach(list => {
        list.addEventListener('click', ()=>{
            b.classList.remove('active');
        })
    })
}

menuBurger(toggle, ul, 'active', cacher, list);
