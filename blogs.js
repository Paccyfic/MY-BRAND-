document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();

    // LOAD BLOGS FROM LOCAL STORAGE
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    // RENDER BLOGS
    const blog_container = document.querySelector('.projects-box');

    // ADD PAGE WHEN THERE ARE NO BLOGS
    if (blogs.length === 0) {
        blog_container.innerHTML = `
            <div class="no-blogs">
                <p>No blogs available</p>
            </div>
        `;
    }

    blogs.forEach((blog, index) => {
        const div = document.createElement('div');
        div.className = `project-${index + 1}`;
        div.innerHTML = `
            <div class="texts-box">
                <span>
                    <p class="heading-texts">${blog.heading}</p>
                    <p class="texts">${blog.article}</p>
                </span>
            </div>
            <div class="image"><img src="${blog.thumbnail}" alt="pj-1-image"></div>
        `;
        blog_container.appendChild(div);
    });
});