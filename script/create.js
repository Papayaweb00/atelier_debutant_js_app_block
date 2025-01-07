const form = document.getElementById('form');
const dateform = new Date;
const dater = dateform.toLocaleDateString();
// console.log(date);


const createPost = async (e) => {
    e.preventDefault();

    const docs = {
        title: form.title.value,
        Body: form.content.value,
        likes: 0,
        date: dater
    }

    await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(docs),
        headers: { 'Content-Type': 'application/json' }
    });

    window.location.replace('/index.html');
}

form.addEventListener('submit', createPost);