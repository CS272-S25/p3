document.getElementById('signin-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const emailRegex = /^.+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address.");
    return;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }
  // Prepare request body
  const requestBody = {
    email: email,
    password: password
  };

  // Send POST request to backend API
  fetch('https://badger-cs-backend.onrender.com/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Invalid email or password.");
      }
      return response.json();
    })
    .then(data => {
      alert(`Login successful! User ID: ${data.userId}`);
    })
    .catch(error => {
      console.error("Error during API request:", error);
      alert(error.message || "An error occurred. Please try again later.");
    });

});