// Function to format and load posts
function loadPosts() {
    const postsList = document.getElementById('posts-list');
    if (postsList) {
        postsList.innerHTML = ''; // Clear existing posts
        let posts = JSON.parse(localStorage.getItem('posts')) || [];

        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post-tile');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>Published on: <time datetime="${post.date}">${post.date}</time></p>
                <img src="${post.image}" alt="Post Image">
                <p><a href="post.html" onclick="openPost(${index})">Read More</a></p>
            `;
            postsList.appendChild(postDiv);
        });
    }
}

// Function to store selected post index in localStorage
function openPost(postIndex) {
    localStorage.setItem('selectedPostIndex', postIndex);
}

// Function to load the post details page
function loadPostDetails() {
    const selectedPostIndex = localStorage.getItem('selectedPostIndex');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[selectedPostIndex];

    const postContent = document.getElementById('post-content');
    if (postContent) {
        postContent.innerHTML = `
            <h2>${post.title}</h2>
            <p>Published on: <time datetime="${post.date}">${post.date}</time></p>
            <img src="${post.image}" alt="Post Image" style="max-width:100%; height:auto; object-fit:cover;">
            <div>${post.content}</div>
        `;
    }
    loadComments();
}

// Function to load and display comments for a specific post
function loadComments() {
    const selectedPostIndex = localStorage.getItem('selectedPostIndex');
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = ''; // Clear existing comments
    const comments = JSON.parse(localStorage.getItem(`comments_${selectedPostIndex}`)) || [];

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <p><strong>${comment.name}</strong></p>
            <p>${comment.text}</p>
            <hr>
        `;
        commentsList.appendChild(commentDiv);
    });
}

// Function to handle comment form submission
document.getElementById('comment-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('comment-name').value;
    const text = document.getElementById('comment-text').value;

    const selectedPostIndex = localStorage.getItem('selectedPostIndex');
    const newComment = { name: name, text: text };
    let comments = JSON.parse(localStorage.getItem(`comments_${selectedPostIndex}`)) || [];
    comments.push(newComment);
    localStorage.setItem(`comments_${selectedPostIndex}`, JSON.stringify(comments));

    document.getElementById('comment-form').reset();
    loadComments();
});

// Search functionality
document.getElementById('search-bar')?.addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const postTitles = document.querySelectorAll('.post-tile h3');
    
    postTitles.forEach(post => {
        const postTitle = post.textContent.toLowerCase();
        if (postTitle.includes(query)) {
            post.closest('.post-tile').style.display = 'block';
        } else {
            post.closest('.post-tile').style.display = 'none';
        }
    });
});

window.onload = loadPosts;
