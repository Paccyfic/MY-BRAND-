document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();

    const thumbnail = document.querySelector('#thumbnail');
    const currentThumbnail = document.querySelector('#currentThumbnail');
    const heading = document.querySelector('#heading');
    const article = document.querySelector('#article');

    const form = document.querySelector('#form');

    // Fetch the selected blog from local storage
    const selectedBlogIndex = localStorage.getItem('selectedBlogIndex');
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const selectedBlog = blogs[selectedBlogIndex];

    // Populate form fields with the selected blog data
    currentThumbnail.src = selectedBlog.thumbnail;
    heading.value = selectedBlog.heading;
    article.value = selectedBlog.article;

    thumbnail.addEventListener('change', function (e) {
        // Update the displayed thumbnail when a new image is selected
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            currentThumbnail.src = reader.result;
        };
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Update the selected blog data with the new values
        selectedBlog.thumbnail = currentThumbnail.src;
        selectedBlog.heading = heading.value;
        selectedBlog.article = article.value;

        // Update the blogs array in local storage
        blogs[selectedBlogIndex] = selectedBlog;
        localStorage.setItem('blogs', JSON.stringify(blogs));

        // Redirect back to the dashboard
        window.location.href = 'dashboard.html';
    });
});

function discardChanges() {
    // Redirect back to the dashboard without saving changes
    window.location.href = 'dashboard.html';
}
 




