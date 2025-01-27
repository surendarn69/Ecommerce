function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "surendar" && password === "45356idsurendar") {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        window.location.href = "script.html";
    } else {
        document.getElementById('error-message').innerText = "Invalid username or password. Please try again.";
    }
}
