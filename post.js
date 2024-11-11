// Function to load the selected post from localStorage and display it
function loadPost() {
    const postIndex = localStorage.getItem('selectedPostIndex');
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (postIndex !== null && posts[postIndex]) {
        const post = posts[postIndex];

        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-date').textContent = `Published on: ${post.date}`;
        document.getElementById('post-image').src = post.image;
        document.getElementById('post-body').innerHTML = post.content;
    }
}

// Function to load and display the list of posts
function loadPostList() {
    const postsList = document.getElementById('posts-list');
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="post.html" onclick="setSelectedPostIndex(${index})">${post.title}</a>`;
        postsList.appendChild(listItem);
    });
}

// Set the selected post index in localStorage
function setSelectedPostIndex(index) {
    localStorage.setItem('selectedPostIndex', index);
}

// Function to load and display comments from localStorage
function loadComments() {
    const commentsList = document.getElementById('comments-list');
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.forEach((comment) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <p class="comment-name">${comment.name}</p>
            <p class="comment-text">${comment.text}</p>
        `;
        commentsList.appendChild(commentDiv);
    });
}

// Function to handle comment submission
document.getElementById('comment-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('comment-name').value;
    const text = document.getElementById('comment-text').value;

    if (name && text) {
        const newComment = { name, text };
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));

        document.getElementById('comment-name').value = '';
        document.getElementById('comment-text').value = '';

        loadComments();
    }
});

// Load the post and comments when the page loads
window.onload = function() {
    loadPost();
    loadPostList();
    loadComments();
};
