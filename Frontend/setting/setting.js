const passwordForm = document.getElementById('passwordForm');

passwordForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const oldPassword = document.getElementById('oldPassword').value
    const newPassword = document.getElementById('newPassword').value
    const confirmPassword = document.getElementById('confirmPassword').value
    const email = localStorage.getItem('email'); // Ensure this is stored in localStorage

    // ✅ Validate input fields
    if (!oldPassword || !newPassword || !confirmPassword) {
        alert('All fields are required');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const data = {  
        oldPassword: oldPassword,
        newPassword: newPassword,
        email: email
    };  

    try {
        const response = await fetch('http://localhost:8000/user/changepassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {  
            alert('Password changed successfully');
            passwordForm.reset(); // ✅ Clear form fields after success
        } else {
            alert(result.message || 'Password change failed');
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});

const updateForm = document.getElementById('updateForm');

updateForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('updateName').value;
    const email = localStorage.getItem('email'); // Get the email from localStorage

    if (!name) {
        alert('Name is required');
        return;
    }

    const data = { email, name };

    try {
        const response = await fetch('http://localhost:8000/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Profile updated successfully');
            localStorage.setItem('username', name); // Update localStorage
        } else {
            alert(result.message || 'Profile update failed');
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});
