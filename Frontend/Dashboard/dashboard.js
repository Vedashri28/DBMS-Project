const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
if (!token) {
    window.location.href = '../Login/login.html'; // Redirect if not logged in
}
console.log(token);
console.log(username);
console.log(email)
const usernameElement = document.getElementById('username');
usernameElement.innerText = username;

const usernameElement2 = document.getElementById('username2');
usernameElement2.innerText = username;