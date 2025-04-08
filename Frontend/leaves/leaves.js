const token = localStorage.getItem('token');
const email = localStorage.getItem('email');

if (!token) {
    window.location.href = '../Login/login.html'; // Redirect if not logged in
}

document.getElementById("username").innerText = localStorage.getItem('username');

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`http://localhost:8000/leave/list?email=${email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const leaves = await response.json();
            const tbody = document.querySelector("tbody");
            tbody.innerHTML = ""; // Clear existing rows

            leaves.forEach((leave, index) => {
                const row = `
                    <tr>
                        <td class="border p-2 text-center">${index + 1}</td>
                        <td class="border p-2 text-center">${leave.leaveType}</td>
                        <td class="border p-2 text-center">${new Date(leave.startDate).toLocaleDateString()}</td>
                        <td class="border p-2 text-center">${new Date(leave.endDate).toLocaleDateString()}</td>
                        <td class="border p-2 text-center">${leave.description}</td>
                        <td class="border p-2 text-center">${new Date(leave.appliedDate).toLocaleDateString()}</td>
                        <td class="border p-2 text-center">${leave.status}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        } else {
            alert("Failed to fetch leave requests");
        }
    } catch (error) {
        console.error("Error fetching leave requests:", error);
    }
});