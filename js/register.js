document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const major = document.getElementById('major').value;
    const userType = document.getElementById('userType').value;

    const emailRegex = /^.+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email address.");
        return;
    }
    if (nickname.trim() === '') {
        alert("Nickname is required.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }
    if (major.trim() === '') {
        alert("Please enter your major.");
        return;
    }
    if (!userType) {
        alert("Please select a user type.");
        return;
    }

    const requestBody = {
        email: email,
        password: password,
        nickname: nickname,
        major: major,
        type: userType.toUpperCase()
    }
    console.log(`Register request body ${requestBody}`);
    fetch('https://badger-cs-backend.onrender.com/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Email has been used");
        }
        return response.json();
    }).then(data => {
        alert(`Login successful! Login with your email!`);
    }).catch(error => {
        console.error("Error during API request:", error);
        alert(error.message || "An error occurred. Please try again later.");
    });
});