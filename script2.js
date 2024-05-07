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
        } else {
            alert('Please enter your name');
        }
    });
}
