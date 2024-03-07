document.addEventListener('DOMContentLoaded', async function (e) {
    e.preventDefault();

    const blogTableBody = document.getElementById('blogTableBody');

    try {
        // Fetch blogs from the server
        const response = await fetch('http://localhost:3000/blogs');
        const blogs = await response.json();

        // RENDER BLOGS
        if (blogs.length === 0) {
            blogTableBody.innerHTML = `
                <tr>
                    <td colspan="4">No blogs available</td>
                </tr>
            `;
        }

        blogs.forEach((blog, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${blog.heading}</td>
                <td>${blog.createdAt}</td>
                <td><button class="edit-btn" onclick="editBlog(${index})">EDIT</button></td>
                <td><button class="delete-btn" onclick="deleteBlog(${blog._id})">DELETE</button></td>
            `;
            blogTableBody.appendChild(row);
        });

        // DELETE BLOG FUNCTION
        window.deleteBlog = async function (blogId) {
            const deleteResponse = await fetch(`http://localhost:3000/blogs/${blogId}`, {
                method: 'DELETE',
            });

            if (deleteResponse.ok) {
                // Update the blogs array by filtering out the deleted blog
                blogs = blogs.filter(blog => blog._id !== blogId);
                renderBlogs();
            }
        };

        // EDIT BLOG FUNCTION
        window.editBlog = function (index) {
            // Store the selected blog index in local storage
            localStorage.setItem('selectedBlogIndex', index);
            // Redirect to the editing-blogs.html page
            window.location.href = 'editing-blogs.html';
        };

        // FUNCTION TO RE-RENDER BLOGS AFTER DELETION OR EDIT
        function renderBlogs() {
            blogTableBody.innerHTML = '';

            if (blogs.length === 0) {
                blogTableBody.innerHTML = `
                    <tr>
                        <td colspan="4">No blogs available</td>
                    </tr>
                `;
            } else {
                blogs.forEach((blog, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${blog.heading}</td>
                        <td>${blog.createdAt}</td>
                        <td><button class="edit-btn" onclick="editBlog(${index})">EDIT</button></td>
                        <td><button class="delete-btn" onclick="deleteBlog(${blog._id})">DELETE</button></td>
                    `;
                    blogTableBody.appendChild(row);
                });
            }
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
});














/*document.addEventListener('DOMContentLoaded', function (e) {
  e.preventDefault();

  // LOAD BLOGS FROM LOCAL STORAGE
  let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  // RENDER BLOGS
  const blogTableBody = document.getElementById('blogTableBody');

  // ADD PAGE WHEN THERE ARE NO BLOGS
  if (blogs.length === 0) {
      blogTableBody.innerHTML = `
          <tr>
              <td colspan="4">No blogs available</td>
          </tr>
      `;
  }

  blogs.forEach((blog, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${blog.heading}</td>
          <td>${blog.createdAt}</td>
          <td><button class="edit-btn" onclick="editBlog(${index})">EDIT</button></td>
          <td><button class="delete-btn" onclick="deleteBlog(${index})">DELETE</button></td>
      `;
      blogTableBody.appendChild(row);
  });

  // DELETE BLOG FUNCTION
  window.deleteBlog = function (index) {
      blogs.splice(index, 1);
      localStorage.setItem('blogs', JSON.stringify(blogs));
      renderBlogs();
  };

  // EDIT BLOG FUNCTION
  window.editBlog = function (index) {
      // Store the selected blog index in local storage
      localStorage.setItem('selectedBlogIndex', index);
      // Redirect to the editing-blogs.html page
      window.location.href = 'editing-blogs.html';
  };

  // FUNCTION TO RE-RENDER BLOGS AFTER DELETION OR EDIT
  function renderBlogs() {
      blogTableBody.innerHTML = '';
      blogs.forEach((blog, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${blog.heading}</td>
              <td>${blog.date}</td>
              <td><button class="edit-btn" onclick="editBlog(${index})">EDIT</button></td>
              <td><button class="delete-btn" onclick="deleteBlog(${index})">DELETE</button></td>
          `;
          blogTableBody.appendChild(row);
      });

      if (blogs.length === 0) {
          blogTableBody.innerHTML = `
              <tr>
                  <td colspan="4">No blogs available</td>
              </tr>
          `;
      }
  }
});*/










/* document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
  
    // LOAD BLOGS FROM LOCAL STORAGE
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  
    // RENDER BLOGS
    const blogTableBody = document.getElementById('blogTableBody');
  
    // ADD PAGE WHEN THERE ARE NO BLOGS
    if (blogs.length === 0) {
      blogTableBody.innerHTML = `
          <tr>
              <td colspan="4">No blogs available</td>
          </tr>
      `;
    }
  
    blogs.forEach((blog, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${blog.heading}</td>
          <td>${blog.date}</td>
          <td><button class="edit-btn">EDIT</button></td>
          <td><button class="delete-btn" onclick="deleteBlog(${index})">DELETE</button></td>
      `;
      blogTableBody.appendChild(row);
    });
  
    // DELETE BLOG FUNCTION
    window.deleteBlog = function (index) {
      blogs.splice(index, 1);
      localStorage.setItem('blogs', JSON.stringify(blogs));
      renderBlogs();
    };
  
    // FUNCTION TO RE-RENDER BLOGS AFTER DELETION
    function renderBlogs() {
      blogTableBody.innerHTML = '';
      blogs.forEach((blog, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${blog.heading}</td>
            <td>${blog.date}</td>
            <td><button class="edit-btn">EDIT</button></td>
            <td><button class="delete-btn" onclick="deleteBlog(${index})">DELETE</button></td>
        `;
        blogTableBody.appendChild(row);
      });
  
      if (blogs.length === 0) {
        blogTableBody.innerHTML = `
            <tr>
                <td colspan="4">No blogs available</td>
            </tr>
        `;
      }
    }
  });
   */