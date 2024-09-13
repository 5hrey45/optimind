document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text()) // Use text() to get raw response
    .then(text => {
        console.log('Response Text:', text); // Log the raw response text
        try {
            const result = JSON.parse(text); // Manually parse JSON
            if (result.success) {
                alert('Email sent successfully!');
            } else {
                alert('Error sending email.');
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
            alert('Error sending email.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error sending email.');
    });
})