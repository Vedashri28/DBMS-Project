const token = localStorage.getItem('token');
const email = localStorage.getItem('email');

if (!token) {
    window.location.href = '../Login/login.html'; // Redirect if not logged in
}

document.getElementById("username").innerText = localStorage.getItem('username');

const leaveForm = document.getElementById("leaveRequestForm");

leaveForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const leaveType = document.getElementById("leaveType").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const description = document.getElementById("description").value;

    const data = {
        email: localStorage.getItem('email'),
        leaveType,
        startDate,
        endDate,
        description
    };

    console.log("Submitting leave request:", data); // Log the request data

    try {
        const response = await fetch('http://localhost:8000/leave/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error("Failed to submit leave request. Status:", response.status);
            const errorText = await response.text();
            console.error("Error response text:", errorText);
            alert("Failed to submit leave request. Please check the backend.");
            return;
        }

        const result = await response.json();
        console.log("Response from server:", result); // Log the response

        alert("Leave request submitted successfully");
        window.location.href = "../leaves/leaves.html"; // Redirect to leaves page
    } catch (error) {
        console.error("Error submitting leave request:", error);
        alert("Something went wrong. Please try again.");
    }
});