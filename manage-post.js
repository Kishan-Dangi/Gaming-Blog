// // Function to format text in the contenteditable div
// function formatText(command) {
//     document.execCommand(command, false, null);
// }

// // Function to handle form submission on the manage-posts.html page
// document.getElementById('post-form')?.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const title = document.getElementById('title').value;
//     const content = document.getElementById('content').innerHTML;
//     const date = new Date().toLocaleDateString();

//     // Get the uploaded image and convert it to base64
//     const imageFile = document.getElementById('image-upload').files[0];
//     const reader = new FileReader();

//     reader.onloadend = function () {
//         const post = {
//             title: title,
//             image: reader.result, // Base64 string of the image
//             content: content,
//             date: date,
//         };

//         // Load existing posts from local storage
//         let posts = JSON.parse(localStorage.getItem('posts')) || [];
//         posts.push(post); // Add new post to the array
//         localStorage.setItem('posts', JSON.stringify(posts)); // Store updated posts back to local storage

//         // Reset the form
//         document.getElementById('post-form').reset();
//         document.getElementById('content').innerHTML = '';
//         document.getElementById('image-preview').innerHTML = '';

//         loadPosts(); // Reload posts to display the new one
//     };

//     if (imageFile) {
//         reader.readAsDataURL(imageFile); // Convert image to base64
//     }
// });

// // Function to load posts from local storage
// function loadPosts() {
//     const postsList = document.getElementById('posts-list');
//     if (postsList) {
//         postsList.innerHTML = ''; // Clear existing posts
//         let posts = JSON.parse(localStorage.getItem('posts')) || []; // Retrieve posts

//         posts.forEach((post, index) => {
//             const postDiv = document.createElement('div');
//             postDiv.style.display = 'flex'; // Use flexbox for alignment
//             postDiv.style.alignItems = 'center'; // Center align items
//             postDiv.style.marginBottom = '15px'; // Space between posts
//             postDiv.style.borderBottom = '1px solid #ddd'; // Optional: add border for separation
//             postDiv.style.paddingBottom = '10px'; // Optional: add padding

//             // Create a list item for each post
//             postDiv.innerHTML = `
//                 <img src="${post.image}" alt="Post Image" style="width: 100px; height: auto; margin-right: 15px; object-fit: cover;">
//                 <div style="flex-grow: 1;"> <!-- Allow text to grow -->
//                     <h3>${post.title}</h3>
//                     <p>Published on: <time datetime="${post.date}">${post.date}</time></p>
//                     <div>${post.content}</div>
//                 </div>
//                 <button onclick="deletePost(${index})" style="margin-left: 10px;">Delete</button>
//             `;
//             postsList.appendChild(postDiv);
//         });
//     }
// }

// // Function to delete a post
// function deletePost(index) {
//     let posts = JSON.parse(localStorage.getItem('posts')) || []; // Retrieve posts
//     posts.splice(index, 1); // Remove the post
//     localStorage.setItem('posts', JSON.stringify(posts)); // Update local storage
//     loadPosts(); // Reload posts
// }

// // Handle image preview before submission
// document.getElementById('image-upload')?.addEventListener('change', function (e) {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = function (event) {
//         const imagePreview = document.getElementById('image-preview');
//         imagePreview.innerHTML = `<img src="${event.target.result}" alt="Image Preview" style="max-width: 100%; height: auto; border-radius: 5px;">`;
//     };

//     if (file) {
//         reader.readAsDataURL(file); // Read the uploaded file
//     }
// });

// // Load posts on page load for both manage-posts.html and index.html
// window.onload = function () {
//     loadPosts(); // This will load posts for both pages
// };

// Function to convert image to base64 and resize it
// Function to convert image to base64 and resize it
function convertImageToBase64(file, maxWidth, maxHeight, callback) {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (event) {
        img.src = event.target.result;
    };

    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate the scaling ratio
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to Base64 string
        callback(canvas.toDataURL('image/jpeg', 0.8)); // JPEG format with 70% quality
    };

    reader.readAsDataURL(file); // Read the uploaded file
}

// Function to format text in the contenteditable div
function formatText(command) {
    document.execCommand(command, false, null);
}

// Function to handle form submission on the manage-posts.html page
document.getElementById('post-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').innerHTML;
    const date = new Date().toLocaleDateString();
    const imageFile = document.getElementById('image-upload').files[0];

    if (imageFile) {
        // Call the function to convert and resize the image
        convertImageToBase64(imageFile, 300, 300, function (base64Image) {
            const post = {
                title: title,
                image: base64Image,
                content: content,
                date: date,
            };

            // Load existing posts from local storage
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push(post); // Add the new post
            localStorage.setItem('posts', JSON.stringify(posts)); // Store updated posts

            // Reset the form
            document.getElementById('post-form').reset();
            document.getElementById('content').innerHTML = '';
            document.getElementById('image-preview').innerHTML = '';

            loadPosts(); // Reload posts to display the new one
        });
    } else {
        // Handle case where no image is uploaded
        const post = {
            title: title,
            image: '',
            content: content,
            date: date,
        };

        // Load existing posts from local storage
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post); // Add the new post
        localStorage.setItem('posts', JSON.stringify(posts)); // Store updated posts

        // Reset the form
        document.getElementById('post-form').reset();
        document.getElementById('content').innerHTML = '';
        document.getElementById('image-preview').innerHTML = '';

        loadPosts(); // Reload posts to display the new one
    }
});

// Function to load posts from local storage
function loadPosts() {
    const postsList = document.getElementById('posts-list');
    if (postsList) {
        postsList.innerHTML = ''; // Clear existing posts
        let posts = JSON.parse(localStorage.getItem('posts')) || []; // Retrieve posts

        // Create a list view for the current posts
        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post-item'; // Optional class for styling
            postDiv.innerHTML = `
                <div class="post-image" style="flex: 0 0 100px; margin-right: 10px;">
                    ${post.image ? `<img src="${post.image}" alt="Post Image" style="max-width:100%; height:auto; max-height:80px; object-fit:cover;">` : ''}
                </div>
                <div class="post-details" style="flex: 1;">
                    <h4>${post.title}</h4>
                    <p>Published on: <time datetime="${post.date}">${post.date}</time></p>
                </div>
                <button onclick="deletePost(${index})">Delete</button>
                <hr>
            `;
            postsList.appendChild(postDiv);
        });
    }
}

// Function to delete a post
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem('posts')) || []; // Retrieve posts
    posts.splice(index, 1); // Remove the post
    localStorage.setItem('posts', JSON.stringify(posts)); // Update local storage
    loadPosts(); // Reload posts
}

// Handle image preview before submission
document.getElementById('image-upload')?.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const imagePreview = document.getElementById('image-preview');
        imagePreview.innerHTML = `<img src="${event.target.result}" alt="Image Preview" style="max-width: 100%; height: auto; border-radius: 5px;">`;
    };

    if (file) {
        reader.readAsDataURL(file); // Read the uploaded file
    }
});

// Load posts on page load for both manage-posts.html and index.html
window.onload = function () {
    loadPosts(); // This will load posts for both pages
};
