document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();

    // LOAD BLOGS FROM LOCAL STORAGE
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    // RENDER BLOGS
    const blogContainer = document.getElementById('blogs-container');

    // ADD PAGE WHEN THERE ARE NO BLOGS
    if (blogs.length === 0) {
        blogContainer.innerHTML = `
            <div class="no-blogs">
                <p>No blogs available</p>
            </div>
        `;
    }

    blogs.forEach((blog, index) => {
        const div = document.createElement('div');
        div.className = `project-card`;
        div.innerHTML = `
            <div class="image"><img src="${blog.thumbnail}" alt="blog-image"></div>
            <div class="texts-box">
                <p class="heading-texts">${blog.heading}</p>
                <p class="texts">${truncateText(blog.article, 5)}</p>
                <a href="#" onclick="viewSingleBlog(${index})" class="read-more-button">Read More</a>
            </div>
        `;
        blogContainer.appendChild(div);
    });
});

function truncateText(text, lines) {
    // Truncate the text to a certain number of lines
    const truncated = text.split('\n').slice(0, lines).join('\n');
    return truncated;
}

function viewSingleBlog(index) {
    // Redirect to the single blog view page with the selected blog index
    localStorage.setItem('selectedBlogIndex', index);
    window.location.href = 'blog-single-view.html';
}
