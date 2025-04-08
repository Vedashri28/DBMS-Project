window.onload=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}
document.addEventListener("DOMContentLoaded", async ()=> {




    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showLogin = document.getElementById("showLogin");
    const showRegister = document.getElementById("showRegister");

    showLogin.addEventListener("click", function () {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        loginForm.style.transform = "translateX(0)";
        registerForm.style.transform = "translateX(100%)";
    });

    showRegister.addEventListener("click", function () {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        registerForm.style.transform = "translateX(0)";
        loginForm.style.transform = "translateX(-100%)";
    });
});
    
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

      
    loginForm.addEventListener("submit", async (event)=> { 
        event.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const data = {
            email: email,
            password: password
        };
        const response =  await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();
        if (response.ok) {
            alert("Login successful");
            localStorage.setItem('token', result.token);
            localStorage.setItem('username', result.username);
            localStorage.setItem('email', result.email);
            window.location.href = "../Dashboard/Dashboard.html";
        } else {
            alert("Login failed");
            console.log("Login failed");
        }
           
        });

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const full_name = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const employeeId = document.getElementById("employeeId").value;
        const dob = document.getElementById("dob").value;
        const gender = document.getElementById("gender").value;
        const department = document.getElementById("department").value;
        const maritalStatus = document.getElementById("maritalStatus").value;

        const data = {
            name: full_name,
            email: email,
            password: password,
            employeeId: employeeId,
            dob: dob,
            gender: gender,
            department: department,
            maritalStatus: maritalStatus
        };
         console.log(data);
        try {
            const response = await fetch('http://localhost:8000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                alert("Registration successful");
            } else {
                alert(result.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Something went wrong. Please try again.");
        }
    });



