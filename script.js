let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
let currentEditId = null;

function renderPosts() {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content.substring(0, 100)}... <a href="#" data-id="${post.id}" class="read-more">Read More</a></p>
        <p>By ${post.author} on ${post.date}</p>
        <button data-id="${post.id}" class="edit-btn">Edit</button>
        <button data-id="${post.id}" class="delete-btn">Delete</button>
        `;
        container.appendChild(postDiv);
    });
}

function savePosts() {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

document.getElementById('new-post-btn').addEventListener('click', () => {
    document.getElementById('post-form').style.display = 'block';
    document.getElementById('form-title').textContent = 'New Post';
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-author').value = '';
    currentEditId = null;
})

//cancel_form
document.getElementById('cancel-post').addEventListener('click', () => {
    document.getElementById('post-form').style.display = 'none';
});

//save a post
document.getElementById('save-post').addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title').value = '';
    const content = document.getElementById('post-content').value = '';
    const author = document.getElementById('post-author').value = '';

    if (!title || !content || !author) {
        alert('Please fill all fields.');
        return;
    }

    const date = new Date().toLocaleDateString();
    //editing existing blog_posts
    if (currentEditId) {
        const post = posts.find(p => p.id === currentEditId);
        post.title = title;
        post.content = content;
        post.author = author;
        post.date = date;
    } else {
        //create new blog_post
        const id = Date.now();
        posts.push({ id, title, content, author, date });
    }
    savePosts();
    renderPosts();
    document.getElementById('post-form').style.display = 'none';
});

//edit-delete-all-blog_posts
document.getElementById('posts-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('read-more')) {
        const id = parseInt(e.target.dataset.id);
        const post = posts.find(p => p.id === id);
        document.getElementById('single-title').textContent = post.title;
        document.getElementById('single-content').textContent = post.content;
        document.getElementById('single-author').textContent = `By ${post.author}`;
        document.getElementById('single-date').textContent = `On ${post.date}`;
        document.getElementById('post-list').style.display = 'none';
        document.getElementById('single-post').style.display = 'block';
    } else if (e.classList.contains('edit-btn')) {
        const id = parseInt(e.target.dataset.id);
        const post = posts.find(p => p.id === id);
        document.getElementById('post-form').style.display = 'block';
        document.getElementById('form-title').textContent = 'Edit Post';
        document.getElementById('post-title').value = post.title;
        document.getElementById('post-content').value = post.content;
        document.getElementById('post-author').value = post.author;
        currentEditId = id;
    } else if (e.target.classList.contains('delete-btn')) {
        const id = parseInt(e.target.dataset.id);
        posts = posts.filter(p => p.id === id);
        savePosts();
        renderPosts();
    }
});

//go-back

document.getElementById('back-to-list').addEventListener('click', () => {
    document.getElementById('single-post').style.display = 'none';
    document.getElementById('post-list').style.display = 'block';
});

renderPosts();