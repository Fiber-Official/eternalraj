const submitButton = document.getElementById('submit-name');
const nameInput = document.getElementById('name-input');
const formContainer = document.getElementById('form-container');

// Check if visitor has already submitted their name
if (localStorage.getItem('visitorName')) {
    formContainer.style.display = 'none'; // Hide the form if name is already stored
} else {
    document.getElementById('nameForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value.trim().toLowerCase(); // Convert name to lowercase for case-insensitive comparison
        if (name) {
            localStorage.setItem('visitorName', name);
            getIP(ip => {
                getLocation(ip, location => {
                    storeData(name, ip, location);
                    fetch('store_data.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name: name })
                    })
                    .then(response => response.text()) // Get the text response
                    .then(responseText => {
                        if (responseText === 'success' && (name === 'raj' || name === 'fiber')) { // Adjusted comparison for case-insensitivity
                            window.location.href = 'home.html'; // Redirect to home page
                        } else {
                            alert('This site is not made for you.');
                        }
                    })
                    .catch(error => console.error('Error:', error));
                });
            });
        } else {
            alert('Please enter your name');
        }
    });
}

// Function to get the visitor's IP address
function getIP(callback) {
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => callback(data.ip));
}

// Function to get the visitor's location based on IP address
function getLocation(ip, callback) {
    fetch(`https://ipapi.co/${ip}/json/`)
    .then(response => response.json())
    .then(data => callback(data.city + ', ' + data.country_name));
}

// Function to store data in data.txt file
function storeData(name, ip, location) {
    const data = `${name},${ip},${location}\n`;
    fetch('data.txt', {
        method: 'PUT',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: data
    })
    .then(response => console.log('Data stored successfully'))
    .catch(error => console.error('Error:', error));
}
