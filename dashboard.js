document.addEventListener('DOMContentLoaded', function (e) {
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
  