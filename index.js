// Function to load posts on the home page
function loadPosts() {
    const postsList = document.getElementById('posts-list');
    const postsSidebar = document.getElementById('posts-sidebar');
    if (postsList) {
        postsList.innerHTML = ''; // Clear existing posts
        postsSidebar.innerHTML = ''; // Clear sidebar

        let posts = JSON.parse(localStorage.getItem('posts')) || [];

        posts.forEach((post, index) => {
            // Create post tile (home page post display)
            const postDiv = document.createElement('div');
            postDiv.classList.add('post-tile');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>Published on: <time datetime="${post.date}">${post.date}</time></p>
                <img src="${post.image}" alt="Post Image">
                <p><button onclick="openPost(${index})">Read More</button></p>
            `;
            postsList.appendChild(postDiv);

            // Create list item for sidebar navigation
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="post.html" onclick="openPost(${index})">${post.title}</a>`;
            postsSidebar.appendChild(listItem);
        });
    }
}

// Function to store selected post index in localStorage
function openPost(postIndex) {
    localStorage.setItem('selectedPostIndex', postIndex);
    window.location.href = 'post.html';  // Redirect to the detailed post page
}

// Search functionality to filter posts based on title
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


// Load posts on page load
window.onload = loadPosts;

