// Form validation and utility functions

function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer') || document.createElement('div');
    alertContainer.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
    
    // If no container exists, insert before the form
    if (!document.getElementById('alertContainer')) {
        const form = document.querySelector('form');
        form.parentNode.insertBefore(alertContainer, form);
        alertContainer.id = 'alertContainer';
    }
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// Student Registration
function submitRegistration(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
        showAlert('Passwords do not match!', 'error');
        return;
    }
    
    // Validate phone number (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
        showAlert('Please enter a valid phone number!', 'error');
        return;
    }
    
    // Validate age (must be at least 16)
    const birthDate = new Date(data.dateOfBirth);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 16) {
        showAlert('You must be at least 16 years old to register!', 'error');
        return;
    }
    
    // Check if terms are accepted
    if (!data.terms) {
        showAlert('Please accept the terms and conditions!', 'error');
        return;
    }
    
    // Simulate successful registration
    showAlert('Registration successful! Redirecting to login...', 'success');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Student Login
function submitLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.email || !data.password) {
        showAlert('Please fill in all fields!', 'error');
        return;
    }
    
    // Simulate login (in real app, this would call an API)
    if (data.email === 'student@test.com' && data.password === 'password') {
        showAlert('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showAlert('Invalid email or password!', 'error');
    }
}

// Admin Login
function submitAdminLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.email || !data.password) {
        showAlert('Please fill in all fields!', 'error');
        return;
    }
    
    // Simulate admin login
    if (data.email === 'admin@nextuniversity.edu' && data.password === 'admin123') {
        showAlert('Admin login successful!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showAlert('Invalid admin credentials!', 'error');
    }
}

// Contact form
function submitInquiry(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data[0] || !data[1] || !data[2]) { // name, email, message
        showAlert('Please fill in all fields!', 'error');
        return;
    }
    
    showAlert('Thank you for your inquiry! We will get back to you soon.', 'success');
    event.target.reset();
}

// Download brochure
function downloadBrochure() {
    showAlert('Brochure download started!', 'success');
    // In a real application, this would trigger an actual file download
}

// Utility functions for forms
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6, 10);
    }
    input.value = value;
}

function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    input.value = value;
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// File upload handling
function handleFileUpload(input, fileType) {
    const file = input.files[0];
    if (file) {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            showAlert('File size must be less than 5MB!', 'error');
            input.value = '';
            return;
        }
        
        // Check file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            showAlert('Please upload PDF, JPG, or PNG files only!', 'error');
            input.value = '';
            return;
        }
        
        // Update UI to show file selected
        const uploadDiv = input.parentNode;
        uploadDiv.style.background = '#e8f5e8';
        uploadDiv.style.borderColor = '#28a745';
        uploadDiv.innerHTML = `
            <div>✅ ${file.name}</div>
            <small>File uploaded successfully</small>
        `;
    }
}

// Navigation helpers
function goHome() {
    window.location.href = '/index.html';
}

function goToLogin() {
    window.location.href = 'login.html';
}

function goToSignup() {
    window.location.href = 'signup.html';
}

// Add event listeners when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Format phone numbers on input
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
    
    // Format card numbers
    const cardInput = document.getElementById('cardNumber');
    if (cardInput) {
        cardInput.addEventListener('input', () => formatCardNumber(cardInput));
    }
    
    // Format expiry date
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', () => formatExpiryDate(expiryInput));
    }
    
    // Handle file uploads
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', () => handleFileUpload(input));
    });
    
    // Payment method toggle
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const cardDetails = document.getElementById('cardDetails');
            if (cardDetails) {
                if (this.value === 'card') {
                    cardDetails.style.display = 'block';
                } else {
                    cardDetails.style.display = 'none';
                }
            }
        });
    });
});