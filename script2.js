const submitButton = document.getElementById('submit-name');
const nameInput = document.getElementById('name-input');
const formContainer = document.getElementById('form-container');

// Check if visitor has already submitted their name
if (localStorage.getItem('visitorName')) {
    formContainer.style.display = 'none'; // Hide the form
} else {
    submitButton.addEventListener('click', () => {
        const name = nameInput.value;
        if (name) {
            // Store the name in local storage for future visits
            localStorage.setItem('visitorName', name);

            // Get location and IP address (Requires external service)
            fetch('https://api.ipify.org?format=json')  // Example IP service
                .then(response => response.json())
                .then(data => sendDataToServer(name, data.ip)); 
        } else {
            alert('Please enter your name');
        }
    });
}

function sendDataToServer(name, ip) {
    // You'll likely need to use something like 'fetch' with geoloacation services to get accurate location data

    // Send data to server-side script 
    fetch('store_data.php', {
        method: 'POST',
        body: JSON.stringify({ name: name, ip: ip, location: 'Location Data' }) 
    })
    .then(() => {
        formContainer.style.display = 'none'; // Hide form after submission
    })
    .catch(error => console.error('Error:', error));
}
