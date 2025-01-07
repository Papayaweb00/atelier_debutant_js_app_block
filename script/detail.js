const id = new URLSearchParams(window.location.search).get('id')
const topcontent = document.getElementById('detail');
const buttonsup = document.querySelector('.suppr');
console.log(buttonsup);

// console.log(topcontent);

// console.log(template);
const renderDetail = async () => {
    const url = 'http://localhost:3000/posts/';
    const res = await fetch(url + id);

    const post = await res.json();
    console.log(post);

    const l = create('h2', topcontent, 'titre', post.title);
    // -----div content text article
    const k = create('p', topcontent, 'text', post.Body);
    // console.log(h2);

    buttonsup.addEventListener('click', async () => {
        const res = await fetch(url + id, {
            method: 'DELETE'
        });
        window.location.replace('/index.html');
    })
}


window.addEventListener('DOMContentLoaded', () => renderDetail());