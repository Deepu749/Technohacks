document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('userInput').value;
    const password = document.getElementById('password').value;
    
    if (!validateUserInput(userInput)) {
        displayError('Please enter a valid username or email');
        return;
    }

    if (password === '') {
        displayError('Password is required');
        return;
    }

    hashPassword(password).then(hashedPassword => {
        console.log('User Input:', userInput);
        console.log('Hashed Password:', hashedPassword);
        
        document.getElementById('loginForm').reset();
        clearError(); 
    }).catch(err => {
        displayError('Error hashing the password');
        console.error(err);
    });
});

function validateUserInput(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return input.trim() !== '' && (input.indexOf('@') === -1 || emailPattern.test(input));
}

function displayError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
}

function clearError() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';
}

function hashPassword(password) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
        .then(buffer => {
            return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        });
}
