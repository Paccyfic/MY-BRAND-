document.addEventListener('DOMContentLoaded', async function (e) {
  e.preventDefault();

  const selectedBlogIndex = localStorage.getItem('selectedBlogIndex');

  try {
      if (selectedBlogIndex !== null) {
          // Fetch the selected blog from the server
          const response = await fetch(`https://my-brand-backend-m9p9.onrender.com/blogs/${selectedBlogIndex}`);
          const selectedBlog = await response.json();

          // Update single blog view with selected blog's details
          document.getElementById('single-blog-image').src = selectedBlog.thumbnail;
          document.getElementById('single-blog-heading').textContent = selectedBlog.heading;
          document.getElementById('single-blog-content').innerHTML = selectedBlog.article;

          // Initialize like button functionality (if needed)
          const heartIcon = document.querySelector(".like-button .heart-icon");
          const likesAmountLabel = document.querySelector(".like-button .likes-amount");

          let likesAmount = 7; // Replace with the actual likes count from the server

          heartIcon.addEventListener("click", async () => {
              heartIcon.classList.toggle("liked");

              // Update likes on the server
              const likeResponse = await fetch(`https://my-brand-backend-m9p9.onrender.com/blogs/${selectedBlog._id}/like`, {
                  method: 'POST',
              });

              if (likeResponse.ok) {
                  likesAmount = await likeResponse.json();
              }

              likesAmountLabel.innerHTML = likesAmount;
          });
      } else {
          // Handle invalid or missing selectedBlogIndex
          // Redirect to blogs.html or display an error message
      }
  } catch (error) {
      console.error('Error fetching selected blog:', error);
  }
});

function goBackToBlogs() {
  // Redirect to the blogs page
  window.location.href = 'blogs.html';
}












/*document.addEventListener('DOMContentLoaded', function (e) {
  e.preventDefault();

  const selectedBlogIndex = localStorage.getItem('selectedBlogIndex');
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  if (selectedBlogIndex !== null && selectedBlogIndex < blogs.length) {
      const selectedBlog = blogs[selectedBlogIndex];

      // Update single blog view with selected blog's details
      document.getElementById('single-blog-image').src = selectedBlog.thumbnail;
      document.getElementById('single-blog-heading').textContent = selectedBlog.heading;
      document.getElementById('single-blog-content').innerHTML = selectedBlog.article;

      // Initialize like button functionality (if needed)
      const heartIcon = document.querySelector(".like-button .heart-icon");
      const likesAmountLabel = document.querySelector(".like-button .likes-amount");
     
      let likesAmount = 7;

      heartIcon.addEventListener("click", () => {
      heartIcon.classList.toggle("liked");
     if (heartIcon.classList.contains("liked")) {
       likesAmount++;
       } else {
       likesAmount--;
      }
     likesAmountLabel.innerHTML = likesAmount;
});

  } else {
      // Handle invalid or missing selectedBlogIndex
      // Redirect to blogs.html or display an error message
  }
});

function goBackToBlogs() {
  // Redirect to the blogs page
  window.location.href = 'blogs.html';
}
*/





