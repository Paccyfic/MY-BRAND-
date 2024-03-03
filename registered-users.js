document.addEventListener('DOMContentLoaded', function () {
    displayUsers();
});

function displayUsers() {
    const usersData = JSON.parse(localStorage.getItem('users')) || [];

    const tableBody = document.querySelector('.table tbody');
    tableBody.innerHTML = '';

    usersData.forEach(user => {
        const row = document.createElement('tr');

        // Populate table row with user data
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td> 
                <input type="submit" class="block-btn${user.blocked ? ' blocked' : ''}" 
                       value="${user.blocked ? 'BLOCKED' : 'BLOCK'}" 
                       onclick="toggleBlockStatus(${usersData.indexOf(user)})">
            </td>
            <td> 
                <input type="submit" class="delete-btn" 
                       value="DELETE" onclick="deleteUser(${usersData.indexOf(user)})">
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function deleteUser(index) {
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    usersData.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(usersData));
    displayUsers();
}

function toggleBlockStatus(index) {
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    usersData[index].blocked = !usersData[index].blocked;
    localStorage.setItem('users', JSON.stringify(usersData));
    displayUsers();
}
