// Gestion du formulaire
form.addEventListener('submit', (e) => {
    if (isFormInvalid()) {
        e.preventDefault();
        changeFormColor(form, 'red', 'initial');
    } else {
        changeFormColor(form, 'green', 'initial');
        let contentBlogNew = {
            "id": ident,
            "name": title.value,
            "body": content.value,
            "date": dater
        };

        contentBlog.push(contentBlogNew);

        localStorage.setItem('content', JSON.stringify(contentBlog));
    }
})
