async function displayUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users data');
        }

        const usersData = await response.json();
        const tableBody = document.querySelector('.table tbody');
        tableBody.innerHTML = '';

        usersData.forEach(user => {
            const row = document.createElement('tr');

            // Auto-generate date based on when the user's info appeared
            const currentDate = new Date().toLocaleDateString();

            // Populate table row with user data
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${currentDate}</td>
                <td> 
                    <input type="submit" class="update-btn" 
                        value="Update" onclick="redirectToUpdatePage('${user._id}')">
                </td>
                <td> 
                    <input type="submit" class="delete-btn" 
                        value="DELETE" onclick="deleteUser('${user._id}')">
                </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error during fetching users:', error);
    }
}













/*document.addEventListener('DOMContentLoaded', function () {
    displayUsers();
});

async function displayUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users/signup', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users data');
        }

        const usersData = await response.json();
        const tableBody = document.querySelector('.table tbody');
        tableBody.innerHTML = '';

        usersData.forEach(user => {
            const row = document.createElement('tr');

            // Populate table row with user data
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td> 
                    <input type="submit" class="update-btn" 
                        value="Update" onclick="redirectToUpdatePage(${user._id})">
                </td>
                <td> 
                    <input type="submit" class="delete-btn" 
                        value="DELETE" onclick="deleteUser(${user._id})">
                </td>
            `;


            //"


            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error during fetching users:', error);
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        const result = await response.json();
        console.log(result);

        // Refresh the displayed users after successful deletion
        displayUsers();
    } catch (error) {
        console.error('Error during deleting user:', error);
    }
}

function redirectToUpdatePage(userId) {
    // Redirect to the update-user.html page with the user ID as a parameter
    window.location.href = `update-user.html?userId=${userId}`;
}

*/











