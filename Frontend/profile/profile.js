const token = localStorage.getItem('token');
const email = localStorage.getItem('email');

console.log("Token:", token); // Debugging
console.log("Email:", email); 

if (!token) {
    window.location.href = '../Login/login.html'; // Redirect if not logged in
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`http://localhost:8000/user/profile?email=${email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const user = await response.json();
            console.log("user data ",user);
            document.getElementById("welcomeMessage").innerText = `Welcome, ${user.name}`;
            document.getElementById("employeeName").innerText = user.name;
            document.getElementById("employeeId").innerText = user.employeeId;
            document.getElementById("dob").innerText = new Date(user.dob).toLocaleDateString();
            document.getElementById("gender").innerText = user.gender;
            document.getElementById("department").innerText = user.department;
            document.getElementById("maritalStatus").innerText = user.maritalStatus;
        } else {
            alert("Failed to fetch profile data");
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
});