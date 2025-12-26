const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  status.textContent = 'Sending...';
  status.style.color = '#2563eb';

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    const response = await fetch('https://n8n.srv1168743.hstgr.cloud/webhook/contact-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json().catch(() => null);
      status.textContent = data?.message || 'Success! We will be in touch soon.';
      status.style.color = '#059669';
      form.reset();
    } else {
      status.textContent = 'Something went wrong. Please try again.';
      status.style.color = '#dc2626';
    }
  } catch (error) {
    status.textContent = 'Network error. Check your connection.';
    status.style.color = '#dc2626';
  }
});
