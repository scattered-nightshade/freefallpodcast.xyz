document.getElementById('petitionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    var name = document.getElementById('nameInput').value;
    var reason = document.getElementById('reasonInput').value;

    // Create petition data object
    var petitionData = {
        name: name,
        reason: reason
    };

    // Send POST request to submit petition
    fetch('/petitions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(petitionData)
    })
    .then(response => response.json())
    .then(petition => {
        // Clear form fields
        document.getElementById('nameInput').value = '';
        document.getElementById('reasonInput').value = '';

        // Add new petition to the list
        appendPetition(petition);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to fetch and display all petitions
function fetchPetitions() {
    fetch('/petitions')
    .then(response => response.json())
    .then(petitions => {
        petitions.forEach(petition => {
            appendPetition(petition);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to append petition to the list
function appendPetition(petition) {
    var petitionList = document.getElementById('petitionList');
    var petitionEntry = document.createElement('div');
    petitionEntry.classList.add('petition-entry');
    petitionEntry.innerHTML = '<strong>' + petition.name + ':</strong> ' + petition.reason;
    petitionList.appendChild(petitionEntry);
}

// Fetch petitions when the page loads
fetchPetitions();
